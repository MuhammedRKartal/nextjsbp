import { Basket } from '../../types';
import { buildClientRequestUrl } from '../../utils';
import { api } from './api';
import { product } from '../urls';

export type AddProductResponse = {
  basket: Basket;
  osessionid: string;
};

export type AddProductRequest = {
  product: number;
  quantity: number;
  attributes: any;
};

type GetProduct = {
  pk: number;
  searchParams?: URLSearchParams;
  groupProduct?: boolean;
  [key: string]: any;
};

// export const productApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getProductByPk: build.query<ProductResult, number>({
//       query: (pk) => ({
//         url: buildClientRequestUrl(product.getProductByPk(pk))
//       })
//     }),
//     getProductByParams: build.query<ProductResult, GetProduct>({
//       query: ({ pk, searchParams, ...params }) => {
//         product.getProductByPk(pk);

//         if (params) {
//           url = `${url}?${new URLSearchParams(params).toString()}`;
//         }

//         return {
//           url: buildClientRequestUrl(url)
//         };
//       }
//     }),
//     addProduct: build.mutation<AddProductResponse, AddProductRequest>({
//       query: (body) => ({
//         url: buildClientRequestUrl(product.addProduct, {
//           contentType: 'application/json'
//         }),
//         method: 'POST',
//         body
//       })
//     })
//   }),
//   overrideExisting: true
// });

// export const {
//   useAddProductMutation,
//   useGetProductByPkQuery,
//   useGetProductByParamsQuery
// } = productApi;
