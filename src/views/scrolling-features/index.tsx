import { Section } from '@/components/section';
import { FeatureItem } from './feature-item';

import data from '@/schemas/feature-items.json';
import { twMerge } from 'tailwind-merge';
import { FeatureItemType } from '@/types';

export const ScrollingFeatures = async (props) => {
  const { className } = props;
  return (
    <Section
      outerClassName={twMerge('!px-0 overflow-hidden', className)}
      className="w-full !max-w-[unset]"
    >
      <div className="flex items-center justify-center w-full relative pointer-events-none">
        <div className="w-full inline-flex gap-2 justify-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="flex animate-loop-scroll">
            {data.map((item: FeatureItemType) => (
              <FeatureItem item={item} />
            ))}
          </div>
          <div
            className="flex animate-loop-scroll-2 absolute"
            aria-hidden="true"
          >
            {data.map((item) => (
              <FeatureItem item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
