import { api } from './api';
import { BasketType } from '../../types';
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
    getBasket: build.query<BasketType, void>({
      query: () => ({
        url: buildClientRequestUrl(basket.getBasket)
      }),
      transformResponse: (response: BasketType) => response,
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
    clearBasket: build.mutation<BasketType, void>({
      query: (body) => ({
        url: buildClientRequestUrl(basket.clearBasket, {
          contentType: 'application/json'
        }),
        method: 'DELETE',
        body
      }),
      transformResponse: (response: BasketType) => response,
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
