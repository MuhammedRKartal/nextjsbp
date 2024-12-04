import { NotificationChangeFormType, OrderType, PasswordChangeFormType, UserType } from "@/types";
import { buildClientRequestUrl } from "../../utils";
import { account, auth, user } from "../urls";
import { api } from "./api";

interface OrdersRequestType {
  limit?: number;
  page?: number;
}

interface GetOrdersResponse {
  total_count: number;
  page_count: number;
  data: OrderType[];
}

export const accountApi = api.injectEndpoints({
  endpoints: build => ({
    getProfileInfo: build.query<any, void>({
      query: () => buildClientRequestUrl(user.profile),
      transformResponse: (response: UserType) => response,
      providesTags: ["Profile"],
    }),
    changePassword: build.mutation<void, PasswordChangeFormType>({
      query: body => ({
        url: buildClientRequestUrl(auth.changePassword),
        method: "POST",
        body,
      }),
    }),
    updateNotifications: build.mutation<void, NotificationChangeFormType>({
      query: body => ({
        url: buildClientRequestUrl(account.updateNotifications),
        method: "POST",
        body,
      }),
    }),
    getOrders: build.query<GetOrdersResponse, OrdersRequestType>({
      query: params => ({
        url: buildClientRequestUrl(`${account.orders}?limit=${params?.limit}&page=${params?.page}`),
      }),
    }),
    getLastActiveOrder: build.query<OrderType, void>({
      query: () => ({
        url: buildClientRequestUrl(`${account.lastActiveOrder}`),
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileInfoQuery,
  useChangePasswordMutation,
  useUpdateNotificationsMutation,
  useGetOrdersQuery,
  useGetLastActiveOrderQuery,
} = accountApi;
