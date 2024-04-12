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
        title="Description"
        titleClassName="text-sm"
        active={active}
        showIcon={true}
      >
        {product?.description && <div className="">{product.description}</div>}
      </AccordionItem>

      <AccordionItem
        accordionId={2}
        handleToggle={handleToggle}
        title="Short Description"
        titleClassName="text-sm"
        active={active}
        showIcon={true}
      >
        {product?.short_description && <div>{product.short_description}</div>}
      </AccordionItem>
    </div>
  );
};
