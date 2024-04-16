import { api } from './api';
import { account, user } from '../urls';
import { buildClientRequestUrl } from '../../utils';
import {
  NotificationChangeFormType,
  PasswordChangeFormType,
  UserType
} from '@/types';

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query<any, void>({
      query: () => buildClientRequestUrl(user.currentUser),
      transformResponse: (response: UserType) => response,

      providesTags: ['Profile']
    }),
    updatePassword: builder.mutation<void, PasswordChangeFormType>({
      query: (body) => ({
        url: buildClientRequestUrl(account.updatePassword, {
          contentType: 'application/json'
        }),
        method: 'POST',
        body
      })
    }),
    updateNotifications: builder.mutation<void, NotificationChangeFormType>({
      query: (body) => ({
        url: buildClientRequestUrl(account.updateNotifications, {
          contentType: 'application/json'
        }),
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: true
});

export const {
  useGetProfileInfoQuery,
  useUpdatePasswordMutation,
  useUpdateNotificationsMutation
} = accountApi;
