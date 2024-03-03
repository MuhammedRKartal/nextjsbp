export const Information = (props) => {
  const { product } = props;

  return (
    <div className="flex-[1] w-full">
      <div className="text-white text-4xl">{product.name}</div>
    </div>
  );
};
