import { Nunito } from 'next/font/google';

import './globals.css';
import { Navbar } from '@/app/components/navbar/Navbar';
import { ClientOnly } from '@/app/components/ClientOnly';
import { RegisterModal } from '@/app/components/modals/RegisterModal';
import { ToasterProvider } from '@/app/providers/ToasterProvider';

export const metadata = {
  title: 'Airbnb',
  description: 'Next 13 Airbnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
