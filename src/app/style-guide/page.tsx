import clsx from 'clsx';
import { Button } from '@/src/components/button';
import { Section } from '@/src/components/section';

export default function StyleGuide() {
  return (
    <Section
      className={clsx('flex flex-col items-center justify-center gap-4 w-full')}
    >
      <h1 className="text-white text-2xl">Style Guide</h1>

      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-4">
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Button appearance="filled" size="xs">
            Filled XS
          </Button>
          <Button appearance="filled">Filled</Button>
          <Button appearance="filled" size="lg">
            Filled LG
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap items-center justify-center">
          <Button appearance="outlined" size="xs" link="/">
            Outlined XS
          </Button>
          <Button appearance="outlined" link="/">
            Outlined
          </Button>
          <Button appearance="outlined" size="lg" link="/">
            Outlined LG
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap items-center justify-center">
          <Button appearance="ghost" size="xs" link="/">
            Ghost XS
          </Button>
          <Button appearance="ghost" link="/">
            Ghost
          </Button>
          <Button appearance="ghost" size="lg" link="/">
            Ghost LG
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap items-center justify-center">
          <Button appearance="bright" size="xs" link="/">
            Bright XS
          </Button>
          <Button appearance="bright" link="/">
            Bright
          </Button>
          <Button appearance="bright" size="lg" link="/">
            Bright LG
          </Button>
        </div>
      </div>
    </Section>
  );
}
