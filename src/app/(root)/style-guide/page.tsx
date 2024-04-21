yarimport clsx from 'clsx';
import { Button } from '@/components/button';
import { Section } from '@/components/section';
import { Input } from '@/components/Input/input';

export default function StyleGuidePage() {
  return (
    <>
      <Section className={clsx('flex flex-col gap-4 w-full')}>
        <h1 className="text-white text-4xl text-center mb-4">Style Guide</h1>

        <div className="grid gap-16 xl:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-white text-2xl mb-4">Primary Colours</h2>
              <ul className="flex flex-wrap gap-3 w-full [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:h-8 [&>li]:min-w-[80px] [&>li]:rounded [&>li]:text-white [&>li]:p-3">
                <li key="primary-default" className="bg-primary">
                  Default
                </li>
                <li key="primary-feather" className="bg-primary-feather">
                  Feather
                </li>
                <li key="primary-lightest" className="bg-primary-lightest">
                  Lightest
                </li>
                <li key="primary-lighter" className="bg-primary-lighter">
                  Lighter
                </li>
                <li key="primary-light" className="bg-primary-light">
                  Light
                </li>
                <li key="primary-normal" className="bg-primary-normal">
                  Normal
                </li>
                <li key="primary-dark" className="bg-primary-dark">
                  Dark
                </li>
                <li key="primary-darker" className="bg-primary-darker">
                  Darker
                </li>
                <li key="primary-darkest" className="bg-primary-darkest">
                  Darkest
                </li>
                <li key="primary-black" className="bg-primary-black">
                  Black
                </li>
                <li key="primary-opacity" className="bg-primary-opacity">
                  Opacity
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white text-2xl mb-4">Secondary Colours</h2>
              <ul className="flex flex-wrap gap-3 w-full [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:h-8 [&>li]:min-w-[80px] [&>li]:rounded [&>li]:p-3">
                <li key="secondary-default" className="bg-secondary">
                  Default
                </li>
                <li key="secondary-feather" className="bg-secondary-feather">
                  Feather
                </li>
                <li key="secondary-lightest" className="bg-secondary-lightest">
                  Lightest
                </li>
                <li key="secondary-lighter" className="bg-secondary-lighter">
                  Lighter
                </li>
                <li key="secondary-light" className="bg-secondary-light">
                  Light
                </li>
                <li key="secondary-normal" className="bg-secondary-normal">
                  Normal
                </li>
                <li key="secondary-dark" className="bg-secondary-dark">
                  Dark
                </li>
                <li key="secondary-darker" className="bg-secondary-darker">
                  Darker
                </li>
                <li key="secondary-darkest" className="bg-secondary-darkest">
                  Darkest
                </li>
                <li key="secondary-black" className="bg-secondary-black">
                  Black
                </li>
                <li key="secondary-opacity" className="bg-secondary-opacity">
                  Opacity
                </li>
              </ul>
            </div>
          </div>

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
              <Input
                label="Required Floating"
                required
                labelStyle="floating"
              ></Input>
              <Input label="Disabled" disabled></Input>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
