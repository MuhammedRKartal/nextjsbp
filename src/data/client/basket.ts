import { api } from './api';
import { Basket } from '../../types';
import { buildClientRequestUrl } from '../../utils';

export type UpdateQuantityResponse = {
  basket: Basket;
  osessionid: string;
};

export type UpdateQuantityRequest = {
  product: number;
  quantity: number;
  attributes: any;
};

// export const basketApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getBasket: build.query<Basket, void>({
//       query: () =>
//         buildClientRequestUrl(basket.getBasket, {
//           contentType: 'application/json'
//         }),
//       transformResponse: (response: { basket: Basket }) => response.basket,
//       providesTags: ['Basket']
//     }),
//     updateQuantity: build.mutation<
//       UpdateQuantityResponse,
//       UpdateQuantityRequest
//     >({
//       query: (body) => ({
//         url: buildClientRequestUrl(basket.getBasket, {
//           contentType: 'application/json'
//         }),
//         method: 'PUT',
//         body
//       })
//     }),
//     clearBasket: build.mutation<Basket, void>({
//       query: (body) => ({
//         url: buildClientRequestUrl(basket.getBasket, {
//           contentType: 'application/json'
//         }),
//         method: 'DELETE',
//         body
//       }),
//       transformResponse: (response: { basket: Basket }) => response.basket,
//       invalidatesTags: ['Basket']
//     }),
//     applyVoucherCode: build.mutation<Basket, { voucher_code: string }>({
//       query: (body) => ({
//         url: buildClientRequestUrl(basket.getBasket, {
//           contentType: 'application/json'
//         }),
//         method: 'PATCH',
//         body
//       }),
//       transformResponse: (response: { basket: Basket }) => response.basket
//     }),
//     removeVoucherCode: build.mutation<Basket, void>({
//       query: () => ({
//         url: buildClientRequestUrl(basket.getBasket, {
//           contentType: 'application/json'
//         }),
//         method: 'PATCH',
//         body: {
//           remove_voucher_code: true
//         }
//       }),
//       transformResponse: (response: { basket: Basket }) => response.basket
//     })
//   }),
//   overrideExisting: true
// });

// export const {
//   useGetBasketQuery,
//   useUpdateQuantityMutation,
//   useClearBasketMutation,
//   useApplyVoucherCodeMutation,
//   useRemoveVoucherCodeMutation
// } = basketApi;
