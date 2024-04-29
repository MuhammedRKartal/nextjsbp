import clsx from 'clsx';
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
                <li key="primary-100" className="bg-primary-100">
                  100
                </li>
                <li key="primary-200" className="bg-primary-200">
                  200
                </li>
                <li key="primary-300" className="bg-primary-300">
                  300
                </li>
                <li key="primary-400" className="bg-primary-400">
                  400
                </li>
                <li key="primary-500" className="bg-primary-500">
                  500
                </li>
                <li key="primary-600" className="bg-primary-600">
                  600
                </li>
                <li key="primary-600" className="bg-primary-600">
                  700
                </li>
                <li key="primary-700" className="bg-primary-700">
                  800
                </li>
                <li key="primary-900" className="bg-primary-900">
                  900
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
                <li key="secondary-100" className="bg-secondary-100">
                  100
                </li>
                <li key="secondary-200" className="bg-secondary-200">
                  200
                </li>
                <li key="secondary-300" className="bg-secondary-300">
                  300
                </li>
                <li key="secondary-400" className="bg-secondary-400">
                  400
                </li>
                <li key="secondary-500" className="bg-secondary-500">
                  500
                </li>
                <li key="secondary-600" className="bg-secondary-600">
                  600
                </li>
                <li key="secondary-700" className="bg-secondary-700">
                  700
                </li>
                <li key="secondary-800" className="bg-secondary-800">
                  800
                </li>
                <li key="secondary-900" className="bg-secondary-900">
                  900
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
