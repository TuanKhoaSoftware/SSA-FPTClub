'use client';

import Link from 'next/link';
import { Club } from '@/lib/types';
import { Facebook, ArrowRight, Users, Clock } from 'lucide-react';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/club/${club.id}`}>
      <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer active:scale-95 sm:active:scale-100">
        {/* Header với màu nền cam */}
        <div className="bg-primary p-4 sm:p-6 text-primary-foreground">
          <h3 className="text-lg sm:text-xl font-bold leading-tight break-words">
            {club.name}
          </h3>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 flex flex-col h-full">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium">
            {club.category}
          </p>
          
          <p className="text-sm sm:text-base text-foreground mb-4 line-clamp-2 flex-grow">
            {club.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
            <div className="bg-secondary rounded-md p-2 sm:p-3">
              <div className="flex items-center gap-1 mb-1">
                <Users size={14} className="text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">Thành viên</p>
              </div>
              <p className="font-semibold text-foreground text-sm sm:text-base">{club.members}</p>
            </div>
            <div className="bg-secondary rounded-md p-2 sm:p-3">
              <div className="flex items-center gap-1 mb-1">
                <Clock size={14} className="text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">Tần suất</p>
              </div>
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                {club.frequency}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border gap-2">
            <div className="text-primary font-semibold text-xs sm:text-sm hover:opacity-80 transition-opacity flex items-center gap-1 flex-1">
              Chi tiết <ArrowRight size={16} className="shrink-0" />
            </div>
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-colors p-2 hover:bg-secondary rounded-md shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open(club.facebookUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
