'use client';

import { Section } from '@/components/section';
import data from '@/schemas/products.json';
import { ProductItemType } from '@/types';
import { ProductItemDefault as ProductItem } from '@/views/product-item/templates/default';

export default function Category() {
  return (
    <>
      <Section
        itemtag="section"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
      >
        {data?.map((item: ProductItemType, index) => (
          <ProductItem key={item.pk} product={item} index={index}></ProductItem>
        ))}
      </Section>
    </>
  );
}
