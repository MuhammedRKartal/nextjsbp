"use client";

import { Button } from "@/components/button";
import { toggleMobileMenu } from "@/redux/reducers/header";
import { useAppDispatch } from "@/redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <Button className="md:hidden" appearance="ghost" onClick={() => dispatch(toggleMobileMenu())}>
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );
}
