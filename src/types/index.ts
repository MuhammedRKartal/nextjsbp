import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type HeroBannerType = {
  content: HeroBannerContentType[];
};

export type HeroBannerContentType = {
  is_image: boolean;
  image: string;
  content_image: string | null;
  content_image_alt: string | null | undefined;
  mobile_image: string;
  image_alt: string;
  title: string | null;
  description: string | null | undefined;
  button_text: string | null | undefined;
  button_target_url: string | null | undefined;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ProductItemImagesType = {
  image: string;
  alt: string;
};

export type ProductItemType = {
  pk: number | string;
  name: string;
  images: ProductItemImagesType[];
  price: string;
  in_stock: boolean;
};

export interface Basket {
  segment: { pk: number; price_list: number; stock_list: number };
  unavailable_basket_products: any[];
  voucher_code: string | null;
  total_amount: string;
  total_quantity: number;
  basketitem_set: BasketItem[];
  created_date: string;
  modified_date: string;
  pk: number;
  total_discount_amount: string;
  total_product_amount: string;
  upsell_messages: any[];
}

export interface BasketItem {
  attributes: object;
  attributes_kwargs: object;
  discount_amount: string;
  offer_badges: {
    description: string;
    discount: string;
  }[];
  parent: any | null;
  price: string;
  retail_price: string;
  stock: number;
  id: number;
  quantity: number;
  currency_type: string;
  currency_type_label: string;
  image: string;
  shipping_discount: string;
  tax_rate: string;
  total_amount: string;
  unit_price: string;
}

export interface ClientRequestOptions {
  useTrailingSlash?: boolean;
  useFormData?: boolean;
  accept?: string;
  contentType?: string;
  responseType?: 'json' | 'text';
}
