import { Section } from "@/components/section";
import { URLS } from "@/data/urls";
import { PageProps } from "@/types";
import ProductPage from "@/views/product/product-page";
import { Metadata } from "next";

type Props = {
  params: { pk: string };
};

async function getData(id: string) {
  return (
    await fetch(`${process.env.BACKEND_URL}${URLS.product.getProductByPk(id)}`, {
      method: "GET",
    })
  ).json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.pk;
  const product = await getData(id);

  return {
    title: product.name,
    description: product.short_description,
    twitter: {
      title: product.name,
      description: product.short_description,
    },
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images?.map(item => ({
        url: item.url,
      })),
    },
  };
}

export default async function ProductDetail({ params }: PageProps<{ pk: string }>) {
  const data = await getData(params.pk);

  return (
    <Section tag="section">
      <ProductPage data={data} />
    </Section>
  );
}
