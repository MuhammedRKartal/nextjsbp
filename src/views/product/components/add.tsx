"use client";

import { useState } from "react";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons/faBasketShopping";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { basketApi } from "@/data/client/basket";
import { useAddProductMutation } from "@/data/client/product";
import { useAppDispatch } from "@/redux/hooks";
import { openMiniBasket, sethighlightedItem } from "@/redux/reducers/pop-ups";
import { ROUTES } from "@/routes";

export const Add = props => {
  const { product } = props;
  const { in_stock } = product;

  const [isloading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { status } = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [addProduct] = useAddProductMutation();

  const onClickAction = async product => {
    if (status === "unauthenticated") {
      router.push(ROUTES.LOGIN);
    } else {
      setLoading(true);
      await addProduct({
        productPk: product,
        quantity: 1,
      })
        .unwrap()
        .then(data =>
          dispatch(
            basketApi.util.updateQueryData("getBasket", undefined, draftBasket => {
              Object.assign(draftBasket, data);
            })
          )
        )
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            dispatch(openMiniBasket());
            dispatch(sethighlightedItem(product));
            setTimeout(() => {
              dispatch(sethighlightedItem(null));
            }, 3000);
          }, 500);
        })
        .catch(error => {
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
              "fixed bottom-0 left-0 rounded-none w-full font-bold px-12 h-[3.5rem] gap-2 z-10",
              "md:relative md:h-12"
            )}
          >
            <FontAwesomeIcon icon={faBasketShopping} size="sm"></FontAwesomeIcon>
            <span>Add to Basket</span>
          </Button>
          <div className="text-xs text-error text-center">{errorMessage}</div>
        </>
      ) : (
        <>
          <Button
            appearance="outlined"
            className={clsx(
              "fixed bottom-0 left-0 rounded-none w-full font-bold px-12 h-[3.5rem] gap-2 z-10",
              "md:relative md:h-12"
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
