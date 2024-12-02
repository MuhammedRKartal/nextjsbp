import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("dialog");
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.style.display = "block";
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

type PortalProps = {
  children: React.ReactNode;
  wrapperId: string;
};

const ReactPortal: React.FC<PortalProps> = ({ children, wrapperId = "react-portal-wrapper" }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(wrapperId) as HTMLElement;
    let modalCreated = false;

    if (!element) {
      modalCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (modalCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
