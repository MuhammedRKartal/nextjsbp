export const Description = (props) => {
  const { product } = props;
  return (
    <>
      <div className="">
        <span className="text-white text-sm font-bold">{product.name}</span>
        &nbsp;
        <span className="text-gray-400 text-sm">{product.description}</span>
      </div>
    </>
  );
};
