import clsx from "clsx";

export default function Navbar({
  children,
  navClassName,
}: {
  children: React.ReactNode;
  navClassName?: string;
}) {
  return (
    <>
      <nav
        className={clsx(
          "h-full flex items-center justify-between gap-2 transition-all",
          navClassName ?? navClassName
        )}
      >
        {children}
      </nav>
    </>
  );
}
