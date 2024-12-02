import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "./types";

const getClassNames = (props: ButtonProps) => {
  return twMerge(
    clsx(
      "px-6 min-h-[3rem] h-auto text-base rounded-sm border transition-all flex items-center justify-center",
      props.size === "xs" && "text-sm px-4 min-h-[2.5rem]",
      props.size === "lg" && "px-12 min-h-[3.5rem] text-lg font-bold",
      (props.appearance === "filled" || !props.appearance) &&
        "text-white bg-primary dark:bg-secondary border-secondaryoutline dark:border-outline hover:bg-primary-600 dark:hover:bg-secondary hover:border-outline dark:hover:border-secondaryoutline",
      props.appearance === "outlined" &&
        "bg-black dark:bg-white border-secondaryoutline dark:border-outline hover:border-outline dark:hover:border-secondaryoutline hover:bg-primary-600 dark:hover:bg-secondary",
      props.appearance === "ghost" &&
        "bg-transparent border-transparent hover:bg-primary-600 dark:hover:bg-secondary",
      props.appearance === "bright" &&
        "text-white bg-transparent border-transparent hover:border-transparent hover:bg-transparent hover:brightness-[1.15]",
      props.className
    )
  );
};

export const Button = (props: ButtonProps) => {
  const { isloading, link, linkclassname, target, ...rest } = props;

  return link ? (
    <Link href={link} className={linkclassname} {...(target ? { target } : {})}>
      <button {...rest} className={getClassNames(props)}>
        {isloading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : props.children}
      </button>
    </Link>
  ) : (
    <button {...rest} className={getClassNames(props)}>
      {isloading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : props.children}
    </button>
  );
};
