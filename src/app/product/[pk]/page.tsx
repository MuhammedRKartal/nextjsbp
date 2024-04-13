import { Section } from '@/components/section';
import { product } from '@/data/urls';
import { PageProps, ProductItemType } from '@/types';
import ProductPage from '@/views/product/product-page';
import { Metadata, ResolvingMetadata } from 'next';
import { ImageResponseOptions } from 'next/server';

type Props = {
  params: { pk: string };
  data: ProductItemType;
};

export async function generateMetadata(
  { params, data }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.pk;
  const product = await (
    await fetch(`${process.env.BACKEND_URL}/web/products/${id}`, {
      method: 'GET'
    })
  ).json();

  return {
    title: product.name,
    description: product.short_description,
    twitter: {
      title: product.name,
      description: product.short_description
    },
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images?.map((item) => ({
        url: item.url
      }))
    }
  };
}

export default async function ProductDetail({
  params
}: PageProps<{ pk: Number }>) {
  const data = await (
    await fetch(`${process.env.BACKEND_URL}${product.products}/${params.pk}`, {
      method: 'GET'
    })
  ).json();

  console.log(
    data.images.map((image) => {
      return {
        url: image.url,
        width: 400,
        height: 400
      };
    })
  );

  return (
    <Section tag="section">
      <ProductPage data={data} />
    </Section>
  );
}
