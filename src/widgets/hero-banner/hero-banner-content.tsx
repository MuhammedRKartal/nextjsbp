'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Image from 'next/image';
import clsx from 'clsx';

export default function HeroBannerContent({ content }: HeroBannerType) {
  const bulletClass =
    'md:!w-8 md:!h-2 md:!bg-gray-400 md:!rounded-xl md:!mx-1.5';
  const bulletClassMobile = '!w-2 !opacity-1 !mx-0';
  const bulletActiveClassMobile = '!w-3 !h-3 !bg-black';
  const bulletActiveClass = 'md:!bg-yellow';
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${bulletClass} ${bulletClassMobile}`,
          bulletActiveClass: `${bulletActiveClass} swiper-pagination-bullet-active ${bulletActiveClassMobile}`,
          el: '.my-custom-pagination-div'
        }}
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
            className="!flex relative items-center justify-center"
          >
            <Image
              src={item?.image}
              alt={item?.image_alt}
              width={500}
              height={500}
            ></Image>
          </SwiperSlide>
        ))}
        <div className="flex justify-center items-center">
          <div
            className={clsx(
              'my-custom-pagination-div',
              'bg-gray-200 flex justify-center items-center',
              '!w-fit gap-1.5 py-[0.438rem]  px-[0.438rem] rounded-[0.688rem]',
              'md:bg-transparent md:py-0 md:gap-0 md:mb-5 md:z-10'
            )}
          />
        </div>
      </Swiper>
    </>
  );
}
