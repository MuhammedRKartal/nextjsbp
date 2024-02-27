import { ProductItem } from '..';

export const ProductItemDefault = (props) => {
  const { product } = props;

  return (
    <ProductItem {...props}>
      <ProductItem.Wrapper>
        <div className="flex lg:block">
          <div className="relative flex flex-col">
            <div className="flex items-end lg:block">
              <ProductItem.Images />
            </div>
          </div>
          <div className="flex flex-col max-w-full overflow-hidden text-ellipsis px-3.5 md:pt-3">
            <ProductItem.Description />
          </div>
        </div>

        <ProductItem.BottomSheet>
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
