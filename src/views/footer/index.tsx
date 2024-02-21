import clsx from 'clsx';
import FooterCopyright from './footer-copyright';
import FooterMenu from './footer-menu';
import FooterSocial from './footer-social';

export default function Footer() {
  return (
    <>
      <footer className="w-full max-w-full">
        <div className={clsx('container mx-auto px-6', 'md:px-0')}>
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
