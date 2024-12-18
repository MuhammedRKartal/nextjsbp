"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/button";
import { ROUTES } from "@/routes";
import data from "@/schemas/account-menu.json";

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

export const AccountMenuMobile = props => {
  const { className } = props;
  return (
    <div className={twMerge(" w-full", className)}>
      <h2 className="text-3xl pb-2.5 border-b w-full border-outline">
        <Link href={ROUTES.ACCOUNT}>My Account</Link>
      </h2>
      <ul className="w-full text-sm leading-7 [&>:nth-last-child(2)]:mb-6">
        {data?.map((item: AccountMenuItemType, index) => (
          <>
            {item?.is_link && (
              <li
                key={item.main_title + index}
                className="flex justify-between items-center border-b py-1 border-outline"
              >
                <Link href={item?.link}>{item?.main_title}</Link>
                <FontAwesomeIcon icon={faChevronRight} />
              </li>
            )}
            {item?.sub_titles?.map((subtitle: AccountMenuSubtitleType) => (
              <>
                {subtitle?.is_link && (
                  <li
                    key={subtitle?.title}
                    className="flex justify-between items-center border-b border-outline py-1"
                  >
                    <Link href={subtitle?.link} className="">
                      {subtitle?.title}
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </li>
                )}
              </>
            ))}
          </>
        ))}
        <li className="cursor-pointer">
          <Button size="xs" className="w-full" onClick={() => signOut()}>
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
};
