import { Price } from '@/components/price';
import { useGetBasketQuery } from '@/data/client/basket';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeMiniBasket, openMiniBasket } from '@/redux/reducers/pop-ups';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import MiniBasketItem from './mini-basket-item';
import { Button } from '@/components/button';
import { signOut, useSession } from 'next-auth/react';
import { SliderMenu } from '@/components/slider-menu';
import { twMerge } from 'tailwind-merge';

export default function MiniBasket() {
  const { openMiniBasket: miniBasketOpen, highlightedItem } = useAppSelector(
    (state) => state.popUps
  );
  const dispatch = useAppDispatch();

  const {
    data: basket,
    isLoading,
    isSuccess,
    error: basketError
  } = useGetBasketQuery();

  const { data, status } = useSession();
  const userMail = data?.user?.email;

  const miniBasketList = useRef();

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
        className={twMerge(
          miniBasketOpen
            ? 'opacity-100 visible lg:opacity-0'
            : 'opacity-0 invisible',
          'fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80 transition-all duration-300'
        )}
        onClick={() => {
          dispatch(closeMiniBasket());
        }}
      />
      <SliderMenu
        open={miniBasketOpen}
        closePop={closeMiniBasket()}
        enableDesktop={true}
        desktopWidth="sm:w-96"
      >
        <header className="flex items-center justify-between gap-2 pb-4 border-b uppercase lg:pb-2 lg:mb-3 text-gray-300">
          <h3 className="text-xs lg:text-sm">{'My Bag'}</h3>
        </header>
        {isSuccess && (
          <ul
            className="overflow-y-auto lg:max-h-64 flex flex-col px-5 no-scrollbar"
            ref={miniBasketList}
          >
            {sortedBasket.map((basketItem) => (
              <MiniBasketItem
                key={basketItem.item_id}
                basketItem={basketItem}
                miniBasketListRef={miniBasketList}
                highlightedItem={highlightedItem}
              />
            ))}
          </ul>
        )}
        <footer className="flex flex-col gap-3 mt-auto lg:mt-3 lg:flex-1">
          <div className="flex justify-between items-center px-3">
            <span className="text-sm font-semibold">{'Total Price'}</span>
            <span className="text-base font-bold">
              <Price
                value={Number(basket?.total_amount)}
                currency={basket?.product_list[0]?.currency_symbol}
              />
            </span>
          </div>
          <Button
            link={'/baskets/basket'}
            className="w-full"
            onClick={() => dispatch(closeMiniBasket())}
          >
            View Basket
          </Button>
        </footer>
      </SliderMenu>
    </>
  );
}
