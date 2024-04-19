export const Description = (props) => {
  const { product } = props;
  return (
    <>
      <div className="flex flex-col mb-4">
        <span className="text-white text-sm font-bold">{product?.name}</span>
        <span className="text-gray-400 text-sm">
          {product?.short_description}
        </span>
      </div>
    </>
  );
};
