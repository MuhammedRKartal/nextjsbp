import Checkout from '@/views/checkout';

export default async function CheckoutPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return <Checkout />;
}
