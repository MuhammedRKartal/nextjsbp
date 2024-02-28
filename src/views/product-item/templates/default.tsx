import { ProductItem } from '..';

export const ProductItemDefault = (props) => {
  const { product } = props;

  return (
    <ProductItem {...props}>
      <ProductItem.Wrapper>
        <ProductItem.Images />

        <ProductItem.BottomSheet>
          <ProductItem.Description />

          {product.in_stock ? (
            <div className="flex justify-between">
              <ProductItem.Prices />
              <ProductItem.Add />
            </div>
          ) : (
            <ProductItem.InStock />
          )}
        </ProductItem.BottomSheet>
      </ProductItem.Wrapper>
    </ProductItem>
  );
};
