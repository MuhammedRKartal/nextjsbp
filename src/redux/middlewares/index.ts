'use client';

import type { Middleware } from '@reduxjs/toolkit';

import { api } from '../../data/client/api';

export const rtkQueryResponseHandler: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    return next(action);
  };

const middlewares = [api.middleware, rtkQueryResponseHandler];

export default middlewares;
