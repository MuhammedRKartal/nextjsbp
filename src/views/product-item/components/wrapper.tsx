import clsx from 'clsx';

export const Wrapper = (props) => {
  const { children } = props;

  return (
    <div
      className={clsx(
        'relative pt-9 md:pt-[2.438rem] overflow-hidden',
        'border-gray-100 rounded-[0.625rem] shadow-[0_2px_6px_0_rgba(37,51,66,0.09)]'
      )}
    >
      {children}
    </div>
  );
};
