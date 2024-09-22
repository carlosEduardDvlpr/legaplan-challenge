import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.scss';
import { ContextProvider } from '@/_context/app-context';

 const font_inter_tight = Inter_Tight({
  weight: ['400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font_inter_tight',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Legaplan Challenge',
  description: 'Legaplan Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font_inter_tight.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
