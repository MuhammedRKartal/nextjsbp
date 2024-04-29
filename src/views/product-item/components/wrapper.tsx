import Link from 'next/link';

export const Wrapper = (props) => {
  const { children, pk } = props;

  return (
    <div className="border border-borders rounded-lg p-4 shadow-md shadow-secondary-800 cursor-pointer">
      <Link href={`/product/${pk}`}>{children}</Link>
    </div>
  );
};
