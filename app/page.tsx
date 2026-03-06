'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { ClubCard } from '@/components/ClubCard';
import { Club } from '@/lib/types';
import { Search } from 'lucide-react';
import clubs from '@/public/data/clubs.json';

const categories = ['Tất cả', 'Sports', 'Volunteer', 'Arts & Music', 'Martial Arts', 'Technology', 'Language'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = useMemo(() => {
    return (clubs as Club[]).filter((club) => {
      const matchesCategory = selectedCategory === 'Tất cả' || club.category === selectedCategory;
      const matchesSearch = 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border px-3 sm:px-4 py-4 sm:py-6 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Khám phá câu lạc bộ
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Tìm câu lạc bộ phù hợp với đam mê của bạn
        </p>
      </section>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Search and Filters */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Tìm câu lạc bộ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tìm thấy <span className="font-semibold text-foreground">{filteredClubs.length}</span> câu lạc bộ
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-2">Không tìm thấy câu lạc bộ nào</p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
