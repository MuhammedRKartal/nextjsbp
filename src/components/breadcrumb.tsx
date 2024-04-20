'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ROUTES } from '@/routes';

export interface BreadcrumbResultType {
  url: string;
  text: string;
}

export interface BreadcrumbProps {
  breadcrumbList?: BreadcrumbResultType[];
  includeHome?: boolean;
  className?: string;
  linkClassName?: string;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const {
    breadcrumbList = [],
    includeHome = false,
    className,
    linkClassName
  } = props;

  let list = [] as BreadcrumbResultType[];
  if (includeHome) {
    list = [{ url: ROUTES.HOME, text: 'Home' }];
  }
  list = [
    ...list,
    ...breadcrumbList.map((breadcrumb) => {
      return {
        url: breadcrumb.url,
        text: breadcrumb.text
      };
    })
  ];

  return (
    <div className={twMerge('flex items-center mb-4', className)}>
      {list.map((item, index) => (
        <div key={index} className="text-gray-400">
          <Link
            href={item.url}
            className={twMerge(
              'text-sm last:text-white last:font-semibold',
              linkClassName
            )}
          >
            {item.text}
          </Link>
          {index !== list.length - 1 && (
            <span className="ms-1 me-2 text-xs"> / </span>
          )}
        </div>
      ))}
    </div>
  );
}
