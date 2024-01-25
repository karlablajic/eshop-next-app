import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import StoreProvider from '@/providers/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eshop',
  description: 'Technology products eshop.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <StoreProvider>
          <ReactQueryProvider>
            <header className="fixed w-full top-0">
              <Nav />
            </header>
            <main className="h-full pt-[70px]">{children}</main>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
