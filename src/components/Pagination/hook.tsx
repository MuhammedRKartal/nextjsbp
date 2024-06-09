import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useReducer } from "react";

export type UsePaginationType = ReturnType<typeof usePagination>;

type InitialState = {
  page: number | string;
  last: number;
  limit: number;
  total: number;
};

type ACTIONTYPE =
  | { type: "setPage"; payload: number }
  | { type: "setTotal"; payload: number }
  | { type: "setLimit"; payload: number };

function reducer(state: InitialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "setTotal":
      return {
        ...state,
        total: action.payload,
        last: Math.ceil(action.payload / state.limit),
      };
    case "setPage":
      return { ...state, page: action.payload };
    case "setLimit":
      return { ...state, limit: action.payload };
    default:
      throw new Error();
  }
}

export default function usePagination(
  _total = 0,
  _limit = 12,
  _page: number | undefined,
  _last: number | undefined
) {
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams(); // Provide a default value if null
  const urlSearchParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const { page, limit } = useMemo(
    () => ({
      page: _page || Number(searchParams.get("page")) || 1,
      limit: _limit || Number(searchParams.get("limit")),
    }),
    [searchParams, _page, _limit]
  );

  const initialState: InitialState = {
    page,
    limit,
    last: _last || Math.ceil(_total / limit) || 1,
    total: _total,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "setPage", payload: page });
  }, [page]);

  useEffect(() => {
    dispatch({ type: "setLimit", payload: limit });
  }, [limit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.page, state.limit]);

  const setTotal = useCallback(
    (total: number) => {
      dispatch({ type: "setTotal", payload: total });
    },
    [dispatch]
  );

  const setPage = useCallback(
    (page: number) => {
      if (page > 0 && page <= state.total) {
        dispatch({ type: "setPage", payload: page });
      }
    },
    [dispatch, state.total]
  );

  const setLimit = useCallback(
    (limit: number) => {
      dispatch({ type: "setLimit", payload: limit });
    },
    [dispatch]
  );

  const pageList = useMemo(() => {
    return Array.from({ length: state.last }, (_, i) => {
      urlSearchParams.set("page", (i + 1).toString());

      return {
        page: i + 1,
        url: `${pathname}?${urlSearchParams.toString()}`,
      };
    });
  }, [state.last, pathname, urlSearchParams]);

  const prev = useMemo(() => {
    if (Number(state.page) > 1) {
      urlSearchParams.set("page", (Number(state.page) - 1).toString());
      return `${pathname}?${urlSearchParams.toString()}`;
    }
    return null;
  }, [state.page, pathname, urlSearchParams]);

  const next = useMemo(() => {
    if (Number(state.page) < Number(state.last)) {
      urlSearchParams.set("page", (Number(state.page) + 1).toString());
      return `${pathname}?${urlSearchParams.toString()}`;
    }
    return null;
  }, [state.page, state.last, pathname, urlSearchParams]);

  return {
    ...state,
    setTotal,
    setPage,
    setLimit,
    pageList,
    prev,
    next,
  };
}
