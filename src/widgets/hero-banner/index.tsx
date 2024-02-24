import 'server-only';
import HeroBannerContent from './hero-banner-content';
import data from '../../schemas/hero-banner.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default async function HeroBanner() {
  return <HeroBannerContent content={data.content} />;
}
