'use server';

import { ScrollingFeatures } from '@/views/scrolling-features';
import HeroBanner from '@/widgets/hero-banner';

export default async function Home() {
  return (
    <>
      <ScrollingFeatures className={'!pb-0'} />
      <HeroBanner></HeroBanner>
    </>
  );
}
