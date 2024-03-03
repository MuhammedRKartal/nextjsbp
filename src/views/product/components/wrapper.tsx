import Link from 'next/link';

export const Wrapper = (props) => {
  const { children, pk } = props;

  return <div className="flex">{children}</div>;
};
