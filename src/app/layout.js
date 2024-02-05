import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import StoreProvider from '@/providers/StoreProvider';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '@/components/Modal';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eshop',
  description: 'Technology products eshop.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full ">
      <body className={inter.className}>
        <StoreProvider>
          <ReactQueryProvider>
            <ModalProvider>
              <header className="fixed w-full top-0 z-[900]">
                <Nav />
              </header>
              <main className="h-full pt-[70px]">{children}</main>
              <Toaster />
            </ModalProvider>
          </ReactQueryProvider>
        </StoreProvider>
        <div id="modal-root" className="z-[999]"></div>
      </body>
    </html>
  );
}
