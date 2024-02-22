import { ButtonProps } from './types';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = (props: ButtonProps) => {
  return (
    <>
      {props.link ? (
        <Link href={props.link} className={props.linkclassname}>
          <button
            {...props}
            className={twMerge(
              clsx(
                [
                  'px-6',
                  'min-h-[3rem]',
                  'h-auto',
                  'text-base',
                  'rounded-md',
                  'border',
                  'transition-all'
                ],
                props.size === 'xs' && ['text-sm', 'px-4', 'min-h-[2.5rem]'],
                props.size === 'lg' && [
                  'px-12',
                  'min-h-[3.5rem]',
                  'text-lg',
                  'font-bold'
                ],
                props.appearance === 'filled' && [
                  'text-white',
                  'bg-primary-800',
                  'border-primary-800',
                  'hover:bg-primary-700',
                  'hover:border-primary-700'
                ],
                props.appearance === 'outlined' && [
                  'text-white',
                  'bg-transparent',
                  'border-primary-800',
                  'hover:border-primary-700',
                  'hover:bg-primary-700'
                ],
                props.appearance === 'ghost' && [
                  'text-white',
                  'bg-transparent',
                  'border-transparent',
                  'hover:bg-primary-700'
                ],
                props.appearance === 'bright' && [
                  'text-white',
                  'bg-transparent',
                  'border-transparent',
                  'hover:border-transparent',
                  'hover:bg-transparent',
                  'hover:brightness-[1.15]'
                ]
              ),
              props.className
            )}
          >
            {props.children}
          </button>
        </Link>
      ) : (
        <button
          {...props}
          className={twMerge(
            clsx(
              [
                'px-6',
                'min-h-[3rem]',
                'h-auto',
                'text-base',
                'rounded-md',
                'border',
                'transition-all'
              ],
              props.size === 'xs' && ['text-sm', 'px-4', 'min-h-[2.5rem]'],
              props.size === 'lg' && [
                'px-12',
                'min-h-[3.5rem]',
                'text-lg',
                'font-bold'
              ],
              props.appearance === 'filled' && [
                'text-white',
                'bg-primary-800',
                'border-primary-800',
                'hover:bg-primary-700',
                'hover:border-primary-700'
              ],
              props.appearance === 'outlined' && [
                'text-white',
                'bg-transparent',
                'border-primary-800',
                'hover:border-primary-700',
                'hover:bg-primary-700'
              ],
              props.appearance === 'ghost' && [
                'text-white',
                'bg-transparent',
                'border-transparent',
                'hover:bg-primary-700'
              ],
              props.appearance === 'bright' && [
                'text-white',
                'bg-transparent',
                'border-transparent',
                'hover:border-transparent',
                'hover:bg-transparent',
                'hover:brightness-[1.15]'
              ]
            ),
            props.className
          )}
        >
          {props.children}
        </button>
      )}
    </>
  );
};
