import Image from 'next/image';
import data from '../../schemas/header-megamenu.json';
import { Button } from '@/src/components/button';
import MobileHamburgerButton from './mobile-menu/hamburger-menu-button';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default async function Megamenu() {
  return (
    <>
      <MobileHamburgerButton />

      <Button appearance="bright" link="/">
        <Image
          src={'/assets/wowl.png'}
          alt="wow"
          height={30}
          width={30}
        ></Image>
      </Button>

      {data?.map((item: HeaderNavItemType) => (
        <Button
          key={item.title}
          linkclassname="hidden md:block"
          className="h-8 text-white"
          appearance="bright"
          link={item.link}
        >
          {item.title}
        </Button>
      ))}

      <Button appearance="bright" link="/login" linkclassname="md:hidden">
        <Image
          src={'/assets/user.svg'}
          alt="Login Icon"
          className="text-white"
          height={20}
          width={20}
        ></Image>
      </Button>
    </>
  );
}
