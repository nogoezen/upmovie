import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Footer } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'UpMovie - Your Movie Database',
  description: 'Discover and explore movies with UpMovie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
} 