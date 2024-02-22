'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Image from 'next/image';

export default function HeroBannerContent({ content }: HeroBannerType) {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        slidesPerView={2}
        centeredSlides
        loop={true}
      >
        {content.map((item) => (
          <SwiperSlide
            key={item.title || item.image_alt}
            className="flex relative items-center justify-center"
          >
            <Image
              src={item?.image}
              alt={item?.image_alt}
              width={500}
              height={500}
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
