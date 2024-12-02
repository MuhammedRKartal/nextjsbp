import { BasketType, ProductItemType } from "../../types";
import { buildClientRequestUrl } from "../../utils";
import { basket, product } from "../urls";
import { api } from "./api";

export type AddProductResponse = {
  basket: BasketType;
  osessionid: string;
};

export type AddProductRequest = {
  productPk: string;
  quantity: number;
};

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProductByPk: build.query<ProductItemType, string>({
      query: pk => ({
        url: buildClientRequestUrl(product.getProductByPk(pk)),
      }),
    }),
    addProduct: build.mutation<AddProductResponse, AddProductRequest>({
      query: body => ({
        url: buildClientRequestUrl(basket.addProduct, {
          contentType: "application/json",
        }),
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAddProductMutation, useGetProductByPkQuery } = productApi;
