import { Section } from '@/components/section';
import { ProductDefault as Product } from '@/views/product/templates/default';
import data from '@/schemas/product.json';

export default function ProductDetail(props) {
  const {
    params: { pk }
  } = props;

  return (
    <Section tag="section">
      <Product product={data} />
    </Section>
  );
}
