import Navbar from './components/Navbar';
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
      <body className='min-h-screen min-w-screen bg-slate-300 dark:bg-slate'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
