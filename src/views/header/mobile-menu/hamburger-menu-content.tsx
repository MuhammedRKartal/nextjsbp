'use client';

import data from '@/schemas/header-megamenu.json';
import { useAppDispatch } from '@/redux/hooks';
import { closeMobileMenu } from '@/redux/reducers/header';
import { Image } from '@/components/image';
import Link from 'next/link';
import { ROUTES } from '@/routes';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function HamburgerMenuContent() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Link
        href={ROUTES.HOME}
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
      >
        <Image
          src={'/assets/logo-banner.png'}
          alt="WoWTasker"
          width={260}
          height={40}
          aspectRatio={260 / 40}
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
