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
  url: string;
  alt_text: string;
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
  currency_symbol: string;
  in_stock: boolean;
};

export interface BasketItemType {
  item_id: number;
  stock: number;
  quantity: number;
  product: ProductItemType;
  image: string;
  total_amount: string;
  price: string;
  currency_type: string;
  currency_symbol: string;
}

export interface BasketType {
  product_list: BasketItemType[];
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

export type PasswordChangeFormType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export interface AuthError {
  type: string;
  data?: any;
}

export interface UpgradedUserType {
  id: string;
  email: string;
  name: string;
  email_allowed: boolean;
  eula_accepted: boolean;
  verified: boolean;
  date_joined: string;
  refreshToken: string;
}
