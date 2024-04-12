'use client';

import { Button } from '@/components/button';
import { basketApi } from '@/data/client/basket';
import { useAddProductMutation } from '@/data/client/product';
import { useAppDispatch } from '@/redux/hooks';
import {
  openMiniBasket,
  setHighlightedItem
} from '@/redux/reducers/mini-basket';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Add = (props) => {
  const { product } = props;

  const [isloading, setLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [addProduct] = useAddProductMutation();

  const onClickAction = async (product) => {
    if (session?.status === 'unauthenticated') {
      router.replace('/login');
    } else {
      setLoading(true);
      await addProduct({
        productPk: product,
        quantity: 1
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
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            dispatch(openMiniBasket());
            dispatch(setHighlightedItem(product));
            setTimeout(() => {
              dispatch(setHighlightedItem(null));
            }, 3000);
          }, 500);
        });
    }
  };

  return (
    <Button
      isloading={isloading}
      onClick={() => onClickAction(product.pk)}
      className={clsx(
        'fixed bottom-0 left-0 rounded-none w-full text-lg font-bold px-12 h-[3.5rem] gap-2',
        'md:relative md:h-12 md:rounded-sm'
      )}
    >
      <FontAwesomeIcon icon={faBasketShopping} size="sm"></FontAwesomeIcon>
      Add to Basket
    </Button>
  );
};
