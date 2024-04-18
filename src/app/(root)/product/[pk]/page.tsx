import { Section } from '@/components/section';
import { URLS, product } from '@/data/urls';
import { PageProps, ProductItemType } from '@/types';
import ProductPage from '@/views/product/product-page';
import { Metadata, ResolvingMetadata } from 'next';
import { ImageResponseOptions } from 'next/server';

type Props = {
  params: { pk: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.pk;
  const product = await (
    await fetch(
      `${process.env.BACKEND_URL}${URLS.product.getProductByPk(id)}`,
      {
        method: 'GET'
      }
    )
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
}: PageProps<{ pk: string }>) {
  const data = await (
    await fetch(
      `${process.env.BACKEND_URL}${URLS.product.getProductByPk(params.pk)}`,
      {
        method: 'GET'
      }
    )
  ).json();

  return (
    <Section tag="section">
      <ProductPage data={data} />
    </Section>
  );
}