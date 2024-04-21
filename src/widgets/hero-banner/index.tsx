'use server';

import HeroBannerContent from '@/widgets/hero-banner/hero-banner-content';
import data from '@/schemas/hero-banner.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default async function HeroBanner() {
  return <HeroBannerContent content={data.content} />;
}
