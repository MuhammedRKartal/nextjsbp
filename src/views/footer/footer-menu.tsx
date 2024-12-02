import Link from "next/link";
import clsx from "clsx";
import data from "@/schemas/footer-menu.json";

export type FooterMenuItemType = {
  title: string;
  link: string;
  is_link: boolean;
  rel?: string;
  target?: string;
};

type FooterMenuColumnType = {
  main_title: string;
  item: FooterMenuItemType[];
};

export default async function FooterMenu() {
  return (
    <ul
      className={clsx(
        "grid grid-cols-2 gap-x-4 gap-y-8 py-8",
        "sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16",
        "lg:grid-cols-5"
      )}
    >
      {data?.map((column: FooterMenuColumnType) => (
        <li key={column.main_title}>
          <div className="text-primary font-medium mb-5">{column.main_title}</div>
          <ul className="flex flex-col gap-3">
            {column?.item?.map((item: FooterMenuItemType) => (
              <li key={item.title} className=" cursor-pointer">
                {item?.is_link ? (
                  <Link
                    href={item.link}
                    rel={item.rel}
                    target={item.target}
                    className="hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
