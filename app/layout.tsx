import { Nunito } from 'next/font/google';

import './globals.css';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { ClientOnly } from '@/app/components/ClientOnly';
import { LoginModal } from '@/app/components/modals/LoginModal';
import { RegisterModal } from '@/app/components/modals/RegisterModal';
import { RentModal } from '@/app/components/modals/RentModal';
import { SearchModal } from '@/app/components/modals/SearchModal';
import { Navbar } from '@/app/components/navbar/Navbar';
import { ToasterProvider } from '@/app/providers/ToasterProvider';

export const metadata = {
  title: 'Airbnb',
  description: 'Next 13 Airbnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
