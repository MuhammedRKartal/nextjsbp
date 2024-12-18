import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Pagination } from "@/components/Pagination";
import { useGetOrdersQuery } from "@/data/client/account";
import { OrderItem } from "./order-item";

export const AccountOrders = props => {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit"));
  const page = Number(searchParams.get("page"));

  const { data: orders, isSuccess } = useGetOrdersQuery(
    limit
      ? {
          limit: limit,
          page: page,
        }
      : {}
  );

  const { className } = props;

  return (
    <div className={twMerge("relative flex flex-col gap-4 w-full pb-6  ", className)}>
      <header>
        <h3 className="text-3xl">My Orders</h3>
      </header>
      {isSuccess && (
        <>
          <div className="flex justify-between items-center">
            <div className="text-sm">List of Orders</div>
            <Pagination
              className="justify-end"
              total={orders.total_count}
              limit={limit}
              currentPage={page}
              numberOfPages={orders.page_count}
            />
          </div>
          {orders.data.map(order => {
            return <OrderItem data={order} />;
          })}
        </>
      )}
    </div>
  );
};
