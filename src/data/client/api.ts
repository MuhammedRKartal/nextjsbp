import {
  createApi,
  fetchBaseQuery,
  retry,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils";
import { RootState } from "@/redux/store";

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const mutations = Object.entries((api.getState() as RootState)?.api?.mutations ?? {}).map(
    x => x[1]
  );

  if (
    api.type === "mutation" &&
    mutations.filter(m => m?.status === "pending" && m?.endpointName === api.endpoint).length > 1
  ) {
    api.abort("Mutation already in progress.");
  }

  const baseQuery = fetchBaseQuery({
    prepareHeaders: async headers => {
      const refresh_cookie = getCookie("refresh_token");

      if (refresh_cookie) {
        headers.set("refresh_token", `${refresh_cookie}`);
      }
      return headers;
    },
    credentials: "include",
  });
  try {
    const result = await baseQuery(args, api, extraOptions);
    return result;
  } catch (error) {
    return { error };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: retry(customBaseQuery, { maxRetries: 1 }),
  tagTypes: ["Basket", "Product", "Profile"],
  endpoints: () => ({}),
});

export const {
  util: { invalidateTags },
} = api;
