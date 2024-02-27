import { ProductItemType } from '@/types';

import { useState, Children, cloneElement, ReactNode } from 'react';
import { Images } from './components/images';
import { Prices } from './components/prices';
import { Description } from './components/description';
import { InStock } from './components/instock';
import { Add } from './components/add';
import { Wrapper } from './components/wrapper';
import { BottomSheet } from './components/bottom-sheet';

interface Props {
  product: ProductItemType;
  width?: number;
  height?: number;
  index: number;
  fetchMode?: 'visible' | 'none';
  children?: ReactNode | ReactNode[];
}

const ProductItem = (props: Props) => {
  const { product, index, children, fetchMode = 'none' } = props;

  const [selectedProduct, setProduct] = useState(product);
  const pk = product.pk;

  const [error, setError] = useState(null);

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
          InStock,
          Add,
          Wrapper,
          BottomSheet
        ].includes(child.type)
      ) {
        const clone = cloneElement(child, {
          ...{
            ...props,
            selectedProduct,
            pk,
            error,
            index,
            setProduct
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

  return <div>{childrenWithProps(children)}</div>;
};

ProductItem.Description = Description;
ProductItem.Images = Images;
ProductItem.Prices = Prices;
ProductItem.Add = Add;
ProductItem.Wrapper = Wrapper;
ProductItem.BottomSheet = BottomSheet;
ProductItem.InStock = InStock;

export { ProductItem };
