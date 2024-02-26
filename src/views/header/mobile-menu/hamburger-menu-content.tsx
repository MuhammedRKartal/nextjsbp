'use client';

import data from '../../../schemas/header-megamenu.json';
import { useAppDispatch } from '@/src/redux/hooks';
import { closeMobileMenu } from '@/src/redux/reducers/header';
import Image from 'next/image';
import Link from 'next/link';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function HamburgerMenuContent() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Link
        href={'/'}
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
      >
        <Image
          src={'/assets/logo-banner.png'}
          alt="Wowtasker"
          width={260}
          height={40}
        ></Image>
      </Link>

      <ul className="flex flex-col gap-3">
        {data?.map((item: HeaderNavItemType) => (
          <li key={item.title} className="text-white cursor-pointer w-fit">
            <Link
              href={item.link}
              className="hover:text-primary"
              onClick={() => {
                dispatch(closeMobileMenu());
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
