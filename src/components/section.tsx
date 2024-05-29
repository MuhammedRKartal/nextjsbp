import { SectionProps } from '@/components/types';
import { twMerge } from 'tailwind-merge';

export const Section = (props: SectionProps) => {
  const { children, outerClassName, className, tag, appearance } = props;
  return (
    <div
      className={twMerge(
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
        appearance === 'full' && [],
        outerClassName
      )}
    >
      {(!tag || tag === 'section') && (
        <section className={twMerge('w-full', 'k-container', className)}>
          {children}
        </section>
      )}
      {tag === 'div' && (
        <div className={twMerge('w-full', 'k-container', className)}>
          {children}
        </div>
      )}
      {tag === 'span' && (
        <span className={twMerge('w-full', 'k-container', className)}>
          {children}
        </span>
      )}
    </div>
  );
};
