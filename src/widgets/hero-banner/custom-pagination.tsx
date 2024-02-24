'use client';

import clsx from 'clsx';

export default function HeroBannerCustomPagination() {
  return (
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
  );
}
