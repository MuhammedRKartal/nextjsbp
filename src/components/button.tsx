'use client';

import { ButtonProps } from './types';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Button = (props: ButtonProps) => {
  return (
    <>
      {props.link ? (
        <Link href={props.link}>
          <button
            {...props}
            className={twMerge(
              clsx(
                [
                  'px-4',
                  'h-12',
                  'text-base',
                  'rounded-md',
                  'border',
                  'transition-all'
                ],
                props.appearance === 'filled' && [
                  'bg-slate-300',
                  'text-gray-800',
                  'border-black',
                  'hover:bg-slate-700',
                  'hover:border-slate-400',
                  'hover:text-gray-900'
                ],
                props.appearance === 'outlined' && [
                  'bg-transparent ',
                  'border-black',
                  'hover:border-slate-400',
                  'hover:bg-slate-300'
                ],
                props.appearance === 'ghost' && [
                  'bg-transparent',
                  'border-transparent',
                  'hover:bg-slate-300'
                ],
                props.appearance === 'bright' && [
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
                'px-4',
                'h-12',
                'text-base',
                'font-serif',
                'rounded-md',
                'border',
                'transition-all'
              ],
              props.appearance === 'filled' && [
                'bg-slate-300',
                'text-gray-800',
                'border-black',
                'hover:bg-slate-700',
                'hover:border-slate-400',
                'hover:text-gray-900'
              ],
              props.appearance === 'outlined' && [
                'bg-transparent ',
                'border-black',
                'hover:border-slate-400',
                'hover:bg-slate-300'
              ],
              props.appearance === 'ghost' && [
                'bg-transparent',
                'border-transparent',
                'hover:bg-slate-300'
              ],
              props.appearance === 'bright' && [
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
