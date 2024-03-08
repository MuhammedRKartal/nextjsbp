'use client';
import { ProductDefault as Product } from '@/views/product/templates/default';
import { useGetProductByPkQuery } from '@/data/client/product';

export default function ProductPage(props) {
  const { pk } = props;

  const { data, isLoading, isSuccess } = useGetProductByPkQuery(pk);

  return (
    <>
      {isLoading && <div>Loading</div>}{' '}
      {isSuccess && <Product product={data} />}
    </>
  );
}
