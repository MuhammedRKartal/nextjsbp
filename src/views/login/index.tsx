'use client';

import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import Link from 'next/link';
import * as yup from 'yup';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormType } from '@/types';
import { useState } from 'react';
import { SignInOptions, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { user } from '@/data/urls';

const Login = () => {
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const router = useRouter();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid e-mail.')
      .required('This field is required.'),
    password: yup.string().required('This field is required.'),
    formType: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginValidationSchema) as Resolver<LoginFormType, any>
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const formData = JSON.stringify(data);

    setLoading(true);

    await fetch(`/api/client${user.login}`, {
      method: 'POST',
      body: formData
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        signIn('default', { ...data } as SignInOptions);
      } else {
        res.json().then((data) => {
          setError(true);
          setErrorText(data.error);
        });
      }
    });
  };

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Input
              label="Email or Phone"
              id="account"
              {...register('email')}
              value={'hirohitogame@gmail.com'}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={'Deneme123.'}
              {...register('password')}
            />
            <input
              id="formType"
              type="hidden"
              value="login"
              {...register('formType')}
            />
          </div>
          <Button
            type="submit"
            appearance="filled"
            size="xs"
            className="w-full text-base"
            isloading={String(isloading)}
          >
            Log In
          </Button>
        </form>
        <div
          id="already-member"
          className="flex items-center justify-center mt-8 w-full text-primary font-extrabold gap-1"
        >
          <div>Not a member yet?</div>
          <Link
            href={'/register'}
            className="text-primary font-extrabold hover:text-primary-dark underline"
          >
            Register.
          </Link>
        </div>
        <div id="help" className="flex items-center justify-center mt-1 w-full">
          <Link
            href={'/'}
            target="_blank"
            className="text-sm text-primary font-bold hover:text-primary-dark"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Login;
