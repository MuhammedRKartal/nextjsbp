import { ProductItemType } from "@/types";
import { Children, cloneElement, ReactNode, isValidElement, JSXElementConstructor } from "react";
import { Images } from "./components/images";
import { Prices } from "./components/prices";
import { Description } from "./components/description";
import { InStock } from "./components/instock";
import { Add } from "./components/add";
import { Wrapper } from "./components/wrapper";
import { BottomSheet } from "./components/bottom-sheet";
import { Attributes } from "./components/attributes";

interface Props {
  product: ProductItemType;
  index: number;
  children?: ReactNode | ReactNode[];
}

const ProductItem = (props: Props) => {
  const { product, index, children } = props;
  const pk = product.pk;

  const includeArray: Array<JSXElementConstructor<any>> = [
    Images,
    Prices,
    Description,
    Attributes,
    InStock,
    Add,
    Wrapper,
    BottomSheet,
  ];

  const childrenWithProps = (children: ReactNode): ReactNode => {
    return Children.map(children, child => {
      if (!isValidElement(child)) {
        return child;
      }

      const hasChildren = !!child.props?.children;

      if (includeArray.includes(child.type as JSXElementConstructor<any>)) {
        return cloneElement(child, {
          ...props,
          pk,
          index,
          ...child.props,
          ...(hasChildren && {
            children: childrenWithProps(child.props.children),
          }),
        });
      } else if (hasChildren) {
        return cloneElement(child, {
          ...child.props,
          children: childrenWithProps(child.props.children),
        });
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
