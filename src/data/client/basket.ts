import { api } from './api';
import { Basket } from '../../types';
import { buildClientRequestUrl } from '../../utils';
import { basket } from '../urls';

export type UpdateQuantityResponse = {
  basket: Basket;
  osessionid: string;
};

export type UpdateQuantityRequest = {
  product: number;
  quantity: number;
  attributes: any;
};

export const basketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBasket: build.query<Basket, void>({
      query: () =>
        buildClientRequestUrl(basket.getBasket, {
          contentType: 'application/json'
        }),
      transformResponse: (response: { basket: Basket }) => response.basket,
      providesTags: ['Basket']
    }),
    updateQuantity: build.mutation<
      UpdateQuantityResponse,
      UpdateQuantityRequest
    >({
      query: (body) => ({
        url: buildClientRequestUrl(basket.getBasket, {
          contentType: 'application/json'
        }),
        method: 'PUT',
        body
      })
    }),
    clearBasket: build.mutation<Basket, void>({
      query: (body) => ({
        url: buildClientRequestUrl(basket.getBasket, {
          contentType: 'application/json'
        }),
        method: 'DELETE',
        body
      }),
      transformResponse: (response: { basket: Basket }) => response.basket,
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
