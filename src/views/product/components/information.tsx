export const Information = (props) => {
  const { product } = props;

  return (
    <>
      {product?.name && (
        <h1 className="text-white text-4xl mb-2">{product.name}</h1>
      )}
    </>
  );
};
