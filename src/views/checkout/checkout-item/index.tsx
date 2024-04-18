'use client';

import { Image } from '@/components/image';
import { CheckoutItemPrice } from './price';
import clsx from 'clsx';
import Link from 'next/link';

export default function CheckoutItem(props) {
  const { checkoutItem } = props;

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
            {product?.attributes?.duration && (
              <div className="text-gray-300 text-sm">
                <span className="font-bold text-gray-100">
                  {product.attributes.duration.label}{' '}
                </span>{' '}
                <span className="">{product.attributes.duration.value}</span>
              </div>
            )}
            {product?.attributes?.os_compatibility?.value && (
              <div className="text-gray-300 text-xs">
                <span className="font-bold text-gray-100">
                  {product.attributes.os_compatibility.label}{' '}
                </span>{' '}
                <span className="">
                  {product.attributes.os_compatibility.value}
                </span>
              </div>
            )}
          </div>
        </div>
        <CheckoutItemPrice product={product} />
      </div>
    </li>
  );
}
