'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';
import { HeroBannerType } from '@/src/types';

export default function HeroBannerContent({ content }: HeroBannerType) {
  const breakpoints = {
    768: {
      slidesPerView: 1.3,
      centeredSlides: true,
      spaceBetween: 60
    },
    320: {
      slidesPerView: 1.3,
      spaceBetween: 12,
      centeredSlides: true
    }
  };

  return (
    <>
      <Swiper
        className="fixed w-screen left-0 overflow-visible"
        breakpoints={breakpoints}
        pagination={{
          clickable: true,
          el: '.my-custom-pagination-div',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          bulletClass:
            'bg-primary-100 swiper-pagination-bullet h-4 w-4 bg-primary-100'
        }}
        navigation
        modules={[Navigation, Pagination]}
        loop={false}
        wrapperClass="relative min-h-[500px]"
      >
        {content.map((item) => (
          <SwiperSlide
            className="relative flex items-center justify-center"
            key={item.title || item.image_alt}
          >
            <Image
              src={item?.image}
              alt={item?.image_alt}
              width={500}
              height={500}
            ></Image>
          </SwiperSlide>
        ))}
        <div
          className={clsx(
            'my-custom-pagination-div',
            'bg-primary-100 flex justify-center items-center',
            '!w-fit gap-1.5 py-[0.438rem]  px-[0.438rem] rounded-[0.688rem]',
            'md:bg-transparent md:py-0 md:gap-0 md:mb-5 md:z-10'
          )}
        />
      </Swiper>
    </>
  );
}
