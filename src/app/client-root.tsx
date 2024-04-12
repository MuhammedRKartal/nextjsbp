'use client';
import { useAppDispatch } from '@/redux/hooks';
import { resetHeaderState } from '@/redux/reducers/header';
import { closeMiniBasket } from '@/redux/reducers/mini-basket';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientRoot({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(closeMiniBasket());
    dispatch(resetHeaderState());
  }, [dispatch, pathname, searchParams]);

  return <>{children}</>;
}
