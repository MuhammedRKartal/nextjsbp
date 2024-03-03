import { Product } from '..';

export const ProductDefault = (props) => {
  const { product } = props;

  return (
    <Product {...props}>
      <Product.Wrapper>
        <Product.Images />
        <Product.Details />
        <Product.Information />
      </Product.Wrapper>
    </Product>
  );
};
