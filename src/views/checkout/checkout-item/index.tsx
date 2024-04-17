'use client';

import { Image } from '@/components/image';
import { CheckoutItemPrice } from './price';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { basketApi, useUpdateQuantityMutation } from '@/data/client/basket';
import { useAppDispatch } from '@/redux/hooks';
import { signOut } from 'next-auth/react';
import { Select } from '@/components/select';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutItem(props) {
  const { checkoutItem } = props;
  console.log(checkoutItem);

  const product = checkoutItem.product;

  return (
    <li
      className={clsx(
        'relative flex flex-row pt-4 pb-3.5 border-secondary-darkest border-b ',
        'last-of-type:pb-10',
        'first-of-type:border-t',
        'lg:last-of-type:pb-3.5'
      )}
    >
      <Link href={`/product/${product.pk}`}>
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt_text}
          width={80}
          height={100}
        ></Image>
      </Link>

      <div className="flex justify-between w-full gap-2 px-2">
        <div className="flex flex-col justify-between gap-2w-full pr-4 lg:pr-0">
          <div>
            <Link href={`/product/${product.pk}`} className="text-sm">
              <span>{product.name}</span>
            </Link>
            <div className="text-xs">{product.short_description}</div>
          </div>
          <div>
            <ul>
              <li className="text-xs">
                <span className="font-bold text-gray-100">Duration: </span>{' '}
                <span className="">30 Days</span>
              </li>
              <li className="text-xs">
                <span className="font-bold text-gray-100">OS: </span>{' '}
                <span className="">Windows 11</span>
              </li>
            </ul>
          </div>
        </div>
        <CheckoutItemPrice product={product} />
      </div>
    </li>
  );
}
