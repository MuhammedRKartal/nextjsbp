import clsx from 'clsx';
import React from 'react';
import { InputLabelProps } from '@/components/types';

export const InputLabel: React.FC<InputLabelProps> = ({
  label,
  labelStyle,
  focused,
  hasValue,
  required,
  disabled,
  id
}) => {
  const floating = labelStyle === 'floating';
  const outer = labelStyle === 'outer';

  return (
    <label
      htmlFor={id}
      className={clsx(
        'text-base leading-[1] text-gray-400 transition-all duration-900',
        disabled && 'opacity-40 pointer-events-none',
        {
          'absolute left-3 pointer-events-none transform': floating
        },
        {
          '-translate-y-[-20px]': floating && !(focused || hasValue)
        },
        { 'mb-1': outer },
        {
          '-translate-y-[-12px] !text-[9px]': floating && (focused || hasValue)
        },
        { 'top-1/3': outer && !(focused || hasValue) }
      )}
    >
      {label} {required && <span className="text-secondary">*</span>}
    </label>
  );
};
