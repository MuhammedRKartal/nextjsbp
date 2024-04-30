'use client';

import { ROUTES } from '@/routes';
import data from '@/schemas/account-menu.json';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export type AccountMenuSubtitleType = {
  title: string;
  link: string;
  is_link: boolean;
};

type AccountMenuItemType = {
  main_title: string;
  sub_titles: AccountMenuSubtitleType[];
  is_link: boolean;
  link: string;
};

export const AccountMenu = (props) => {
  const { className } = props;
  return (
    <div
      className={twMerge(
        ' whitespace-pre-line border pt-10 pb-6 pr-24 pl-8 w-max h-[55vh] border-outline dark:border-secondaryoutline hidden md:block',
        'lg:pr-24',
        className
      )}
    >
      <h2 className="text-3xl pb-2.5 mb-7 border-b w-max border-outline dark:border-secondaryoutline">
        <Link href={ROUTES.ACCOUNT}>My Account</Link>
      </h2>
      <ul className="w-max text-sm leading-7 [&>:nth-last-child(2)]:border-b [&>:nth-last-child(2)]:pb-2.5 [&>:nth-last-child(2)]:mb-6">
        {data?.map((item: AccountMenuItemType) => (
          <li
            key={item.main_title}
            className="border-outline dark:border-secondaryoutline "
          >
            {item?.is_link ? (
              <Link href={item?.link}>{item?.main_title}</Link>
            ) : (
              <div className="">{item?.main_title}</div>
            )}
            <ul className="pl-5 w-max">
              {item?.sub_titles?.map((subtitle: AccountMenuSubtitleType) => (
                <li key={subtitle?.title} className="">
                  {subtitle?.is_link ? (
                    <Link href={subtitle?.link} className="">
                      {subtitle?.title}
                    </Link>
                  ) : (
                    subtitle?.title
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li onClick={() => signOut()} className="cursor-pointer">
          Log Out
        </li>
      </ul>
    </div>
  );
};
