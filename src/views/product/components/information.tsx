export const Information = props => {
  const { product } = props;

  return <>{product?.name && <h1 className=" text-4xl mb-2 mt-3 lg:mt-0">{product.name}</h1>}</>;
};
