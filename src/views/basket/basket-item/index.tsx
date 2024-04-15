'use client';

import { Image } from '@/components/image';
import { BasketItemPrice } from './price';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { basketApi, useUpdateQuantityMutation } from '@/data/client/basket';
import { useAppDispatch } from '@/redux/hooks';
import { signOut } from 'next-auth/react';
import { Select } from '@/components/select';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BasketItem(props) {
  const { basketItem } = props;
  const product = basketItem.product;
  let stock = basketItem.stock > 10 ? 10 : basketItem.stock;
  const options = [];

  for (let i = 0; i < Number(stock); i++) {
    options.push({ label: String(i), value: i });
  }

  const [selectedOption, setSelectedOption] = useState(basketItem.quantity);
  const [updateLoading, setUpdateLoading] = useState(false);

  console.log(selectedOption);

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

  const updateItemQuantity = (quantity: number) => {
    setUpdateLoading(true);
    updateQuantityMutation({
      productPk: String(basketItem.product.pk),
      quantity: quantity
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
      })
      .catch((error) => {
        if (error.status === 401) {
          signOut();
        }
        if (error.status === 400) {
          setUpdateLoading(false);
        }
      });
  };

  useEffect(() => {
    setSelectedOption(basketItem.quantity);
  }, [basketItem]);

  useEffect(() => {
    if (
      basketItem.quantity !== 0 &&
      selectedOption &&
      selectedOption !== basketItem.quantity
    ) {
      updateItemQuantity(Number(selectedOption));
    }
  }, [selectedOption]);

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
          src={basketItem.image}
          alt={product.name}
          width={120}
          height={146}
        ></Image>
      </Link>

      <div className="flex flex-wrap w-full gap-2 px-2">
        <div className="flex flex-col gap-2w-full pr-4 lg:pr-0 lg:flex-[2]">
          <Link href={`/product/${product.pk}`} className="text-sm">
            <span>{product.name}</span>
          </Link>
          <span className="text-xs">{product.short_description}</span>
        </div>
        <div className="flex items-end justify-start w-[calc(50%-4px)] lg:flex-1 lg:items-center">
          {selectedOption && (
            <Select
              options={options}
              loading={updateLoading}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            ></Select>
          )}
        </div>
        <div className="flex items-end justify-end w-[calc(50%-4px)] lg:justify-center lg:flex-1 lg:items-center">
          <BasketItemPrice product={product} />
        </div>
        <div
          className="absolute top-4 right-2 flex lg:relative lg:items-center lg:top-0"
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
