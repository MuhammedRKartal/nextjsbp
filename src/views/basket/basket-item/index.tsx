'use client';

import { Image } from '@/components/image';
import { BasketItemPrice } from './price';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { basketApi, useUpdateQuantityMutation } from '@/data/client/basket';
import { useAppDispatch } from '@/redux/hooks';
import { signOut } from 'next-auth/react';

export default function BasketItem(props) {
  const { basketItem } = props;
  const product = basketItem.product;
  const [updateQuantityMutation] = useUpdateQuantityMutation();
  const dispatch = useAppDispatch();

  const removeItem = () => {
    updateQuantityMutation({
      productPk: String(product.pk),
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
      )
      .catch((error) => {
        if (error.status === 401) {
          signOut();
        }
      });
  };

  return (
    <li
      className={clsx(
        'flex flex-row pt-4 pb-3.5 border-secondary-darkest border-b ',
        'last-of-type:pb-10',
        'first-of-type:border-t',
        'lg:last-of-type:pb-3.5'
      )}
    >
      <Image
        src={basketItem.image}
        alt={product.name}
        width={120}
        height={146}
      ></Image>

      <div className="relative flex flex-wrap w-full gap-2 px-2">
        <div className="w-full pr-4 lg:pr-0 lg:flex-[2]">
          <div className="text-sm">{product.name}</div>
          <div className="text-xs">{product.short_description}</div>
        </div>
        <div className="flex items-end justify-start w-[calc(50%-4px)] lg:flex-1 lg:items-center">
          UpdateBox
        </div>
        <div className="flex items-end justify-end w-[calc(50%-4px)] lg:justify-center lg:flex-1 lg:items-center">
          <BasketItemPrice product={product} />
        </div>
        <div
          className="absolute top-0 right-2 flex lg:relative lg:items-center"
          onClick={() => {
            removeItem();
          }}
        >
          <FontAwesomeIcon icon={faClose} className="cursor-pointer" />
        </div>
      </div>
    </li>
  );
}
