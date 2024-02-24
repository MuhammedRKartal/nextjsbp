'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import Image from 'next/image';
import clsx from 'clsx';
export default function HeroBannerContent({ content }: HeroBannerType) {
  const bulletClassMobile = '!w-2 !mx-0';
  const bulletClass =
    'md:!w-24 md:!h-2.5 md:!bg-secondary-200 md:!rounded-sm md:!mx-2 md:!my-3 md:hover:!bg-white md:hover:!opacity-100';
  const bulletActiveClassMobile = '!w-3 !h-3 !bg-black';
  const bulletActiveClass = 'md:!bg-white md:!h-3';
  return (
    <>
      <Swiper
        className={clsx('relative', 'k-pxi')}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${bulletClass} ${bulletClassMobile}`,
          bulletActiveClass: `${bulletActiveClass} swiper-pagination-bullet-active ${bulletActiveClassMobile}`,
          el: '.my-custom-pagination-div'
        }}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides
        loop={true}
      >
        {content.map((item) => (
          <SwiperSlide
            key={item.title || item.image_alt}
            className={clsx(
              '!flex relative items-center justify-center !h-[500px] !w-full',
              'k-container'
            )}
          >
            <Image
              src={item?.image}
              alt={item?.image_alt}
              fill
              sizes="(max-width: 720px) 450px, 1350px"
              className="object-fit"
            ></Image>
          </SwiperSlide>
        ))}
        <div className="z-10 flex justify-center items-center absolute bottom-0 left-1/2 !-translate-x-1/2">
          <div
            className={clsx(
              'my-custom-pagination-div',
              'flex justify-center items-center',
              '!w-fit gap-1.5 py-[0.438rem]  px-[0.438rem] rounded-[0.688rem]',
              'md:bg-transparent md:py-0 md:gap-0 md:mb-2 md:z-10'
            )}
          />
        </div>
      </Swiper>
    </>
  );
}
