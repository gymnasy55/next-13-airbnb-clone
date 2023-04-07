import { Nunito } from 'next/font/google';

import './globals.css';
import { Navbar } from '@/app/components/navbar/Navbar';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
