import { Button } from '@/components/button';
import data from '@/schemas/footer-social.json';
import Image from 'next/image';

export type FooterSocialItemType = {
  logo: string;
  alt: string;
  link: string;
};

export default async function FooterSocial() {
  return (
    <ul className="flex gap-6">
      {data?.map((item: FooterSocialItemType) => (
        <li key={item?.alt}>
          <Button appearance="bright" link={item?.link} className="px-0">
            <Image
              src={item?.logo}
              alt={item?.alt}
              height={25}
              width={25}
            ></Image>
          </Button>
        </li>
      ))}
    </ul>
  );
}
