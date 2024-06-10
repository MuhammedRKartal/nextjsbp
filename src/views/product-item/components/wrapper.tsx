import Link from "next/link";

export const Wrapper = props => {
  const { children, pk } = props;

  return (
    <div className="border border-outline dark:border-secondaryoutline rounded-lg p-4 shadow-md shadow-primary-100 dark:shadow-secondary-900 cursor-pointer">
      <Link href={`/product/${pk}`}>{children}</Link>
    </div>
  );
};
