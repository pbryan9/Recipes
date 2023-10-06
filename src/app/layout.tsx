import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: "Steffy's Recipes",
  description: "All Steffy's recipes, all in once place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className='h-screen min-w-screen bg-gray-900 text-gray-100 border border-gray-400 overflow-y-hidden'>
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
