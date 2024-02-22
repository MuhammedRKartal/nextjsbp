export type HeroBannerType = {
    content: HeroBannerContentType[];
};

export type HeroBannerContentType = {
    is_image: boolean;
    image: string;
    mobile_image: string;
    image_alt: string;
    title: string | null;
    description: string | null;
    button_text: string | null;
    button_target_url: string | null;
};