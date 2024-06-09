"use client";

import { TabContentProps } from "../types";

export const TabContent = ({ tabId, active, children }: TabContentProps) => {
  const isActive = active === tabId;

  return <>{isActive && <>{children}</>}</>;
};
