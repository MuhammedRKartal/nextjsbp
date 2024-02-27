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