import clsx from 'clsx';
import FooterCopyright from './footer-copyright';
import FooterMenu from './footer-menu';
import FooterSocial from './footer-social';
import { Section } from '@/src/components/section';

export default function Footer() {
  return (
    <>
      <footer
        className={clsx([
          'px-5 pt-6 pb-8',
          'md:px-8',
          'xl:px-28 xl:pt-10 xl:pb-11',
          'xxl:px-36',
          'flex justify-center'
        ])}
      >
        <div
          className={clsx(
            'w-full',
            'max-w-xs',
            'sm:max-w-sm',
            'md:max-w-md',
            'lg:max-w-lg',
            'xl:max-w-xl',
            'xxl:max-w-xxl'
          )}
        >
          <FooterMenu />
          <div className="border-b border-gray-500 my-8"></div>
          <div
            className={clsx(
              'flex flex-wrap items-center py-8 gap-4 justify-center flex-col-reverse',
              'md:justify-between md:flex-row'
            )}
          >
            <FooterCopyright />
            <FooterSocial />
          </div>
        </div>
      </footer>
    </>
  );
}
