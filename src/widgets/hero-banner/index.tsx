import 'server-only';
import HeroBannerContent from './hero-banner-content';
import data from '../../schemas/hero-banner.json';

import 'swiper/css';
import 'swiper/swiper-bundle.css';

export default async function HeroBanner() {
  return <HeroBannerContent content={data.content} />;
}
