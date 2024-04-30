import { Section } from '@/components/section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { Button } from '@/components/button';

export default function EmptyBasket() {
  return (
    <Section className="flex flex-col gap-20 items-center justify-center  my-20 lg:my-10">
      <div className="text-2xl">Your Shopping Cart is Empty!</div>
      <FontAwesomeIcon icon={faBasketShopping} className="text-[92px]" />
      <Button
        appearance="filled"
        size="lg"
        className="rounded"
        link="/products"
      >
        Start Shopping
      </Button>
    </Section>
  );
}
