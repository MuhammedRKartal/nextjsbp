import { Button } from '@/src/components/button';
import { Input } from '@/src/components/input';
import { Section } from '@/src/components/section';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page of NextBPK'
};

export default function Login() {
  return (
    <Section>
      <div className="flex flex-col items-center mx-auto mb-6 w-[336px] sm:w-[416px]">
        <Image
          src={'/assets/logo-banner.png'}
          alt="Company"
          height={150}
          width={350}
        ></Image>
        <div className="text-white text-4xl font-black mt-12 mb-14">Log In</div>
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
            type="submit"
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
            className="text-primary-100 font-black hover:text-primary-700"
          >
            Forget your password?
          </Link>
        </div>
      </div>
    </Section>
  );
}
