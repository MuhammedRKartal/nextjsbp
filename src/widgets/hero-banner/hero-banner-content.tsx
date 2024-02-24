'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/button';

export default function HeroBannerContent({ content }: HeroBannerType) {
  const bulletClassMobile =
    '!bg-secondary-200 !rounded-sm !mx-1 !my-3 hover:!bg-white hover:!opacity-100';
  const bulletClass = 'md:!w-16 md:!h-2.5 md:!mx-2 xl:!w-24';
  const bulletActiveClassMobile = '!w-3 !h-3 !bg-black';
  const bulletActiveClass = 'md:!bg-white md:!h-3';

  return (
    <>
      <Swiper
        className={clsx('relative', 'k-pxi', '!h-[450px] md:!h-[550px]')}
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation={{
          prevEl: '#hb-custom-prevEl',
          nextEl: '#hb-custom-nextEl'
        }}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${bulletClass} ${bulletClassMobile}`,
          bulletActiveClass: `${bulletActiveClass} swiper-pagination-bullet-active ${bulletActiveClassMobile}`,
          el: '#hb-custom-pagination'
        }}
        effect="coverflow"
        coverflowEffect={{
          slideShadows: true,
          rotate: 0,
          stretch: 0,
          scale: 1,
          depth: 0
        }}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides
        loop
        slideToClickedSlide={true}
        parallax={true}
      >
        {content.map((item) => (
          <SwiperSlide
            onClick={(item) => {}}
            key={item.title || item.image_alt}
            className={clsx(
              'flex w-full relative items-center justify-center rounded-lg overflow-hidden',
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
            id="hb-custom-pagination"
            className={clsx(
              'flex justify-center items-center',
              '!w-fit gap-1.5 py-[0.438rem]  px-[0.438rem] rounded-[0.688rem]',
              'md:bg-transparent md:py-0 md:gap-0 md:mb-2 md:z-10'
            )}
          />
        </div>
        <div className="k-px w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 absolute k-container">
          <Button
            appearance="filled"
            id="hb-custom-prevEl"
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 -left-8 z-10 hidden rounded-full px-[16px] md:block',
              'bg-secondary-300 hover:bg-secondary-400 border-secondary-300 hover:border-secondary-400',
              'shadow-inner'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>{' '}
          </Button>
          <Button
            appearance="filled"
            id="hb-custom-nextEl"
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 -right-8 z-10 hidden rounded-full px-[16px] md:block',
              'bg-secondary-300 hover:bg-secondary-400 border-secondary-300 hover:border-secondary-400',
              'shadow-inner'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      </Swiper>
    </>
  );
}
