'use client';

import { twMerge } from 'tailwind-merge';
import { TabItemProps } from '../types';

export const TabItem = ({
  tabId,
  handleToggle,
  active,
  title,
  className
}: TabItemProps) => {
  const isActive = active === tabId;
  return (
    <div
      className={twMerge(
        'cursor-pointer border border-outline dark:border-secondaryoutline px-8 py-4 whitespace-nowrap',
        isActive ? 'border-b-black z-10' : 'z-0',
        className
      )}
      onClick={() => handleToggle(tabId)}
    >
      {title && <h3 className="text-sm font-bold">{title}</h3>}
    </div>
  );
};
