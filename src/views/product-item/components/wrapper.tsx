import Link from 'next/link';

export const Wrapper = (props) => {
  const { children, pk } = props;

  return (
    <div className="border-4 border-black rounded-lg p-1 shadow-lg cursor-pointer sm:p-2">
      <Link href={`/product/${pk}`}>{children}</Link>
    </div>
  );
};
