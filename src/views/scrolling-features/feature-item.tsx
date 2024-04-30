import { Image } from '@/components/image';
import { FeatureItemType } from '@/types';

export const FeatureItem = ({ item }: { item: FeatureItemType }) => {
  return (
    <div className="inline-flex items-center px-8 gap-4 max-w-none">
      <Image
        loading="lazy"
        src={item?.image?.url}
        alt={item?.image?.alt_text}
        width={32}
        height={32}
        className="invert dark:invert-0"
      ></Image>

      <span className="text-xs font-bold uppercase whitespace-nowrap">
        {item?.text}
      </span>
    </div>
  );
};
