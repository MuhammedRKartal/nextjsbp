"use server";

import data from "@/schemas/hero-banner.json";
import HeroBannerContent from "@/widgets/hero-banner/hero-banner-content";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default async function HeroBanner() {
  return <HeroBannerContent content={data.content} />;
}
