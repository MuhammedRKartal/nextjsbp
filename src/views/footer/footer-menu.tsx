import clsx from 'clsx';
import data from '../../schemas/footer-menu.json';
import Link from 'next/link';

export type FooterMenuItemType = {
  title: string;
  link: string;
  is_link: boolean;
};

type FooterMenuColumnType = {
  main_title: string;
  item: FooterMenuItemType[];
};

export default async function FooterMenu() {
  return (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-x-4 gap-y-8 py-8',
        'md:grid-cols-3 md:gap-x-8 md:gap-y-16',
        'lg:grid-cols-5'
      )}
    >
      {data?.map((column: FooterMenuColumnType) => (
        <li key={column.main_title}>
          <div className="text-green-900 font-medium mb-5">
            {column.main_title}
          </div>
          <ul className="flex flex-col gap-3">
            {column?.item?.map((item: FooterMenuItemType) => (
              <li key={item.title} className="text-white cursor-pointer">
                {item?.is_link ? (
                  <Link href={item.link} className="hover:text-green-900">
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
