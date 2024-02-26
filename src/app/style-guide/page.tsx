'server-only';

import clsx from 'clsx';
import { Button } from '@/src/components/button';
import { Section } from '@/src/components/section';
import { Input } from '@/src/components/input';

export default function StyleGuidePage() {
  return (
    <>
      <Section className={clsx('flex flex-col gap-4 w-full')}>
        <h1 className="text-white text-4xl text-center mb-4">Style Guide</h1>

        <div className="grid gap-16 xl:grid-cols-2">
          <div>
            <h2 className="text-white text-2xl mb-4">Buttons</h2>
            <div className="flex flex-wrap flex-col  gap-12 md:gap-4">
              <div className="flex flex-wrap gap-3 items-center">
                <Button appearance="filled" size="xs">
                  Filled XS
                </Button>
                <Button appearance="filled">Filled</Button>
                <Button appearance="filled" size="lg">
                  Filled LG
                </Button>
              </div>

              <div className="flex gap-3 flex-wrap items-center">
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

              <div className="flex gap-3 flex-wrap items-center">
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

              <div className="flex gap-3 flex-wrap items-center">
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
          </div>

          <div>
            <h2 className="text-white text-2xl mb-4">Inputs</h2>
            <div className="flex flex-col gap-3 w-full">
              <Input label="Outer" id="password" labelStyle="outer" />
              <Input label="Inner" id="account" type="password" />
              <Input label="Floating" id="password" labelStyle="floating" />
              <Input label="Required" required></Input>
              <Input label="Disabled" disabled></Input>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
