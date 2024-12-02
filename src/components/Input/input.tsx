"use client";

import { FocusEvent, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/button";
import { InputLabel } from "@/components/Input/input-label";
import { InputProps } from "@/components/types";

const getButtonClassNames = (error: boolean, iconClassName?: string) =>
  twMerge("text-primary-600 dark:text-secondary-400", error && "!text-error", iconClassName);

const getShowValueClassNames = (error: boolean) =>
  twMerge(
    "w-1 h-3/5 absolute top-1/2 left-1/2 bg-primary-600 dark:bg-secondary-400 rounded-xl border-l-2 border-l-black content-[''] -translate-x-1/2 -translate-y-1/2 -rotate-[60deg]",
    error && "!bg-error"
  );

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showValue, setShowValue] = useState(false);

  const {
    id,
    label,
    labelStyle,
    floatingLabelText,
    error,
    type,
    required = false,
    disabled = false,
    labelClassName = "", // Ensure className is always a string
    className,
    icon,
    iconClassName,
    iconButtonClassName,
    ...rest
  } = props;

  const hasFloatingLabel = label && labelStyle === "floating";
  const hasPlaceholder = label && (labelStyle === "inner" || !labelStyle);
  const isPassword = type && type === "password";

  const inputClass = twMerge(
    "bg-transparent text-base w-full border px-3 h-10 rounded my-[3px] transition duration-200",
    "placeholder:text-white-400 dark:text-black-600",
    "hover:border-outline-100 dark:hover:border-secondaryoutline-100 dark:border-secondaryoutline-100",
    "active:border-outline dark:border-secondaryoutline",
    "focus-visible:outline-none focus:border-outline dark:border-secondaryoutline",
    hasFloatingLabel && "pt-3 h-12",
    error &&
      "border-error focus:!border-error active:!border-error hover:!border-error !text-error",
    disabled && "pointer-events-none opacity-40",
    className
  );

  const inputProps: any = {
    id,
    ref,
    className: inputClass,
    type: isPassword ? (showValue ? "text" : "password") : type,
    onFocus: () => setFocused(true),
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(!!event.target.value);
    },
    disabled,
    required,
    ...rest,
  };

  return (
    <div className="relative flex flex-col transition-all w-full">
      {!hasPlaceholder && (
        <InputLabel
          label={label}
          labelStyle={labelStyle}
          focused={focused}
          hasValue={hasValue}
          required={required}
          disabled={disabled}
          id={id}
          className={labelClassName}
          hasError={!!error}
        />
      )}
      <div className="relative">
        <input
          {...inputProps}
          placeholder={hasPlaceholder ? `${label} ${required ? "*" : ""}` : ""}
        />
        {isPassword && !icon && (
          <Button
            type="button"
            appearance="bright"
            size="xs"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setShowValue(!showValue)}
          >
            <FontAwesomeIcon icon={faEye} className={getButtonClassNames(!!error, iconClassName)} />
            {showValue && <span className={getShowValueClassNames(!!error)} />}
          </Button>
        )}
        {isPassword && icon && (
          <Button
            type="button"
            appearance="bright"
            size="xs"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setShowValue(!showValue)}
          >
            <FontAwesomeIcon icon={icon} className={getButtonClassNames(!!error, iconClassName)} />
            {showValue && <span className={getShowValueClassNames(!!error)} />}
          </Button>
        )}
        {!isPassword && icon && (
          <Button
            type="button"
            appearance="bright"
            size="xs"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setShowValue(!showValue)}
          >
            <FontAwesomeIcon icon={icon} className={getButtonClassNames(!!error, iconClassName)} />
          </Button>
        )}
      </div>
      {error && <span className="-mt-1 text-sm text-error">{error.message}</span>}
    </div>
  );
});

Input.displayName = "Input";
