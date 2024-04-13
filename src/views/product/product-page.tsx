import { ProductDefault as Product } from '@/views/product/templates/default';

export default async function ProductPage(props) {
  const { data } = props;

  return (
    <>
      <Product product={data} />
    </>
  );
}
