'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AccordionItemProps } from './types';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import clsx from 'clsx';

export const AccordionItem = ({
  accordionId,
  handleToggle,
  active,
  title,
  children,
  className,
  titleClassName,
  activeTitleClassName,
  activeClassName,
  iconClassName,
  showIcon
}: AccordionItemProps) => {
  const isActive = active === accordionId;
  return (
    <div
      className={twMerge(
        'flex flex-col justify-center border-b text-gray-300 border-secondary-darkest pb-2.5 mb-2.5 last:mb-0 first-of-type:border-t first-of-type:pt-2.5',
        className
      )}
    >
      <div
        className="relative flex justify-between items-center cursor-pointer transform duration-300 mx-0.5"
        onClick={() => handleToggle(accordionId)}
      >
        {title && (
          <h3
            className={twMerge(
              'text-sm',
              isActive ? `mb-2` : '',
              isActive ? `${activeTitleClassName}` : '',

              titleClassName
            )}
          >
            {title}
          </h3>
        )}
        {showIcon && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={clsx(
              isActive && 'rotate-90',
              'transfrom duration-200 text-xs'
            )}
          ></FontAwesomeIcon>
        )}
      </div>
      <div
        className={twMerge(
          'transition-[height] duration-200 ease-in-out text-sm overflow-auto no-scrollbar mx-0.5',
          isActive ? `h-12` : 'h-0 ',
          isActive ? `${activeClassName}` : '',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
