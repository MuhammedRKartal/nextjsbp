"use client";

import { twMerge } from "tailwind-merge";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SuccessBubbleType = {
  success: boolean;
  className?: string;
};

export default function SuccessBubble(props: SuccessBubbleType) {
  const { success, className } = props;
  return (
    <div
      className={twMerge(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full flex items-center justify-center opacity-0",
        "shadow-primary shadow-lg bg-black duration-200 transform",
        success === true ? "opacity-100 z-10" : "",
        className
      )}
    >
      <FontAwesomeIcon icon={faCheckSquare} className="text-4xl text-secondary-400" />
    </div>
  );
}
