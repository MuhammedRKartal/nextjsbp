import { twMerge } from 'tailwind-merge';

export const AccountInfoBox = (props) => {
  const { title, children, className, titleClassName } = props;

  return (
    <div
      className={twMerge(
        'relative flex flex-col text-center items-center border w-full [&>*]:max-w-[320px] pt-12 pb-6 px-8  border-outline dark:border-secondaryoutline',
        className
      )}
    >
      <p
        className={twMerge(
          'relative text-2xl font-bold mb-8 pb-7',
          'after:bottom-0 after:h-px after:w-20 after:bg-primary-100 dark:after:bg-secondary-900 after:content-[""] after:left-1/2 after:-translate-x-1/2 after:absolute',
          titleClassName
        )}
      >
        {title}
      </p>
      {children}
    </div>
  );
};
