import { signOut } from "next-auth/react";
import type { Middleware } from "@reduxjs/toolkit";
import { ROUTES } from "@/routes";
import { api } from "../../data/client/api";

export const rtkQueryResponseHandler: Middleware = () => next => action => {
  return next(action);
};

export const rtkQueryErrorHandler: Middleware = () => next => async (action: any) => {
  if (action?.payload?.status === 401) {
    await signOut({
      callbackUrl: `${ROUTES.LOGIN}?callbackUrl=${window.location.pathname}`,
    });
  }

  return next(action);
};
const middlewares = [api.middleware, rtkQueryResponseHandler, rtkQueryErrorHandler];

export default middlewares;
