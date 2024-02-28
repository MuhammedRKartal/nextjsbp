import { Section } from '@/components/section';
import Category from '@/views/category';

export default function ProductDetail(props) {
  const {
    params: { pk }
  } = props;

  return (
    <Section tag="section">
      <span className="text-white">{pk}</span>
    </Section>
  );
}
