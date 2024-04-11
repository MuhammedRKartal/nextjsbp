import { api } from './api';
import { Basket } from '../../types';
import { buildClientRequestUrl } from '../../utils';
import { basket } from '../urls';

export type UpdateQuantityResponse = {
  refresh_token: string;
};

export type UpdateQuantityRequest = {
  productPk: string;
  quantity: number;
};

export const basketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBasket: build.query<Basket, void>({
      query: () => ({
        url: buildClientRequestUrl(basket.getBasket)
      }),
      transformResponse: (response: Basket) => response,
      providesTags: ['Basket']
    }),
    updateQuantity: build.mutation<
      UpdateQuantityResponse,
      UpdateQuantityRequest
    >({
      query: (body) => ({
        url: buildClientRequestUrl(basket.updateQuantity),
        method: 'PUT',
        body
      })
    }),
    clearBasket: build.mutation<Basket, void>({
      query: (body) => ({
        url: buildClientRequestUrl(basket.clearBasket, {
          contentType: 'application/json'
        }),
        method: 'DELETE',
        body
      }),
      transformResponse: (response: Basket) => response,
      invalidatesTags: ['Basket']
    })
  }),
  overrideExisting: true
});

export const {
  useGetBasketQuery,
  useUpdateQuantityMutation,
  useClearBasketMutation
} = basketApi;
