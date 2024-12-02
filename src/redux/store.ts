import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/redux/reducers";
import middlewares from "./middlewares";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ...reducers,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([...middlewares]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
