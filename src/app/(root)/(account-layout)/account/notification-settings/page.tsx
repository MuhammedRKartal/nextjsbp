'use client';

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
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Loader } from '@/components/loader';
import { ROUTES } from '@/routes';

export default function ChangeNotificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN);
  }

  const [updateNotifications] = useUpdateNotificationsMutation();
  const { data: profile, isSuccess, isLoading } = useGetProfileInfoQuery();
  const dispatch = useDispatch()<any>;

  const {
    register,
    handleSubmit,
    formState: { }
  } = useForm<NotificationChangeFormType>();

  const onSubmit: SubmitHandler<NotificationChangeFormType> = async (data) => {
    await updateNotifications(data)
      .unwrap()
      .then((data) => {
        dispatch(
          accountApi.util.updateQueryData(
            'getProfileInfo',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data);
            }
          )
        );
      });
  };

  return (
    <Loader loading={isLoading}>
      {isSuccess && (
        <div className="w-full ">
          <header className="mb-6">
            <h3 className="text-3xl mb-2 lg:mb-1">Notification Settings</h3>
            <p className="text-xs text-white-300 dark:text-black-700 lg:text-sm">
              Change your selections for our notifications and press the "SAVE"
              button at the bottom of the page to update.
            </p>
          </header>
          <div className="flex flex-col gap-7 xl:flex-row xl:w-full xl:flex-wrap">
            <div className="flex-[50]">
              <div className="flex flex-col gap-5 px-7 py-6 border border-outline dark:border-secondaryoutline sm:px-16 sm:py-16 md:px-12 md:py-8 lg:px-16 lg:py-12 xl:px-12 xl:py-8 2xl:px-16 2xl:py-12">
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
                  <div className="text-sm mt-10">
                    Even if you do not receive e-mails for the campaign, you
                    will continue to receive e-mails regarding your orders and
                    membership settings.
                  </div>
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
      )}
    </Loader>
  );
}
