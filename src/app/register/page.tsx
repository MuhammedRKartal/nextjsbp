'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import { Image } from '@/components/image';
import Link from 'next/link';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormType } from '@/types';
import RegisterModal from '@/views/modals/register-modal';

export default function Register() {
  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid e-mail.')
      .required('This field is required.'),
    username: yup
      .string()
      .required('This field is required.')
      .min(6, 'Username must contain at least 6 characters.')
      .max(30, 'Username must contain max 30 characters.'),
    password: yup
      .string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        'Password must contain a capital letter and a spacial character.'
      ),
    password_confirm: yup
      .string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .test('passwords-match', 'Passwords are not matching.', function (value) {
        return this.parent.password === value;
      })
  });

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    setEmail(data.email);

    const formData = JSON.stringify(data);
    setLoading(true);
    await fetch('/api/client/register', {
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
    resolver: yupResolver(registerValidationSchema)
  });

  return (
    <Section>
      <RegisterModal open={openModal} email={email} setOpen={setOpenModal} />

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
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
            loading={loading}
          >
            Register
          </Button>
        </form>
        <div
          id="help"
          className="flex items-center justify-center mt-8 w-full text-primary font-extrabold gap-1"
        >
          <div>Already a member?</div>
          <Link
            href={'/login'}
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
