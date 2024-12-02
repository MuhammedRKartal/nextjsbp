"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";
import { Section } from "@/components/section";
import { useGetBasketQuery } from "@/data/client/basket";
import { ROUTES } from "@/routes";
import { BasketType } from "@/types";
import CheckoutOptions from "./options";
import CheckoutSummary from "./summary";

export default function Checkout() {
  const { data: basketData, isLoading, isSuccess: basketSuccess } = useGetBasketQuery();
  const [data, setData] = useState(basketData as BasketType);

  useEffect(() => {
    setData(basketData);
  }, [basketSuccess]);

  const router = useRouter();

  if (data) {
    if (
      basketSuccess === true &&
      (data.total_quantity === null || data.total_quantity === undefined)
    ) {
      router.push(ROUTES.ORDERS);
    }
  } else {
    router.push(ROUTES.ORDERS);
  }

  return (
    <>
      <Section tag="section" appearance="thin">
        <div className="flex flex-col lg:flex-row gap-6  lg:gap-10">
          <Loader loading={isLoading} showIcon={false} className="lg:flex-[2] 2xl:flex-[2.5]">
            {basketSuccess && <CheckoutOptions className="lg:flex-[2] 2xl:flex-[2.5]" />}
          </Loader>

          <div className="lg:flex-[1.2] 2xl:flex-[1]">
            {data?.total_quantity !== undefined && (
              <CheckoutSummary data={data} isSuccess={basketSuccess} isLoading={isLoading} />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
