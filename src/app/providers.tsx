'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import { useAppDispatch } from '@/redux/hooks';
import { closeMiniBasket } from '@/redux/reducers/mini-basket';
import { resetHeaderState } from '@/redux/reducers/header';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
