'use client';

import { Button } from '@/components/button';
import { basketApi, useGetBasketQuery } from '@/data/client/basket';
import { useAddProductMutation } from '@/data/client/product';
import { useAppDispatch } from '@/redux/hooks';
import { openMiniBasket, setHighlightedItem } from '@/redux/reducers/pop-ups';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Add = (props) => {
  const { product } = props;
  const { in_stock } = product;

  const [isloading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        .then((res) => {
          setTimeout(() => {
            setLoading(false);
            dispatch(openMiniBasket());
            dispatch(setHighlightedItem(product));
            setTimeout(() => {
              dispatch(setHighlightedItem(null));
            }, 3000);
          }, 500);
        })
        .catch((error) => {
          if (error.status === 401) {
            signOut();
          }
          if (error.status === 400) {
            setLoading(false);
            setErrorMessage(error.data.error);
          }
        });
    }
  };

  return (
    <>
      {in_stock ? (
        <>
          <Button
            isloading={isloading}
            onClick={() => onClickAction(product.pk)}
            className={clsx(
              'fixed bottom-0 left-0 rounded-none w-full font-bold px-12 h-[3.5rem] gap-2',
              'md:relative md:h-12 md:rounded-sm'
            )}
          >
            <FontAwesomeIcon
              icon={faBasketShopping}
              size="sm"
            ></FontAwesomeIcon>
            <span>Add to Basket</span>
          </Button>
          <div className="text-xs text-error text-center">{errorMessage}</div>
        </>
      ) : (
        <>
          <Button
            appearance="outlined"
            className={clsx(
              'fixed bottom-0 left-0 rounded-none w-full font-bold px-12 h-[3.5rem] gap-2',
              'md:relative md:h-12 md:rounded-sm'
            )}
          >
            <FontAwesomeIcon icon={faBell} size="sm"></FontAwesomeIcon>
            <span>Not in Stock</span>
          </Button>
        </>
      )}
    </>
  );
};
