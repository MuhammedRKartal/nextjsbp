import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Section } from './section';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { twMerge } from 'tailwind-merge';

export const Loader = (props) => {
  const { className, hasSection, loading, showIcon = true, children } = props;
  return (
    <>
      {loading ? (
        hasSection ? (
          <Section
            className={twMerge(
              'flex items-center justify-center w-full h-full',
              className
            )}
          >
            {showIcon && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin text-6xl text-white"
              />
            )}
          </Section>
        ) : (
          <div
            className={twMerge('flex items-center justify-center', className)}
          >
            {showIcon && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin text-6xl text-white"
              />
            )}
          </div>
        )
      ) : (
        <>{children}</>
      )}
    </>
  );
};
