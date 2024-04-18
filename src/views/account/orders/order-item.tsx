import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Price } from '@/components/price';
import { OrderItemType, OrderType } from '@/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface OrderProps {
  data: OrderType;
  className?: string;
}

export const OrderItem = (props: OrderProps) => {
  const { data, className } = props;

  let statusCodeClassName = '';

  switch (data.orderStatus) {
    case 100:
      statusCodeClassName = 'text-gray-400';
      break;
    case 200:
      statusCodeClassName = 'text-secondary-dark';
      break;
    case 300:
      statusCodeClassName = 'text-secondary';
      break;
    case 400:
      statusCodeClassName = 'text-primary-light';
      break;
  }

  return (
    <div
      className={twMerge(
        'relative flex flex-col border w-full py-5 px-5 text-white border-secondary-darkest lg:px-10 lg:py-8',
        className
      )}
    >
      <div className="flex flex-col gap-6 border-b border-secondary-darkest pb-4 mb-12 lg:pb-2 lg:mb-8 lg:gap-4">
        <div className="flex justify-between">
          <div>
            <span className="text-2xl">Order No:</span>{' '}
            <span className="text-lg font-extrabold">
              {data.orderNumber || data.orderId}
            </span>
          </div>
          <Button
            size="xs"
            className="hidden w-full mt-4 lg:block lg:px-12 lg:mt-0 lg:w-auto"
          >
            Order Details
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2 text-sm lg:gap-10 lg:flex-row">
            <div>
              <span className="font-bold">Created Date:</span>{' '}
              <span>{data.createdDate.split('T')[0]}</span>
            </div>

            <div>
              <span className="font-bold">Product Quantity:</span>{' '}
              <span>{data.orderItems.length}</span>
            </div>
            <div>
              <span className="font-bold">Total:</span>{' '}
              <Price
                value={Number(data.totalAmount)}
                currency={data.orderItems[0].product[0].currency_symbol}
              ></Price>
            </div>
          </div>
          <Button size="xs" className="w-full mt-4 lg:hidden">
            Order Details
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 relative">
        <div
          className={clsx(
            'text-sm font-bold md:hidden absolute -top-8',
            statusCodeClassName
          )}
        >
          {data.orderStatusLabel}
        </div>

        {data.orderItems.map((orderItem) => {
          return (
            <>
              <Image
                src={orderItem.product[0].images[0].alt_text}
                alt={orderItem.product[0].images[0].url}
                width={90}
                height={112}
              ></Image>
            </>
          );
        })}
        <div
          className={clsx(
            'text-xs hidden md:ms-20 md:text-sm md:block',
            statusCodeClassName
          )}
        >
          {data.orderStatusLabel}
        </div>
      </div>
    </div>
  );
};
