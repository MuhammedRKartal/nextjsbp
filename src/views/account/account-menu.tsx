import data from '@/schemas/account-menu.json';
import clsx from 'clsx';
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
        'text-white border pt-10 pb-6 pr-24 pl-8 w-fit h-[75vh] border-secondary-darkest',
        className
      )}
    >
      <h2 className="text-2xl pb-2.5 mb-7 border-b border-secondary-darkest">
        My Account
      </h2>
      <ul className="text-sm leading-7 [&>:nth-last-child(2)]:border-b [&>:nth-last-child(2)]:pb-2.5 [&>:nth-last-child(2)]:mb-6">
        {data?.map((item: AccountMenuItemType) => (
          <li key={item.main_title} className="border-secondary-darkest ">
            {item?.is_link ? (
              <Link href={item?.link}>{item?.main_title}</Link>
            ) : (
              <div className="">{item?.main_title}</div>
            )}
            <ul className="pl-5">
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
