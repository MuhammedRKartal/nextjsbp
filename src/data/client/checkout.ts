import { api } from "./api";
import { checkout } from "../urls";
import { buildClientRequestUrl } from "../../utils";
import { CheckoutType, OrderType } from "@/types";

interface FetchStatusRequestType {
  token: number;
}

export const checkoutApi = api.injectEndpoints({
  endpoints: build => ({
    createCheckout: build.mutation<CheckoutType, void>({
      query: () => ({
        url: buildClientRequestUrl(checkout.createCheckout, {
          contentType: "application/json",
        }),
        method: "POST",
      }),
    }),
    fetchOrderStatus: build.query<OrderType, FetchStatusRequestType>({
      query: params => ({
        url: buildClientRequestUrl(`${checkout.fetchCheckout}?token=${params.token}`),
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateCheckoutMutation, useFetchOrderStatusQuery } = checkoutApi;
