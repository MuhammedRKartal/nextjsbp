'use client';

import { Input } from '@/components/Input/input';
import { Section } from '@/components/section';
import { AccountMenu } from '@/views/account/account-menu';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordChangeFormType } from '@/types';
import { Button } from '@/components/button';
import { useUpdatePasswordMutation } from '@/data/client/account';

export default function ChangePasswordPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const passwordChangeValidationSchema = yup.object().shape({
    current_password: yup
      .string()
      .required('This field is required.')
      .min(8, 'Password must contain min 8 characters.')
      .max(30, 'Password must contain max 30 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        'Password must contain a capital letter and a spacial character.'
      ),
    new_password: yup
      .string()
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
    confirm_password: yup
      .string()
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
      })
  });

  const [updatePassword] = useUpdatePasswordMutation();

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
    const formData = JSON.stringify(data);

    await updatePassword(data)
      .unwrap()
      .then((data) => console.log(data));
  };

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
      <div className="w-full text-white">
        <header>
          <h3 className="text-3xl mb-4">Change Password</h3>
        </header>
        <div className="flex flex-col gap-7 xl:flex-row xl:w-full xl:flex-wrap">
          <div className="flex-[60]">
            <div className="flex flex-col gap-5 px-7 py-6 border sm:px-24 sm:py-16 md:px-12 md:py-8 lg:px-24 lg:py-16">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  labelStyle="outer"
                  label="Current Password"
                  labelClassName="text-xs"
                  {...register('current_password')}
                  error={errors.current_password}
                  required
                ></Input>
                <Input
                  labelStyle="outer"
                  label="New Password"
                  labelClassName="text-xs"
                  {...register('new_password')}
                  error={errors.new_password}
                  required
                ></Input>
                <Input
                  labelStyle="outer"
                  label="Repeat Password"
                  labelClassName="text-xs"
                  {...register('confirm_password')}
                  error={errors.confirm_password}
                  required
                ></Input>
                <Button
                  type="submit"
                  appearance="filled"
                  size="xs"
                  className="w-full text-base"
                >
                  Change Password
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-[40] flex-col gap-4">
            <h3 className="text-3xl">Do you have any questions?</h3>
            <div className="text-sm">
              Check out our{' '}
              <Link href={'/account/faq'} className="underline">
                FAQ
              </Link>{' '}
              page.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
