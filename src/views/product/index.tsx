import { ProductItemType } from '@/types';

import { Children, cloneElement, ReactNode } from 'react';
import { Images } from './components/images';
import { Details } from './components/details';
import { Information } from './components/information';
import { Wrapper } from './components/wrapper';

interface Props {
  product: ProductItemType;
  children?: ReactNode | ReactNode[];
}

const Product = (props: Props) => {
  const { product, children } = props;

  const pk = product.pk;

  const childrenWithProps = (children) => {
    return Children.map(children, (child) => {
      if (!child) {
        return null;
      }

      const hasChildren = !!child.props?.children;

      if ([Images, Details, Information].includes(child.type)) {
        const clone = cloneElement(child, {
          ...{ ...props },
          ...child.props,
          ...(hasChildren && {
            children: childrenWithProps(child.props.children)
          })
        });
        return clone;
      } else if (hasChildren) {
        const clone = cloneElement(child, {
          ...child.props,
          children: childrenWithProps(child.props.children)
        });
        return clone;
      }

      return child;
    });
  };

  return <>{childrenWithProps(children)}</>;
};

Product.Details = Details;
Product.Images = Images;
Product.Information = Information;
Product.Wrapper = Wrapper;

export { Product };
