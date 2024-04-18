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
        {product?.attributes?.duration && (
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-gray-100">
              {product.attributes.duration.label}{' '}
            </span>{' '}
            <span className="">{product.attributes.duration.value}</span>
          </div>
        )}
        {product?.attributes?.os_compatibility?.value && (
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-gray-100">
              {product.attributes.os_compatibility.label}{' '}
            </span>{' '}
            <span className="">
              {product.attributes.os_compatibility.value}
            </span>
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
