import { Button } from "@/components/button";
import { Image } from "@/components/image";
import data from "@/schemas/footer-social.json";

export type FooterSocialItemType = {
  logo: string;
  alt: string;
  link: string;
  rel?: string;
  target?: string;
};

export default async function FooterSocial() {
  return (
    <ul className="flex gap-6">
      {data?.map((item: FooterSocialItemType) => (
        <li key={item?.alt}>
          <Button
            appearance="bright"
            link={item?.link}
            className="px-0"
            rel={item?.rel}
            target="_blank"
          >
            <Image src={item?.logo} alt={item?.alt} height={25} width={25} aspectRatio={1}></Image>
          </Button>
        </li>
      ))}
    </ul>
  );
}
