'use client';

import { Section } from '@/components/section';
import data from '@/schemas/products.json';
import { ProductItemType } from '@/types';
import { ProductItemDefault as ProductItem } from '@/views/product-item/templates/default';

export default function Category() {
  return (
    <>
      <Section
        tag="section"
        className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-x-8 lg:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {data?.map((item: ProductItemType, index) => (
          <ProductItem key={item.pk} product={item} index={index}></ProductItem>
        ))}
      </Section>
    </>
  );
}
