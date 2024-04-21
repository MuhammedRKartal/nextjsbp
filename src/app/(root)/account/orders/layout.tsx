import Breadcrumb from '@/components/breadcrumb';
import { Section } from '@/components/section';
import { ROUTES } from '@/routes';
import { AccountMenu } from '@/views/account/account-menu';
import { AccountMenuMobile } from '@/views/account/account-menu-mobile';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders',
  description:
    'List of orders with status of waiting for order, waiting for payment, waiting for approval, completed and expired status'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbList = [
    { url: ROUTES.ACCOUNT, text: 'Account' },
    { url: ROUTES.ORDERS, text: 'Orders' }
  ];

  return (
    <div className="w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />
      {children}
    </div>
  );
}
