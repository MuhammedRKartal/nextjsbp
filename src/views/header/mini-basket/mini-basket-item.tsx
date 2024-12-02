import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { Image } from "@/components/image";
import { Price } from "@/components/price";
import { basketApi, useUpdateQuantityMutation } from "@/data/client/basket";
import { useAppDispatch } from "@/redux/hooks";
import { BasketItemType } from "@/types";

interface MiniBasketItemProps {
  basketItem: BasketItemType;
  highlightedItem: number | null;
  miniBasketListRef: MutableRefObject<HTMLUListElement | null>;
}

export default function MiniBasketItem({
  basketItem,
  highlightedItem,
  miniBasketListRef,
}: MiniBasketItemProps) {
  const dispatch = useAppDispatch();
  const [updateQuantityMutation] = useUpdateQuantityMutation();

  const [updateLoading, setUpdateLoading] = useState(false);

  const isHighlighted = useMemo(() => {
    return highlightedItem === basketItem.product.pk;
  }, [highlightedItem, basketItem.product.pk]);

  useEffect(() => {
    const miniBasketList = miniBasketListRef.current;
    if (miniBasketList && highlightedItem === basketItem.product.pk) {
      miniBasketList.scrollTop = 0;
    }
  }, [highlightedItem, basketItem.product.pk, miniBasketListRef]);

  const removeItem = async () => {
    setUpdateLoading(true);
    try {
      const data = await updateQuantityMutation({
        productPk: String(basketItem.product.pk),
        quantity: 0,
      }).unwrap();

      dispatch(
        basketApi.util.updateQueryData("getBasket", undefined, draftBasket => {
          Object.assign(draftBasket, data);
        })
      );
    } catch (error) {
      // handle error if needed
    } finally {
      setUpdateLoading(false);
    }
  };

  const updateItemQuantity = async (operation: "increase" | "decrease") => {
    const newQuantity =
      operation === "increase" ? basketItem.quantity + 1 : basketItem.quantity - 1;
    setUpdateLoading(true);
    try {
      const data = await updateQuantityMutation({
        productPk: String(basketItem.product.pk),
        quantity: newQuantity,
      }).unwrap();

      dispatch(
        basketApi.util.updateQueryData("getBasket", undefined, draftBasket => {
          Object.assign(draftBasket, data);
        })
      );
    } catch (error) {
      // handle error if needed
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <li
      style={{ order: isHighlighted ? "-1" : "0" }}
      className="flex gap-3 py-4 border-b border-outline-100 dark:border-secondaryoutline-600"
    >
      <Link
        href={`/product/${basketItem.product.pk}`}
        className="block shrink-0 transition-all duration-300"
      >
        <Image
          src={basketItem.image ?? ""}
          alt={basketItem.product.name}
          width={isHighlighted ? 54 : 48}
          height={isHighlighted ? 54 : 48}
          className="transition-all duration-300"
        />
      </Link>
      <div className="w-full">
        <div className="flex flex-row justify-between items-start">
          <Link href={`/product/${basketItem.product.pk}`} className="block text-xs">
            {basketItem.product.name}
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            className="transition-all duration-300 text-white-400 dark:text-black-600 hover:cursor-pointer hover:text-outline-600"
            onClick={removeItem}
          />
        </div>
        <div className="text-sm flex justify-between mt-3">
          <div>
            {"Quantity"}: {basketItem.quantity}
            <span className="inline-flex items-center ms-2">
              <button
                className="rounded h-full w-5 hover:bg-primary-100 dark:hover:bg-secondary-500 disabled:hover:bg-primary-900 dark:disabled:hover:bg-secondary-100"
                onClick={() => updateItemQuantity("decrease")}
                disabled={updateLoading || basketItem.quantity <= 1}
              >
                -
              </button>
              <button
                className={clsx(
                  "rounded h-full w-5 hover:bg-primary-100 dark:hover:bg-secondary-500 disabled:hover:bg-primary-900 dark:disabled:hover:bg-secondary-100",
                  basketItem.stock <= basketItem.quantity &&
                    "text-primary-100 dark:text-secondary-900"
                )}
                onClick={() => updateItemQuantity("increase")}
                disabled={updateLoading || basketItem.stock <= basketItem.quantity}
              >
                +
              </button>

              {updateLoading && <FontAwesomeIcon icon={faSpinner} className="animate-spin ms-1" />}
            </span>
          </div>
          <Price value={Number(basketItem.price)} currency={basketItem.currency_symbol} />
        </div>
      </div>
    </li>
  );
}
