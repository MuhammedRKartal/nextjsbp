import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export interface PageProps<T = any> {
  params: T;
  searchParams: URLSearchParams;
}

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
  description: string;
  short_description: string;
  images: ProductItemImagesType[];
  price: string;
  retail_price: string;
  currency_type: string;
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
  id: number;
  stock: number;
  quantity: number;
  product: ProductItemType;
  image: string;
  total_amount: string;
  price: string;
  currency_type: string;
}

export interface Basket {
  basketitem_set: BasketItem[];
  pk: number;
  total_amount: string;
  total_quantity: number;
}

export interface ClientRequestOptions {
  useTrailingSlash?: boolean;
  useFormData?: boolean;
  accept?: string;
  contentType?: string | null;
  responseType?: 'json' | 'text';
}

export type RegisterFormType = {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  formType: string;
};

export type LoginFormType = {
  email: string;
  password: string;
  formType: string;
};

export interface AuthError {
  type: string;
  data?: any;
}
