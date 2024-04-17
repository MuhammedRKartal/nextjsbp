import { api } from './api';
import { account, user } from '../urls';
import { buildClientRequestUrl } from '../../utils';
import {
  NotificationChangeFormType,
  OrderType,
  PasswordChangeFormType,
  UserType
} from '@/types';

interface GetOrdersResponse {
  results: OrderType[];
}

export const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfileInfo: build.query<any, void>({
      query: () => buildClientRequestUrl(user.profile),
      transformResponse: (response: UserType) => response,
      providesTags: ['Profile']
    }),
    updatePassword: build.mutation<void, PasswordChangeFormType>({
      query: (body) => ({
        url: buildClientRequestUrl(account.updatePassword, {
          contentType: 'application/json'
        }),
        method: 'POST',
        body
      })
    }),
    updateNotifications: build.mutation<void, NotificationChangeFormType>({
      query: (body) => ({
        url: buildClientRequestUrl(account.updateNotifications, {
          contentType: 'application/json'
        }),
        method: 'POST',
        body
      })
    }),
    getOrders: build.query<GetOrdersResponse, void>({
      query: (body) => ({
        url: buildClientRequestUrl(account.orders)
      })
    })
  }),
  overrideExisting: true
});

export const {
  useGetProfileInfoQuery,
  useUpdatePasswordMutation,
  useUpdateNotificationsMutation,
  useGetOrdersQuery
} = accountApi;
