'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import { Image } from '@/components/image';
import Link from 'next/link';
import { string, object } from 'yup';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormType } from '@/types';
import RegisterModal from '@/views/modals/register-modal';
import { user } from '@/data/urls';
import { ROUTES } from '@/routes';

export default function Register() {
  const registerValidationSchema = object().shape({
    email: string()
      .email('Please enter a valid e-mail.')
      .required('This field is required.'),
    username: string()
      .required('This field is required.')
      .min(6, 'Username must contain at least 6 characters.')
      .max(30, 'Username must contain max 30 characters.'),
    password: string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        'Password must contain a capital letter and a spacial character.'
      ),
    password_confirm: string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .test('passwords-match', 'Passwords are not matching.', function (value) {
        return this.parent.password === value;
      }),
    formType: string()
  });

  const [email, setEmail] = useState('');
  const [isloading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    setEmail(data.email);

    const formData = JSON.stringify(data);

    setLoading(true);
    await fetch(`/api/client${user.register}`, {
      method: 'POST',
      body: formData
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setOpenModal(true);
      } else {
        res.json().then((data) => {
          setError(true);
          setErrorText(data.error);
        });
      }
    });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerValidationSchema) as Resolver<
      RegisterFormType,
      any
    >
  });

  return (
    <Section className="h-screen" appearance="full">
      <RegisterModal open={openModal} email={email} setOpen={setOpenModal} />

      <div className="relative top-[15%] flex flex-col items-center mx-auto w-[320px] sm:w-[416px]">
        <Link href={ROUTES.HOME}>
          <Image
            src={'/assets/logo-banner.png'}
            alt="Company"
            height={52}
            width={350}
            aspectRatio={350 / 52}
          ></Image>
        </Link>
        <div className="text-white text-4xl font-extrabold mt-12 mb-14">
          Register
        </div>
        <form
          id="register-form"
          className="flex flex-col gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <input type="hidden" value="register" {...register('formType')} />
            <Input
              label="Email"
              id="email"
              {...register('email')}
              error={errors.email}
              required
            />
            <Input
              label="Username"
              id="username"
              {...register('username')}
              error={errors.username}
              required
            />
            <Input
              label="Password"
              id="password"
              {...register('password')}
              type="password"
              error={errors.password}
              required
            />
            <Input
              label="Password Confirm"
              id="password_confirm"
              {...register('password_confirm')}
              error={errors.password_confirm}
              type="password"
              required
            />
            {error && (
              <div className="text-error font-bold text-sm text-center">
                {errorText}
              </div>
            )}
          </div>

          <Button
            type="submit"
            appearance="filled"
            size="xs"
            className="w-full text-base"
            isloading={String(isloading)}
          >
            Register
          </Button>
        </form>
        <div
          id="already-member"
          className="flex items-center justify-center mt-8 w-full text-primary font-extrabold gap-1"
        >
          <div>Already a member?</div>
          <Link
            href={ROUTES.LOGIN}
            className="text-primary font-extrabold hover:text-primary-dark underline"
          >
            Log In.
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
}
