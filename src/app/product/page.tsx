import { Section } from '@/components/section';
import ProductPage from '@/views/product/product-page';

export default function ProductDetail(props) {
  const {
    searchParams: { pk }
  } = props;

  return (
    <Section tag="section">
      <ProductPage pk={pk} />
    </Section>
  );
}
