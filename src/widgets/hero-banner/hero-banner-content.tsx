'use client';

import { HeroBannerType } from '@/src/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Image from 'next/image';
import clsx from 'clsx';
import HeroBannerCustomPagination from './custom-pagination';
import { Button } from '@/src/components/button';

export default function HeroBannerContent({ content }: HeroBannerType) {
  const paginationSettings = {
    clickable: true,
    bulletClass: clsx(
      'swiper-pagination-bullet',
      '!bg-secondary !rounded-sm !mx-1 !my-3 hover:!bg-white hover:!opacity-100',
      'md:!w-16 md:!h-2.5 md:!mx-2',
      'xl:!w-24'
    ),
    bulletActiveClass: clsx(
      'swiper-pagination-bullet-active',
      '!w-3 !h-3 !bg-black',
      'md:!bg-white md:!h-3'
    ),
    el: '#hb-custom-pagination'
  };

  const coverFlowSettings = {
    slideShadows: true,
    rotate: 0,
    stretch: 0,
    scale: 1,
    depth: 0
  };

  return (
    <>
      <Swiper
        className={clsx('relative', 'k-pxi', '!h-[650px] lg:!h-[550px]')}
        modules={[Navigation, Pagination, EffectCoverflow]}
        pagination={paginationSettings}
        effect="coverflow"
        coverflowEffect={coverFlowSettings}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides
        slideToClickedSlide={true}
        parallax={true}
        loop
        autoplay={{ delay: 1000 }}
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
              className="object-cover"
            ></Image>
            {(item?.title || item?.description || item?.button_text) && (
              <div
                className={clsx(
                  'relative h-full py-16',
                  'flex justify-end items-center flex-col px-[15%] text-center',
                  'md:justify-center',
                  'lg:w-[60%] lg:min-w-[700px] lg:items-start lg:px-[10%] lg:text-start'
                )}
              >
                {item?.content_image && item?.content_image_alt && (
                  <>
                    <Image
                      src={item?.content_image}
                      alt={item?.content_image_alt}
                      width={130}
                      height={130}
                      className="mb-2 hidden md:block"
                    ></Image>
                    <Image
                      src={item?.content_image}
                      alt={item?.content_image_alt}
                      width={150}
                      height={150}
                      className="mb-2 md:hidden"
                    ></Image>
                  </>
                )}
                {item?.title && (
                  <div
                    className={clsx(
                      'text-white font-bold text-5xl mb-6',
                      'lg:text-6xl '
                    )}
                  >
                    {item?.title}
                  </div>
                )}
                {item?.description && (
                  <div
                    className={clsx(
                      'text-white text-2xl font-bold mb-4 hidden',
                      'md:text-white-opacity md:mb-[30px] md:block'
                    )}
                  >
                    {item?.description}
                  </div>
                )}
                {item?.button_text && (
                  <Button
                    appearance="filled"
                    size="lg"
                    link={item?.button_target_url}
                  >
                    {item?.button_text}
                  </Button>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
        <HeroBannerCustomPagination />
      </Swiper>
    </>
  );
}
