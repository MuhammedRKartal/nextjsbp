export const BottomSheet = (props) => {
  return (
    <div className="mt-4 flex flex-col justify-between md:p-1">
      {props.children}
    </div>
  );
};
