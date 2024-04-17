'use client';

import { AccordionItem } from '@/components/accordion-item';
import { useState } from 'react';

export const Details = (props) => {
  const { product } = props;

  const [active, setActive] = useState(1);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="mt-8">
      <AccordionItem
        accordionId={1}
        handleToggle={handleToggle}
        title="Short Description"
        titleClassName="text-sm"
        active={active}
        showIcon={true}
      >
        {product?.short_description && <div>{product.short_description}</div>}
      </AccordionItem>

      <AccordionItem
        accordionId={2}
        handleToggle={handleToggle}
        title="Features"
        titleClassName="text-sm"
        active={active}
        showIcon={true}
      >
        {product?.duration && (
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-gray-100">Duration: </span>{' '}
            <span className="">{product.duration}</span>
          </div>
        )}
        {product?.os_compatibility && (
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-gray-100">OS Compatibility: </span>{' '}
            <span className="">{product.os_compatibility}</span>
          </div>
        )}
      </AccordionItem>

      <AccordionItem
        accordionId={3}
        handleToggle={handleToggle}
        title="Description"
        titleClassName="text-sm"
        activeClassName="h-28"
        active={active}
        showIcon={true}
      >
        {product?.description && <>{product.description}</>}
      </AccordionItem>
    </div>
  );
};
