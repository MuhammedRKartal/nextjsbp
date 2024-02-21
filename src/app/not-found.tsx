import { Button } from '../components/button';
import Image from 'next/image';
import clsx from 'clsx';

export default function Home() {
  return (
    <div
      className={clsx(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'flex flex-col items-center justify-center gap-4 w-full'
      )}
    >
      <Image
        src={'/assets/wowl.png'}
        alt="Company Logo"
        height={70}
        width={70}
      ></Image>
      <h1 className="text-2xl text-white">The page is not found!</h1>
      <Button appearance="filled" link="/">
        Return Home
      </Button>
    </div>
  );
}
