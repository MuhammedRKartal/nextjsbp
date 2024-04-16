import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Section } from './section';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

export const Loader = (props) => {
  const { loading, children } = props;
  return (
    <>
      {loading ? (
        <Section className="flex items-center justify-center w-full h-full">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-6xl text-white"
          />
        </Section>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
