import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import { Section } from "./section";

export const Loader = props => {
  const { className, hasSection, loading, showIcon = true, children } = props;
  return (
    <>
      {loading ? (
        hasSection ? (
          <Section className={twMerge("flex items-center justify-center w-full h-full", className)}>
            {showIcon && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-6xl " />}
          </Section>
        ) : (
          <div className={twMerge("flex items-center justify-center", className)}>
            {showIcon && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-6xl " />}
          </div>
        )
      ) : (
        <>{children}</>
      )}
    </>
  );
};
