'use client';

import { Section } from '@/components/section';
import { AccountMenu } from '@/views/account/account-menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import {
  accountApi,
  useGetProfileInfoQuery,
  useUpdateNotificationsMutation
} from '@/data/client/account';
import { NotificationChangeFormType } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { Loader } from '@/components/loader';

export default function ChangeNotificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const [updateNotifications] = useUpdateNotificationsMutation();
  const { data: profile, isSuccess, isLoading } = useGetProfileInfoQuery();
  const dispatch = useDispatch()<any>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<NotificationChangeFormType>();

  const onSubmit: SubmitHandler<NotificationChangeFormType> = async (data) => {
    const formData = JSON.stringify(data);
    console.log(formData);

    await updateNotifications(data)
      .unwrap()
      .then((data) =>
        dispatch(
          accountApi.util.updateQueryData(
            'getProfileInfo',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data);
            }
          )
        )
      );
  };

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
      <Loader loading={isLoading}>
        {isSuccess && (
          <div className="w-full text-white">
            <header className="mb-6">
              <h3 className="text-3xl mb-1">Notification Settings</h3>
              <p className="text-sm">
                Change your selections for our notifications and press the
                "SAVE" button at the bottom of the page to update.
              </p>
            </header>
            <div className="flex flex-col gap-7 xl:flex-row xl:w-full xl:flex-wrap">
              <div className="flex-[60]">
                <div className="flex flex-col gap-5 px-7 py-6 border 2xl:px-24 2xl:py-16">
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      How would you like to be informed about our campaigns?
                    </div>
                    <Checkbox
                      defaultChecked={profile?.email_allowed}
                      appearance="square"
                      {...register('email_allowed')}
                    >
                      <div>by E-mail.</div>
                      <span className="text-xs">
                        Your registered e-mail address: {session.user.email}
                      </span>
                    </Checkbox>

                    <Button
                      type="submit"
                      appearance="filled"
                      size="xs"
                      className="w-full text-base"
                    >
                      Save My Preferences
                    </Button>
                    <div className="text-sm mt-1">
                      Even if you do not receive e-mails for the campaign, you
                      will continue to receive e-mails regarding your orders and
                      membership settings.
                    </div>
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
        )}
      </Loader>
    </Section>
  );
}
