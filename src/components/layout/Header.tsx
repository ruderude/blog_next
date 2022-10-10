import Link from 'next/link';

export const Header:React.FC = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
        <Link href="/">
          <a>LOGO</a>
        </Link>
        <div className='flex space-x-2'>
          <Link href="/blog/search/all/all">
            <a>BLOG</a>
          </Link>
          <Link href="/contact">
            <a>CONTACT</a>
          </Link>
        </div>
      </div>
    </header>
  );
};
