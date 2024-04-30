export const Description = (props) => {
  const { product } = props;
  return (
    <>
      <div className="flex flex-col mb-4">
        <span className=" text-sm font-bold">{product?.name}</span>
        <span className="text-white-400 dark:text-black-600 text-sm">
          {product?.short_description}
        </span>
      </div>
    </>
  );
};
