import { Basket, ProductItemType } from '../../types';
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

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductByPk: build.query<ProductItemType, number>({
      query: (pk) => ({
        url: buildClientRequestUrl(product.getProductByPk(pk))
      })
    }),
    addProduct: build.mutation<AddProductResponse, AddProductRequest>({
      query: (body) => ({
        url: buildClientRequestUrl(product.addProduct, {
          contentType: 'application/json'
        }),
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: true
});

export const { useAddProductMutation, useGetProductByPkQuery } = productApi;
