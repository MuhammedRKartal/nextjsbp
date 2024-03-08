import { Image } from '@/components/image';
import { ProductItemImagesType } from '@/types';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { twMerge } from 'tailwind-merge';

export const Images = (props) => {
  const { product } = props;

  const paginationSettings = {
    clickable: true,
    bulletClass: twMerge(
      'swiper-pagination-bullet',
      '!bg-secondary !rounded-sm !mx-0.5 !my-1 hover:!bg-secondary-darker'
    ),
    bulletActiveClass: twMerge(
      'swiper-pagination-bullet-active',
      '!w-2 !h-2 !bg-secondary-darker'
    ),
    el: '#pi-custom-pagination'
  };

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides
      className={clsx('relative overflow-hidden')}
      pagination={paginationSettings}
      modules={[Pagination]}
    >
      {product?.images?.map((item: ProductItemImagesType) => (
        <SwiperSlide
          key={item.alt}
          className={twMerge(
            'flex w-full relative items-center justify-center rounded-lg overflow-hidden'
          )}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width:720px)170px, 230px"
            aspectRatio={150 / 175}
            objectType="object-cover"
          ></Image>
        </SwiperSlide>
      ))}
      <ProductItemCustomPagination />
    </Swiper>
  );
};

const ProductItemCustomPagination = () => {
  return (
    <div className="z-10 flex justify-center items-center absolute bottom-2 left-1/2 !-translate-x-1/2">
      <div
        id="pi-custom-pagination"
        className={clsx(
          'flex justify-center items-center',
          '!w-fit gap-1 h-px px-[0.438rem] rounded-[0.688rem]'
        )}
      />
    </div>
  );
};
