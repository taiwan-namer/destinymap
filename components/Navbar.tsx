import Link from 'next/link';
import { Compass, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold hover:text-purple-300 transition-colors"
        >
          <Compass className="w-5 h-5 text-purple-400" />
          DestinyMap
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            命理專欄
          </Link>
        </nav>
      </div>
    </header>
  );
}
