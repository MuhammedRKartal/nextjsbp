import { Section } from "@/components/section";
import { product } from "@/data/urls";
import { ProductItemType } from "@/types";
import { ProductItemDefault as ProductItem } from "@/views/product-item/templates/default";

export default async function Category() {
  const data = await (
    await fetch(`${process.env.BACKEND_URL}${product.products}`, {
      method: "GET",
    })
  ).json();

  return (
    <>
      <Section tag="section">
        <h1 className="text-4xl font-bold lg:text-3xl mb-6 pb-3 border-b-2 border-outline dark:border-secondaryoutline">
          Products
        </h1>
        <div className="grid grid-cols-1 gap-y-8 gap-x-4 sm:gap-x-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {!data?.error ? (
            data?.map((item: ProductItemType, index) => (
              <ProductItem key={item.pk} product={item} index={index}></ProductItem>
            ))
          ) : (
            <>{data?.error}</>
          )}
        </div>
      </Section>
    </>
  );
}
