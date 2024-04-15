import { forwardRef, useState } from 'react';
import { SelectProps } from './types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Select = (props: SelectProps) => {
  const {
    className,
    options,
    label,
    labelStyle,
    labelClassName,
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
      className={clsx(
        'w-24 bg-black lg:relative',
        loading === true ? 'flex justify-center items-center' : ''
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
          className={clsx(
            'border border-secondary-darkest text-xs py-2 px-3 cursor-pointer'
          )}
          onClick={handleListDisplay}
        >
          {selectedOption}
        </div>
      )}
      <ul
        className={clsx(
          'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(80vw)] py-1 border bg-black border-secondary-darkest  overflow-auto transition-all duration-300 max-h-56 max-w-xs thin-scrollbar z-50',
          'lg:absolute lg:top-full lg:left-0 lg:translate-y-0 lg:translate-x-0 lg:w-full lg:border-t-0',
          showOptionList
            ? 'visible opacity-100 lg:min-h-44'
            : 'invisible opacity-0 lg:h-0'
        )}
      >
        {options.map((option) => {
          return (
            <li
              className={clsx(
                'text-xs py-2 px-4 cursor-pointer',
                'hover:bg-secondary-darkest'
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
