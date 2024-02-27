'server-only';

import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page of NextBPK'
};

const Login = () => {
  return (
    <Section>
      <div className="flex flex-col items-center mx-auto mb-6 w-[320px] sm:w-[416px]">
        <Image
          src={'/assets/logo-banner.png'}
          alt="Company"
          height={52}
          width={350}
          aspectRatio={350 / 52}
        ></Image>
        <div className="text-white text-4xl font-extrabold mt-12 mb-14">
          Log In
        </div>
        <form
          method="post"
          id="login-form"
          className="flex flex-col gap-8 w-full"
        >
          <div className="flex flex-col gap-2">
            <Input label="Email or Phone" id="account" />
            <Input label="Password" id="password" type="password" />
          </div>
          <Button
            type="reset"
            appearance="filled"
            size="xs"
            className="w-full text-base"
          >
            Log In
          </Button>
        </form>
        <div id="help" className="flex items-center justify-center mt-8 w-full">
          <Link
            href={'/'}
            target="_blank"
            className="text-primary font-extrabold hover:text-primary-700"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Login;
