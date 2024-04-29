import { useState } from 'react';
import { SelectProps } from './types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { twMerge } from 'tailwind-merge';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';

const Select = (props: SelectProps) => {
  const {
    className,
    labelClassName,
    itemListClassName,
    itemClassName,
    options,
    selectedOption,
    setSelectedOption,
    loading,
    ...rest
  } = props;
  const [showOptionList, setShowOptionList] = useState(false);

  const handleListDisplay = () => {
    setShowOptionList(!showOptionList);
  };
  const handleOptionClick = (e) => {
    setSelectedOption(e.target.getAttribute('data-label'));
    setShowOptionList(false);
  };

  return (
    <div
      className={twMerge(
        'w-24 bg-black lg:relative',
        loading === true ? 'flex justify-center items-center' : '',
        className
      )}
    >
      <div
        className={clsx(
          showOptionList
            ? 'opacity-100 visible lg:opacity-0'
            : 'opacity-0 invisible',
          'fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80',
          'lg:hidden'
        )}
        onClick={() => {
          setShowOptionList(false);
        }}
      />
      {loading === true ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      ) : (
        <div
          className={twMerge(
            'relative border border-borders text-xs py-2 px-3 cursor-pointer',
            labelClassName
          )}
          onClick={handleListDisplay}
        >
          {selectedOption}
          <FontAwesomeIcon
            icon={faCaretDown}
            className={clsx(
              'absolute right-3 top-1/2 -translate-y-1/2 text-[10px]',
              showOptionList ? 'rotate-180' : ''
            )}
          />
        </div>
      )}
      <ul
        className={twMerge(
          'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(80vw)] py-1 border bg-black border-borders overflow-auto transition-all duration-300 max-h-56 max-w-xs thin-scrollbar z-50',
          'lg:absolute lg:top-full lg:left-0 lg:translate-y-0 lg:translate-x-0 lg:w-full lg:border-t-0',
          showOptionList
            ? 'visible opacity-100 lg:max-h-32 lg:h-32 scroll-lock'
            : 'invisible opacity-0 lg:h-0',
          itemListClassName
        )}
      >
        {options.map((option) => {
          return (
            <li
              className={twMerge(
                'text-xs py-2 px-4 cursor-pointer',
                'hover:bg-secondary-800',
                itemClassName
              )}
              data-label={option.label}
              key={option.value}
              onClick={handleOptionClick}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Select };
