import { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { CheckboxProps } from "./types";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    children,
    error,
    inputClassName,
    appearance,
    tick,
    inputWidth = 14,
    inputHeight = 14,
    ...rest
  } = props;

  const style = {
    width: `${inputWidth}px`,
    height: `${inputHeight}px`,
  };

  return (
    <label className={twMerge("flex flex-col text-sm", props.className)}>
      <div className="flex items-center relative">
        <input
          style={style}
          type="checkbox"
          {...rest}
          ref={ref}
          className={twMerge(
            clsx(
              "appearance-none border border-white dark:border-black rounded-none",
              "checked:bg-primary checked:ring-primary dark:checked:bg-secondary dark:checked:ring-secondary",
              appearance === "circle" && "appearance-none rounded-full checked:ring-1",
              appearance === "square" && "",
              tick && [
                "checked:relative",
                "checked:before:border-b checked:before:border-r checked:before:w-1 checked:before:h-[6px] checked:before:rotate-45",
                "checked:before:absolute checked:before:top-[calc(50%-1px)] checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2",
              ],
              inputClassName
            )
          )}
        />
        {children && <span className="ml-2">{children}</span>}
      </div>
      {error && <span className="mt-1 text-sm text-error">{error.message}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
