import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'R-Placer',
  description: 'Pixel Art Placer/Coordinator for the Reddit Place Event.',
  keywords: [
    'reddit place',
    'pixel art',
    'pixel',
    'reddit event',
    'overlay',
    'reddit place tool',
    'r-place',
    'r-placer',,
  ],
  openGraph: {
    type: 'website',
    url: 'https://r-placer.sh2a.org',
    title: 'R-Placer',
    description: 'Pixel Art Placer/Coordinator for the Reddit Place Event.',
    siteName: 'R-Placer',
    images: [
      {
        url: 'https://r-placer.sh2a.org/icons/icon-96x96.png',
        alt: 'R-Placer',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
