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
      '!bg-secondary !rounded-sm !mx-1 !my-3 hover:!bg-white hover:!opacity-100'
    ),
    bulletActiveClass: twMerge(
      'swiper-pagination-bullet-active',
      '!w-3 !h-3 !bg-black'
    ),
    el: '#pi-custom-pagination'
  };

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides
      className={clsx('relative')}
      pagination={paginationSettings}
      modules={[Pagination]}
    >
      {product.images.map((item: ProductItemImagesType) => (
        <SwiperSlide key={item.alt}>
          <Image
            src={item.image}
            alt={item.alt}
            width={150}
            height={150}
            aspectRatio={1}
          ></Image>
        </SwiperSlide>
      ))}
      <ProductItemCustomPagination />
    </Swiper>
  );
};

const ProductItemCustomPagination = () => {
  return (
    <div className="z-10 flex justify-center items-center absolute bottom-3 left-1/2 !-translate-x-1/2">
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
