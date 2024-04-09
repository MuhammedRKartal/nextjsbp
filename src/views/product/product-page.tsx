import { ProductDefault as Product } from '@/views/product/templates/default';
import { product } from '@/data/urls';

export default async function ProductPage(props) {
  const { pk } = props;

  const data = await (
    await fetch(`${process.env.BACKEND_URL}${product.products}/${pk}`, {
      method: 'GET'
    })
  ).json();

  return (
    <>
      <Product product={data} />
    </>
  );
}
