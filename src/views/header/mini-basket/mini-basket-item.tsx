import { Image } from '@/components/image';
import { Price } from '@/components/price';
import { basketApi, useUpdateQuantityMutation } from '@/data/client/basket';
import { useAppDispatch } from '@/redux/hooks';
import { BasketItem } from '@/types';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

interface MiniBasketItemProps {
  basketItem: BasketItem;
  highlightedItem: number;
}

export default function MiniBasketItem(props: MiniBasketItemProps) {
  const { basketItem } = props;
  const dispatch = useAppDispatch();
  const [updateQuantityMutation] = useUpdateQuantityMutation();

  const [updateLoading, setUpdateLoading] = useState(false);

  const removeItem = () => {
    updateQuantityMutation({
      productPk: String(basketItem.product.pk),
      quantity: 0
    })
      .unwrap()
      .then((data) =>
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data);
            }
          )
        )
      );
  };

  const updateItemQuantity = (operation: 'increase' | 'decrease') => {
    const opt =
      operation === 'increase'
        ? basketItem.quantity + 1
        : basketItem.quantity - 1;
    setUpdateLoading(true);
    updateQuantityMutation({
      productPk: String(basketItem.product.pk),
      quantity: opt
    })
      .unwrap()
      .then((data) => {
        setTimeout(() => {
          dispatch(
            basketApi.util.updateQueryData(
              'getBasket',
              undefined,
              (draftBasket) => {
                Object.assign(draftBasket, data);
              }
            )
          );
          setUpdateLoading(false);
        }, 1000);
      });
  };

  return (
    <li
      className={clsx(
        'flex gap-3 py-4 border-b border-gray-300 last:border-b-0'
      )}
    >
      <Link
        href={`/product/${basketItem.product.pk}`}
        className={clsx('block shrink-0 transition-all duration-300')}
      >
        <Image
          src={basketItem.image ?? ''}
          alt={basketItem.product.name}
          width={48}
          height={48}
          className="transition-all duration-300"
        />
      </Link>
      <div className="w-full">
        <div className="flex flex-row justify-between items-start">
          <Link
            href={`/product/${basketItem.product.pk}`}
            className="block text-xs"
          >
            {basketItem.product.name}
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            className="transition-all duration-300 text-gray-400 hover:cursor-pointer hover:text-secondary-dark "
            onClick={removeItem}
          ></FontAwesomeIcon>
        </div>
        <div className="text-sm flex justify-between mt-3">
          <div>
            {'Quantity'}: {basketItem.quantity}
            <span className="inline-flex items-center ms-2">
              <button
                className="rounded h-full w-5 hover:bg-secondary-darkest disabled:hover:bg-secondary-black"
                onClick={() => updateItemQuantity('decrease')}
                disabled={updateLoading}
              >
                -
              </button>
              <button
                className="rounded h-full w-5 hover:bg-secondary-darkest disabled:hover:bg-secondary-black"
                onClick={() => updateItemQuantity('increase')}
                disabled={updateLoading}
              >
                +
              </button>
              {updateLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin ms-1"
                ></FontAwesomeIcon>
              )}
            </span>
          </div>
          <Price value={Number(basketItem.price)} />
        </div>
      </div>
    </li>
  );
}
