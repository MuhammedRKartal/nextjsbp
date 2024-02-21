import clsx from 'clsx';
import { Button } from '@/src/components/button';

export default function StyleGuide() {
  return (
    <div
      className={clsx('flex flex-col items-center justify-center gap-4 w-full')}
    >
      <h1 className="text-white text-2xl">Style Guide</h1>

      <div className="flex gap-3 items-center justify-center">
        <Button appearance="filled" size="xs">
          Return Home
        </Button>
        <Button appearance="filled">Return Home</Button>
        <Button appearance="filled" size="lg">
          Return Home
        </Button>
      </div>

      <div className="flex gap-3 items-center justify-center">
        <Button appearance="outlined" size="xs" link="/">
          Return Home
        </Button>
        <Button appearance="outlined" link="/">
          Return Home
        </Button>
        <Button appearance="outlined" size="lg" link="/">
          Return Home
        </Button>
      </div>

      <div className="flex gap-3 items-center justify-center">
        <Button appearance="ghost" size="xs" link="/">
          Return Home
        </Button>
        <Button appearance="ghost" link="/">
          Return Home
        </Button>
        <Button appearance="ghost" size="lg" link="/">
          Return Home
        </Button>
      </div>

      <div className="flex gap-3 items-center justify-center">
        <Button appearance="bright" size="xs" link="/">
          Return Home
        </Button>
        <Button appearance="bright" link="/">
          Return Home
        </Button>
        <Button appearance="bright" size="lg" link="/">
          Return Home
        </Button>
      </div>
    </div>
  );
}
