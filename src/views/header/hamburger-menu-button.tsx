'use client';

import { Button } from '@/src/components/button';
import { toggleMobileMenu } from '@/src/redux/reducers/header';
import { useAppDispatch } from '@/src/redux/hooks';

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <Button appearance="ghost" onClick={() => dispatch(toggleMobileMenu())}>
        X
      </Button>
    </div>
  );
}
