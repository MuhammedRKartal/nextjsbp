export const Wrapper = (props) => {
  const { children } = props;

  return (
    <div className="flex-[1] w-full flex flex-col justify-between">
      {children}
    </div>
  );
};
