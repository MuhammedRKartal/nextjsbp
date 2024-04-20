import { Metadata } from 'next';
import ChangeNotificationsPage from './page';
import Breadcrumb from '@/components/breadcrumb';
import { ROUTES } from '@/routes';

export const metadata: Metadata = {
  title: 'Change Password',
  description:
    'How would you like to be informed about our campaigns? Change your notification settings.'
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbList = [
    { url: ROUTES.ACCOUNT, text: 'Account' },
    { url: ROUTES.CHANGE_PASSWORD, text: 'Change Password' }
  ];

  return (
    <div className="w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />
      {children}
    </div>
  );
}
