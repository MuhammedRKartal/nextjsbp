'use client';

import { Image } from '@/components/image';
import { ProductItemImagesType } from '@/types';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export const Images = (props) => {
  const { product } = props;

  return (
    <>
      <Swiper className="flex-[1.8] [&>.swiper-wrapper]:max-h-full [&>.swiper-wrapper]:h-full [&>.swiper-wrapper]:flex">
        {product.images.map((item: ProductItemImagesType) => (
          <SwiperSlide className="w-[auto] flex-shrink-0 block h-full max-h-full">
            <Image
              src={item.image}
              alt={item.alt}
              sizes="(max-width:720px)170px, 230px"
              width={400}
              height={500}
              imageHeight={400}
              fillWithSize
              showBG
              objectType="object-cover"
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
