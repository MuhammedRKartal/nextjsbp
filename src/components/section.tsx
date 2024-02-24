import clsx from 'clsx';
import { SectionProps } from './types';

export const Section = (props: SectionProps) => {
  const { children, className, itemtag, appearance } = props;
  return (
    <div
      className={clsx(
        'flex justify-center',
        (!appearance || appearance === 'wide') && [
          'px-5 pt-6 pb-8',
          'md:px-8',
          'xl:px-28 xl:pt-10 xl:pb-11',
          'xxl:px-36'
        ],
        appearance === 'thin' && [
          'px-5 pt-6 pb-8',
          'md:px-8',
          'xl:px-48 xl:pt-10 xl:pb-11',
          'xxl:px-56'
        ],
        appearance === 'thinnest' && [
          'px-5 pt-6 pb-8',
          'md:px-8',
          'xl:px-72 xl:pt-10 xl:pb-11',
          'xxl:px-80'
        ],
        appearance === 'full' && [className ?? className]
      )}
    >
      {(!itemtag || itemtag === 'section') && (
        <section
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </section>
      )}
      {itemtag === 'div' && (
        <div
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </div>
      )}
      {itemtag === 'div' && (
        <span
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </span>
      )}
    </div>
  );
};
