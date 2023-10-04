import LeftNav from './components/LeftNav';
import Navbar from './components/Navbar';
import SectionHeader from './components/SectionHeader';
import './globals.css';
import type { Metadata } from 'next';

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
      <body className='min-h-screen min-w-screen bg-gray-900 text-gray-100 overflow-hidden border border-gray-400'>
        <Navbar />
        <SectionHeader />
        <div className='main-section-wrapper flex justify-between items-start h-[calc(100vh_-_80px_-_128px)]'>
          <LeftNav />
          {children}
        </div>
      </body>
    </html>
  );
}
