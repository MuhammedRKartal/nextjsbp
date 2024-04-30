import { Product } from '..';

export const ProductDefault = (props) => {
  return (
    <Product {...props}>
      <div className="block gap-8 lg:flex 2xl:gap-16 relative">
        <Product.Images />
        <Product.Wrapper>
          <div>
            <Product.Information />
            <Product.Prices />
          </div>
          <div>
            <Product.Add />
            <Product.Details />
          </div>
        </Product.Wrapper>
      </div>
    </Product>
  );
};
