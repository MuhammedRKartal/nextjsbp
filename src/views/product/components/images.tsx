'use client';

import { Image } from '@/components/image';
import { ProductItemImagesType } from '@/types';
import clsx from 'clsx';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Thumbs } from 'swiper/modules';
import { twMerge } from 'tailwind-merge';
import { useRef } from 'react';

export const Images = (props) => {
  const { product } = props;

  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
      <Swiper className="flex-[2] [&>.swiper-wrapper]:max-h-full [&>.swiper-wrapper]:h-full [&>.swiper-wrapper]:flex">
        {product.images.map((item: ProductItemImagesType) => (
          <SwiperSlide className="w-[auto] flex-shrink-0 block h-full max-h-full">
            <Image
              src={item.image}
              alt={item.alt}
              sizes="(max-width:720px)170px, 230px"
              fillWithSize
              width={200}
              height={200}
              aspectRatio={1}
              objectType="object-contain"
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
