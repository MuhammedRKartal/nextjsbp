"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/button";
import { useAppDispatch } from "@/redux/hooks";
import { toggleMobileMenu } from "@/redux/reducers/header";

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <Button className="md:hidden" appearance="ghost" onClick={() => dispatch(toggleMobileMenu())}>
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );
}
