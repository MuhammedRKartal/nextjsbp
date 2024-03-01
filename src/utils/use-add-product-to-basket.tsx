'use client';

import { basketApi } from '@/data/client/basket';
import { AddProductRequest } from '@/data/client/product';
import { useAppDispatch } from '@/redux/hooks';
import {
  openMiniBasket,
  setHighlightedItem
} from '@/redux/reducers/mini-basket';

export const useAddProductToBasket = () => {
  const dispatch = useAppDispatch();
  const [addProduct, options] = useAddProductMutation();

  const addProductToBasket = async ({
    product,
    quantity,
    attributes
  }: AddProductRequest) => {
    await addProduct({
      product,
      quantity,
      attributes
    })
      .unwrap()
      .then((data) =>
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data.basket);
            }
          )
        )
      )
      .then(() => {
        dispatch(openMiniBasket());
        dispatch(setHighlightedItem(product));
        setTimeout(() => {
          dispatch(setHighlightedItem(null));
        }, 3000);
      });
  };

  return [addProductToBasket, options] as const;
};

function useAddProductMutation(): [any, any] {
  throw new Error('Function not implemented.');
}
