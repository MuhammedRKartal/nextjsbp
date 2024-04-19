import { ProductItemType } from '@/types';

import { Children, cloneElement, ReactNode } from 'react';
import { Images } from './components/images';
import { Prices } from './components/prices';
import { Description } from './components/description';
import { InStock } from './components/instock';
import { Add } from './components/add';
import { Wrapper } from './components/wrapper';
import { BottomSheet } from './components/bottom-sheet';
import { Attributes } from './components/attributes';

interface Props {
  product: ProductItemType;
  index: number;
  children?: ReactNode | ReactNode[];
}

const ProductItem = (props: Props) => {
  const { product, index, children } = props;

  const pk = product.pk;

  const childrenWithProps = (children) => {
    return Children.map(children, (child) => {
      if (!child) {
        return null;
      }

      const hasChildren = !!child.props?.children;

      if (
        [
          Images,
          Prices,
          Description,
          Attributes,
          InStock,
          Add,
          Wrapper,
          BottomSheet
        ].includes(child.type)
      ) {
        const clone = cloneElement(child, {
          ...{
            ...props,
            pk,
            index
          },
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

ProductItem.Description = Description;
ProductItem.Attributes = Attributes;
ProductItem.Images = Images;
ProductItem.Prices = Prices;
ProductItem.Add = Add;
ProductItem.Wrapper = Wrapper;
ProductItem.BottomSheet = BottomSheet;
ProductItem.InStock = InStock;

export { ProductItem };
