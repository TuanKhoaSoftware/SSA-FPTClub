'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, MessageCircle } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="w-full px-3 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 sm:gap-2 font-bold text-lg sm:text-xl text-primary hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="bg-primary text-primary-foreground rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
              <Users size={18} className="sm:w-5 sm:h-5" />
            </div>
            <span className="hidden sm:inline">FPT Clubs</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              href="/"
              className={`px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Users size={18} />
              <span className="hidden sm:inline">Câu lạc bộ</span>
            </Link>
            <Link
              href="/chat"
              className={`px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                isActive('/chat') 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">Chat AI</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
