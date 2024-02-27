'use client';
import { Section } from '@/components/section';
import data from '@/schemas/products.json';
import { ProductItemType } from '@/types';
import { ProductItemDefault as ProductItem } from '@/views/product-item/templates/default';

export default function ListPage() {
  return (
    <>
      <Section
        itemtag="section"
        className="flex flex-col items-center lg:items-stretch col-span-2 lg:col-span-1"
      >
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((item: ProductItemType, index) => (
            <ProductItem
              key={'a'}
              product={item}
              width={250}
              height={400}
              index={index}
            ></ProductItem>
          ))}
        </div>
      </Section>
    </>
  );
}
