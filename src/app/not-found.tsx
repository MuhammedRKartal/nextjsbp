import { Button } from '@/components/button';
import clsx from 'clsx';
import { Section } from '@/components/section';
import { Image } from '@/components/image';

export default function NotFound() {
  return (
    <Section
      className={clsx(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'flex flex-col items-center justify-center gap-4 w-full'
      )}
      itemtag="div"
    >
      <Image
        src={'/assets/wowl.png'}
        alt="Company Logo"
        height={70}
        width={70}
        aspectRatio={1}
      ></Image>
      <h1 className="text-2xl text-white">The page is not found!</h1>
      <Button appearance="filled" link="/">
        Return Home
      </Button>
    </Section>
  );
}
