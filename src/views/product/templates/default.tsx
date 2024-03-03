import { Product } from '..';

export const ProductDefault = (props) => {
  const { product } = props;

  return (
    <Product {...props}>
      <Product.Wrapper>
        <div className="block lg:flex lg:gap-8">
          <Product.Images />
          <Product.Information />
        </div>
        <Product.Details />
      </Product.Wrapper>
    </Product>
  );
};
