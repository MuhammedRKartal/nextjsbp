'use client';

import { FormEvent } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import type { Metadata } from 'next';
import { Image } from '@/components/image';
import Link from 'next/link';

export default function Register() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));

    await fetch('/api/client/register', {
      method: 'POST',
      body: formJSON,
      headers: {
        auth_token: 'I2nWKDLDQVWMFeiMcN7vTjhusmbDmkSz'
      }
    });
  }
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
          Register
        </div>
        <form
          id="register-form"
          className="flex flex-col gap-8 w-full"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-2">
            <Input label="Email" id="email" name="email" required />
            <Input label="Username" id="username" name="username" required />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <Button
            type="submit"
            appearance="filled"
            size="xs"
            className="w-full text-base"
          >
            Register
          </Button>
        </form>
        <div id="help" className="flex items-center justify-center mt-8 w-full">
          <Link
            href={'/'}
            target="_blank"
            className="text-primary font-extrabold hover:text-primary-dark"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </Section>
  );
}
