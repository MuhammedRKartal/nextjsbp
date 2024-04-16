import clsx from 'clsx';

export const AccountInfoBox = (props) => {
  const { title, children } = props;

  return (
    <div className="relative flex flex-col text-center items-center border w-full [&>*]:max-w-[320px] h-72 pt-12 pb-6 px-8 text-white border-secondary-darkest">
      <p
        className={clsx(
          'relative text-2xl font-bold mb-8 pb-7',
          'after:bottom-0 after:h-px after:w-20 after:bg-secondary-darkest after:content-[""] after:left-1/2 after:-translate-x-1/2 after:absolute'
        )}
      >
        {title}
      </p>
      {children}
    </div>
  );
};
