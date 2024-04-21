'use client';

import { Input } from '@/components/Input/input';
import { string, object } from 'yup';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordChangeFormType } from '@/types';
import { Button } from '@/components/button';
import { useUpdatePasswordMutation } from '@/data/client/account';
import { ROUTES } from '@/routes';
import { useState } from 'react';
import OTPModal from '@/views/modals/otp-modal';
import clsx from 'clsx';
import PasswordVerificationModal from '@/views/modals/password-verification-modal';

export default function ChangePasswordPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN);
  }

  const passwordChangeValidationSchema = object().shape({
    current_password: string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        'Password must contain a capital letter and a spacial character.'
      ),
    new_password: string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        'Password must contain a capital letter and a spacial character.'
      )
      .test(
        'same-password',
        `New password can't be same with the previous one.`,
        function (value) {
          return this.parent.current_password !== value;
        }
      ),
    confirm_password: string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .test(
        'same-password',
        `New password can't be same with the previous one.`,
        function (value) {
          return this.parent.current_password !== value;
        }
      )
      .test('passwords-match', 'Passwords are not matching.', function (value) {
        return this.parent.new_password === value;
      }),
    email: string()
  });

  const [updatePassword] = useUpdatePasswordMutation();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [body, setBody] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<PasswordChangeFormType>({
    resolver: yupResolver(passwordChangeValidationSchema) as Resolver<
      PasswordChangeFormType,
      any
    >
  });

  const onSubmit: SubmitHandler<PasswordChangeFormType> = async (data) => {
    setBody({
      email: data.email,
      new_password: data.new_password,
      formType: 'confirmUpdatePassword'
    });
    setLoading(true);
    await updatePassword(data)
      .unwrap()
      .then(() => {
        setLoading(false);
        setOpenModal(true);
        setError(false);
        setErrorText('');
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorText(error?.data?.error);
      });
  };

  return (
    <div className="w-full text-white">
      <PasswordVerificationModal
        open={openModal}
        body={body}
        setOpen={setOpenModal}
      />
      <header>
        <h3 className="text-3xl mb-4">Change Password</h3>
      </header>
      <div className="flex flex-col gap-7 xl:flex-row xl:w-full xl:flex-wrap">
        <div className="flex-[50]">
          <div className="flex flex-col gap-5 px-7 py-6 border sm:px-16 sm:py-16 md:px-12 md:py-8 lg:px-16 lg:py-12 xl:px-12 xl:py-8 2xl:px-16 2xl:py-12">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <input
                  id="email"
                  type="hidden"
                  value={session?.user?.email}
                  {...register('email')}
                />
                <Input
                  labelStyle="outer"
                  label="Current Password"
                  labelClassName="text-xs"
                  {...register('current_password')}
                  error={errors.current_password}
                  type="password"
                  required
                ></Input>
                <Input
                  labelStyle="outer"
                  label="New Password"
                  labelClassName="text-xs"
                  {...register('new_password')}
                  error={errors.new_password}
                  type="password"
                  required
                ></Input>
                <Input
                  labelStyle="outer"
                  label="Repeat Password"
                  labelClassName="text-xs"
                  {...register('confirm_password')}
                  error={errors.confirm_password}
                  type="password"
                  required
                ></Input>
              </div>
              {error && (
                <div className="text-error font-bold text-sm text-center">
                  {errorText}
                </div>
              )}
              <Button
                type="submit"
                appearance="filled"
                size="xs"
                className={clsx('w-full text-base', error ? 'mt-3' : 'mt-7')}
                isloading={loading}
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-[50] flex-col gap-4">
          <h3 className="text-3xl">Do you have any questions?</h3>
          <div className="text-sm">
            Check out our{' '}
            <Link href={ROUTES.FAQ} target="_blank" className="underline">
              FAQ
            </Link>{' '}
            page.
          </div>
        </div>
      </div>
    </div>
  );
}
