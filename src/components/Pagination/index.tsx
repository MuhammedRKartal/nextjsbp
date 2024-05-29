import { useCallback, useEffect, useState } from 'react';
import { PaginationProps } from '../types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

import Link from 'next/link';
import usePagination from './hook';

export const Pagination = (props: PaginationProps) => {
  const {
    total,
    limit,
    currentPage,
    numberOfPages,
    className,
    itemClassName,
    threshold = 1,
    render
  } = props;

  const pagination = usePagination(total, limit, currentPage, numberOfPages);
  const {
    total: paginationTotal,
    limit: paginationLimit,
    page,
    pageList,
    setTotal,
    setLimit
  } = pagination;

  const [paginationItems, setPaginationItems] = useState([]);

  const createListItems = useCallback(() => {
    setPaginationItems([]);
    const delta = 2;
    const startPage = Math.max(Number(page) - delta / 2, 1);
    const endPage = Math.min(Number(page) + delta / 2, numberOfPages);

    setPaginationItems((prev) => [
      ...prev,
      {
        page: pageList[0]?.page,
        url: pageList[0]?.url
      }
    ]);

    if (delta <= startPage) {
      setPaginationItems((prev) => [...prev, { page: '...', url: '#' }]);
    }

    // 1 2 3 4 ![... 6]
    for (let i = startPage; i < endPage; i++ && i < pageList.length) {
      setPaginationItems((prev) => [
        ...prev,
        {
          page: pageList[i]?.page,
          url: pageList[i]?.url
        }
      ]);
    }

    // 1 2 3 4 ... 6
    if (endPage <= numberOfPages - delta) {
      setPaginationItems((next) => [...next, { page: '...', url: '#' }]);
    }

    //last item
    if (page < numberOfPages - delta) {
      setPaginationItems((prev) => [
        ...prev,
        {
          page: pageList[pageList.length - threshold]?.page,
          url: pageList[pageList.length - threshold]?.url
        }
      ]);
    }
  }, [numberOfPages, page, pageList, threshold]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const href = new URL(
      e.target.href ? e.target.href : e.target.parentNode.href
    ).searchParams.get('page');
    const url = new URL(location.href);

    if (href) {
      url.searchParams.delete('page');
      url.searchParams.append('page', href);
    } else {
      url.searchParams.delete('page');
    }

    window.location.href = url.href;
  };

  useEffect(() => {
    createListItems();
  }, [createListItems, page]);

  useEffect(() => {
    if (total && total !== paginationTotal) {
      setTotal(total);
    }
  }, [total, paginationTotal, setTotal]);

  useEffect(() => {
    if (limit && limit !== paginationLimit) {
      setLimit(limit);
    }
  }, [limit, paginationLimit, setLimit]);

  if (render) {
    return <>{render(pagination)}</>;
  }

  return (
    <ul className={twMerge('flex justify-center', className)}>
      {paginationItems.map((item, i) => (
        <li key={i}>
          {item.url != '#' ? (
            <Link
              onClick={handleClick}
              href={item.url}
              className={twMerge(
                clsx(
                  'relative text-xs',
                  'px-3 py-4 flex items-center justify-center',
                  'cursor-pointer text-black-400',
                  Number(page) === Number(item.page)
                    ? 'mx-1 p-4 border border-outline dark:border-secondaryoutline'
                    : ''
                ),
                itemClassName
              )}
            >
              <span className="absolute z-10 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
                {item.page}
              </span>
            </Link>
          ) : (
            <span className="text-black-400 cursor-default px-1">
              {item.page}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
