import { Section } from '@/components/section';
import { PageProps } from '@/types';
import ProductPage from '@/views/product/product-page';

export default function ProductDetail({ params }: PageProps<{ pk: Number }>) {
  return (
    <Section tag="section">
      <ProductPage pk={params.pk} />
    </Section>
  );
}
