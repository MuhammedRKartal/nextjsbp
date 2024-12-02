"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Image } from "@/components/image";
import { useAppDispatch } from "@/redux/hooks";
import { closeMobileMenu } from "@/redux/reducers/header";
import { ROUTES } from "@/routes";
import data from "@/schemas/header-megamenu.json";

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
        className="mb-5 flex gap-2 items-center bg-primary-600 dark:bg-secondary-300 w-full pt-5 pb-2 px-4"
      >
        <Image
          src={"/assets/company-logo-minimized.png"}
          alt="WoW Tasker"
          width={60}
          height={60}
          aspectRatio={1}
          className="!justify-start"
        ></Image>
        <div>
          <h1 className="text-2xl font-bold">WoW Tasker</h1>
          <h3 className="text-xs leading-3">A better experience!</h3>
        </div>
      </Link>

      <ul className="text-lg flex flex-col gap-2 ms-1 me-2 px-4">
        {data?.map((item: HeaderNavItemType) => (
          <li key={item.title} className=" cursor-pointer">
            <Link
              href={item.link}
              className="flex justify-between items-center w-full hover:text-outline-600"
              onClick={() => {
                dispatch(closeMobileMenu());
              }}
            >
              {item.title}
              <FontAwesomeIcon icon={faChevronRight} size="xs"></FontAwesomeIcon>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
