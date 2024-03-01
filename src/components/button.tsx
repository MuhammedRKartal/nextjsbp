import { ButtonProps } from './types';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = (props: ButtonProps) => {
  return (
    <>
      {props.link && props.link !== null ? (
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
                (props.appearance === 'filled' || !props.appearance) && [
                  'text-white',
                  'bg-primary-darker',
                  'border-primary-darker',
                  'hover:bg-primary-dark',
                  'hover:border-primary-dark'
                ],
                props.appearance === 'outlined' && [
                  'text-white',
                  'bg-transparent',
                  'border-primary-darker',
                  'hover:border-primary-dark',
                  'hover:bg-primary-dark'
                ],
                props.appearance === 'ghost' && [
                  'text-white',
                  'bg-transparent',
                  'border-transparent',
                  'hover:bg-primary-dark'
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
              (props.appearance === 'filled' || !props.appearance) && [
                'text-white',
                'bg-primary-darker',
                'border-primary-darker',
                'hover:bg-primary-dark',
                'hover:border-primary-dark'
              ],
              props.appearance === 'outlined' && [
                'text-white',
                'bg-transparent',
                'border-primary-darker',
                'hover:border-primary-dark',
                'hover:bg-primary-dark'
              ],
              props.appearance === 'ghost' && [
                'text-white',
                'bg-transparent',
                'border-transparent',
                'hover:bg-primary-dark'
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
