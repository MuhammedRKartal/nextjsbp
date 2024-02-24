'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Image from 'next/image';
import clsx from 'clsx';

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
        slideToClickedSlide={true}
        parallax={true}
        loop
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
      </Swiper>
    </>
  );
}
