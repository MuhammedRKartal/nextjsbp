'use client';

import clsx from 'clsx';
import { forwardRef, FocusEvent, useState } from 'react';
import { InputProps } from './types';
import { twMerge } from 'tailwind-merge';
import { InputLabel } from './input-label';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const {
    id,
    label,
    labelStyle,
    error,
    required = false,
    disabled = false,
    ...rest
  } = props;

  const hasFloatingLabel = label && labelStyle === 'floating';
  const hasPlaceholder = label && (labelStyle === 'inner' || !labelStyle);

  const inputClass = twMerge(
    clsx(
      'bg-transparent text-base min-w-[336px] max-w-[336px] text-white border px-3 h-10 rounded my-[3px] transition duration-200',
      'sm:min-w-[416px] sm:max-w-[416px]',
      'placeholder:text-gray-400',
      'hover:border-primary-100',
      'active:border-primary-100',
      'focus-visible:outline-none focus:border-primary-100', // disable outline on focus
      { 'pt-3 h-12': hasFloatingLabel },
      error
        ? 'border-error focus:border-error active:border-error hover:border-error text-error'
        : 'border-gray-300',
      disabled ? 'pointer-events-none opacity-40' : ''
    ),
    props.className
  );

  const inputProps: any = {
    id,
    ref,
    className: inputClass,
    onFocus: () => setFocused(true),
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(!!event.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col transition-all ">
        {!hasPlaceholder && (
          <InputLabel
            label={label}
            labelStyle={labelStyle}
            focused={focused}
            hasValue={hasValue}
            required={required}
            disabled={disabled}
            id={id}
          />
        )}
        <input
          {...rest}
          {...inputProps}
          placeholder={hasPlaceholder ? `${label} ${required ? '*' : ''}` : ''}
        />
      </div>
      {error && (
        <span className="mt-1 text-sm text-error">{error.message}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
