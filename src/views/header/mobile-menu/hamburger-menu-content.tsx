'use client';

import data from '@/schemas/header-megamenu.json';
import { useAppDispatch } from '@/redux/hooks';
import { closeMobileMenu } from '@/redux/reducers/header';
import { Image } from '@/components/image';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

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
        className="mb-5"
      >
        <Image
          src={'/assets/logo-banner.png'}
          alt="WoWTasker"
          width={279}
          height={42}
          aspectRatio={279 / 42}
          className="!justify-start"
        ></Image>
      </Link>

      <ul className="text-lg flex flex-col gap-2 ms-1 me-2">
        {data?.map((item: HeaderNavItemType) => (
          <li key={item.title} className="text-white cursor-pointer">
            <Link
              href={item.link}
              className="flex justify-between items-center w-full hover:text-borders-600"
              onClick={() => {
                dispatch(closeMobileMenu());
              }}
            >
              {item.title}
              <FontAwesomeIcon
                icon={faChevronRight}
                size="xs"
              ></FontAwesomeIcon>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
