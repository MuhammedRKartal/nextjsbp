import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from './types';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

export const Button = (props: ButtonProps) => {
  const { isloading, ...rest } = props;

  return (
    <>
      {props.link && props.link !== null ? (
        <Link
          href={props.link}
          className={props.linkclassname}
          target={props.target}
        >
          <button
            {...rest}
            className={twMerge(
              clsx(
                [
                  'text-white',
                  'px-6',
                  'min-h-[3rem]',
                  'h-auto',
                  'text-base',
                  'rounded-sm',
                  'border',
                  'transition-all',
                  'flex',
                  'items-center',
                  'justify-center'
                ],
                props.size === 'xs' && ['text-sm', 'px-4', 'min-h-[2.5rem]'],
                props.size === 'lg' && [
                  'px-12',
                  'min-h-[3.5rem]',
                  'text-lg',
                  'font-bold'
                ],
                (props.appearance === 'filled' || !props.appearance) && [
                  '',
                  'bg-primary-600 dark:bg-secondary-400',
                  'border-outline-100',
                  'hover:bg-primary-600 dark:hover:bg-secondary-400',
                  'hover:border-outline-100 dark:hover:border-secondaryoutline-100'
                ],
                props.appearance === 'outlined' && [
                  '',
                  'bg-transparent',
                  'border-outline-100',
                  'hover:border-outline-100 dark:hover:border-secondaryoutline-100',
                  'hover:bg-primary-600 dark:hover:bg-secondary-400'
                ],
                props.appearance === 'ghost' && [
                  '',
                  'bg-transparent',
                  'border-transparent',
                  'hover:bg-primary-600 dark:hover:bg-secondary-400'
                ],
                props.appearance === 'bright' && [
                  '',
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
            {isloading === true ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <>{props.children}</>
            )}
          </button>
        </Link>
      ) : (
        <button
          {...rest}
          className={twMerge(
            clsx(
              [
                'text-white',
                'px-6',
                'min-h-[3rem]',
                'h-auto',
                'text-base',
                'rounded-sm',
                'border',
                'transition-all',
                'flex',
                'items-center',
                'justify-center'
              ],
              props.size === 'xs' && ['text-sm', 'px-4', 'min-h-[2.5rem]'],
              props.size === 'lg' && [
                'px-12',
                'min-h-[3.5rem]',
                'text-lg',
                'font-bold'
              ],
              (props.appearance === 'filled' || !props.appearance) && [
                '',
                'bg-primary-600 dark:bg-secondary-400',
                'border-outline-100',
                'hover:bg-primary-600 dark:hover:bg-secondary-400',
                'hover:border-outline-100 dark:hover:border-secondaryoutline-100'
              ],
              props.appearance === 'outlined' && [
                '',
                'bg-transparent',
                'border-outline-100',
                'hover:border-outline-100 dark:hover:border-secondaryoutline-100',
                'hover:bg-primary-600 dark:hover:bg-secondary-400'
              ],
              props.appearance === 'ghost' && [
                '',
                'bg-transparent',
                'border-transparent',
                'hover:bg-primary-600 dark:hover:bg-secondary-400'
              ],
              props.appearance === 'bright' && [
                '',
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
          {isloading === true ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <>{props.children}</>
          )}
        </button>
      )}
    </>
  );
};
