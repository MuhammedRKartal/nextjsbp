import Footer from '@/views/footer';
import Header from '@/views/header';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        id="main"
        className={clsx('my-6 mx-auto min-h-[64vh]', 'md:my-10 md:mt-15')}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
