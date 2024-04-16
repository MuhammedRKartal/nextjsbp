import clsx from 'clsx';
import { SectionProps } from '@/components/types';

export const Section = (props: SectionProps) => {
  const { children, className, tag, appearance } = props;
  return (
    <div
      className={clsx(
        'flex justify-center w-full h-full',
        (!appearance || appearance === 'wide') && ['k-px k-py'],
        appearance === 'thin' && [
          'px-5 pt-6 pb-8',
          'md:px-12',
          'xl:px-48 xl:pt-10 xl:pb-11',
          'xxl:px-56'
        ],
        appearance === 'thinnest' && [
          'px-5 pt-6 pb-8',
          'md:px-12',
          'xl:px-72 xl:pt-10 xl:pb-11',
          'xxl:px-80'
        ],
        appearance === 'full' && [className ?? className]
      )}
    >
      {(!tag || tag === 'section') && (
        <section
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </section>
      )}
      {tag === 'div' && (
        <div
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </div>
      )}
      {tag === 'div' && (
        <span
          className={clsx(['w-full', 'k-container', className ?? className])}
        >
          {children}
        </span>
      )}
    </div>
  );
};
