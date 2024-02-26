'use client';

import { Button } from '@/src/components/button';
import { toggleMobileMenu } from '@/src/redux/reducers/header';
import { useAppDispatch } from '@/src/redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      className="md:hidden"
      appearance="ghost"
      onClick={() => dispatch(toggleMobileMenu())}
    >
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );
}
