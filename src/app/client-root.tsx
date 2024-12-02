"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { resetHeaderState } from "@/redux/reducers/header";
import { closeBothPopUps, closeMiniBasket } from "@/redux/reducers/pop-ups";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(closeMiniBasket());
    dispatch(resetHeaderState());
    dispatch(closeBothPopUps());
  }, [dispatch, pathname, searchParams]);

  return <>{children}</>;
}
