import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex items-center space-between w-full bg-gray-800 border-b border-gray-400 text-slate-50 py-4 px-6 h-20'>
      <div className='text-3xl font-bold'>
        <Link href='/' className=''>
          Recipe Box
        </Link>
      </div>
    </nav>
  );
}
