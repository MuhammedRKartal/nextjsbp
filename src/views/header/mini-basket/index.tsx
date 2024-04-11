import { Price } from '@/components/price';
import { useGetBasketQuery } from '@/data/client/basket';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeMiniBasket } from '@/redux/reducers/mini-basket';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import MiniBasketItem from './mini-basket-item';
import { Button } from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCross } from '@fortawesome/free-solid-svg-icons';

export default function MiniBasket() {
  const { open: miniBasketOpen, highlightedItem } = useAppSelector(
    (state) => state.miniBasket
  );
  const dispatch = useAppDispatch();
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();

  const totalQuantity = useMemo(() => basket?.total_quantity ?? 0, [basket]);
  const [highlightedItemPk, setHighlightedItemPk] = useState(0);
  const [sortedBasket, setSortedBasket] = useState([]);

  useEffect(() => {
    if (highlightedItem > 0) {
      setHighlightedItemPk(highlightedItem);
    }
  }, [highlightedItem]);

  useEffect(() => {
    if (isSuccess) {
      if (highlightedItemPk > 0) {
        setSortedBasket(
          basket.product_list.slice().sort((a, b) => {
            if (a.product.pk === highlightedItemPk) {
              return -1;
            } else if (b.product.pk === highlightedItemPk) {
              return 1;
            } else {
              return Number(a.product.pk) - Number(b.product.pk);
            }
          })
        );
      } else {
        setSortedBasket(basket.product_list);
      }
    }
  }, [isSuccess, highlightedItem, basket]);

  return (
    <>
      <div
        className={clsx(
          miniBasketOpen
            ? 'opacity-100 visible lg:opacity-0'
            : 'opacity-0 invisible',
          'fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80 transition-all duration-300'
        )}
        onClick={() => {
          dispatch(closeMiniBasket());
        }}
      />
      <div
        className={clsx(
          miniBasketOpen
            ? 'flex flex-col opacity-100 visible lg:translate-y-[calc(100%)]'
            : 'opacity-0 invisible translate-x-full lg:translate-x-0 lg:translate-y-[calc(100%+16px)]',
          'fixed bottom-0 right-0 h-screen lg:h-auto bg-secondary-black text-white z-50 transition-all duration-300 p-5 w-full rounded',
          'sm:w-96',
          'lg:absolute lg:right-8 lg:-bottom-1 lg:border lg:border-secondary-darkest'
        )}
      >
        <header className="flex items-center justify-between gap-2 pb-4 border-b uppercase lg:pb-2 lg:mb-3 text-gray-300">
          <h3 className="text-xs lg:text-sm">{'My Bag'}</h3>
          <FontAwesomeIcon
            onClick={() => {
              dispatch(closeMiniBasket());
            }}
            className="transition-all duration-300 text-lg  hover:text-white hover:cursor-pointer  lg:hidden"
            icon={faClose}
          ></FontAwesomeIcon>
        </header>
        {isSuccess && (
          <ul className="overflow-y-auto lg:max-h-64 flex flex-col px-5">
            {sortedBasket.map((basketItem) => (
              <MiniBasketItem
                key={basketItem.item_id}
                basketItem={basketItem}
                highlightedItem={highlightedItem}
              />
            ))}
          </ul>
        )}
        <footer className="flex flex-col gap-3 mt-auto lg:mt-3 lg:flex-1">
          <div className="flex justify-between items-center px-3">
            <span className="text-sm font-semibold">{'Total Price'}</span>
            <span className="text-base font-bold">
              <Price value={Number(basket?.total_amount)} />
            </span>
          </div>
          <Button
            link={'/'}
            className="w-full"
            onClick={() => dispatch(closeMiniBasket())}
          >
            View Basket
          </Button>
        </footer>
      </div>
    </>
  );
}
