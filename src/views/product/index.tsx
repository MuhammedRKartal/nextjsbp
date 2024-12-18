import { Children, cloneElement, isValidElement, JSXElementConstructor, ReactNode } from "react";
import { ProductItemType } from "@/types";
import { Add } from "./components/add";
import { Details } from "./components/details";
import { Images } from "./components/images";
import { Information } from "./components/information";
import { Prices } from "./components/prices";
import { Wrapper } from "./components/wrapper";

interface Props {
  product: ProductItemType;
  children?: ReactNode | ReactNode[];
}

const Product = (props: Props) => {
  const { children } = props;

  const IncludeArray: Array<JSXElementConstructor<any>> = [
    Images,
    Details,
    Information,
    Prices,
    Add,
  ];

  const childrenWithProps = (children: ReactNode): ReactNode => {
    return Children.map(children, child => {
      if (!isValidElement(child)) {
        return child;
      }

      const hasChildren = !!child.props?.children;

      if (IncludeArray.includes(child.type as JSXElementConstructor<any>)) {
        return cloneElement(child, {
          ...props,
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

Product.Details = Details;
Product.Images = Images;
Product.Information = Information;
Product.Wrapper = Wrapper;
Product.Prices = Prices;
Product.Add = Add;

export { Product };
