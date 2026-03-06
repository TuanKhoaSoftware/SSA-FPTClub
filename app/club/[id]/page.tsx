'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Club } from '@/lib/types';
import clubs from '@/public/data/clubs.json';
import { ArrowLeft, MapPin, Users, Clock, Share2, Facebook, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubId = params.id as string;

  const club = (clubs as Club[]).find((c) => c.id === clubId);

  if (!club) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Câu lạc bộ không tìm thấy</h1>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navigation />

      {/* Back Button */}
      <div className="px-3 sm:px-4 pt-3 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Quay lại
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground px-3 sm:px-4 py-4 sm:py-6 flex-shrink-0">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-grow min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 break-words">{club.name}</h1>
            <div className="inline-block bg-white/20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm">
              {club.category}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Facebook"
            >
              <Facebook size={18} className="sm:w-6 sm:h-6" />
            </a>
            <button 
              className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Chia sẻ"
            >
              <Share2 size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Users className="text-primary flex-shrink-0" size={16} />
              <p className="text-muted-foreground text-xs">Thành viên</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-foreground">{club.members}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Clock className="text-primary flex-shrink-0" size={16} />
              <p className="text-muted-foreground text-xs">Tần suất</p>
            </div>
            <p className="text-sm sm:text-base font-semibold text-foreground truncate">{club.frequency}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <MapPin className="text-primary flex-shrink-0" size={16} />
              <p className="text-muted-foreground text-xs">Địa điểm</p>
            </div>
            <p className="text-sm sm:text-base font-semibold text-foreground truncate">{club.location}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Giới thiệu</h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed text-pretty">
            {club.fullDescription}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Lợi ích</h2>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {club.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 bg-secondary rounded-lg p-3 sm:p-4 border border-border"
              >
                <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={18} />
                <p className="text-foreground font-medium text-sm sm:text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 border border-primary rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Quan tâm?</h3>
          <p className="text-xs sm:text-sm text-foreground mb-3 sm:mb-4">
            Theo dõi Facebook để cập nhật thông tin và sự kiện
          </p>
          <a
            href={club.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto"
          >
            <Facebook size={16} />
            Truy cập Facebook
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Muốn tìm câu lạc bộ khác?
          </p>
          <Link 
            href="/chat"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto"
          >
            Chat AI để được tư vấn
          </Link>
        </div>
      </div>
    </div>
  );
}
