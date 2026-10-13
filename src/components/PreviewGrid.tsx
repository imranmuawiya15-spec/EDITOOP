import React, { useState } from 'react';
import { Play, MessageSquare, Clock, Upload, Trash2, Eye } from 'lucide-react';
import { PreviewItem } from '../types';

interface PreviewGridProps {
  previews: PreviewItem[];
  isAdmin: boolean;
  onSelectPreview: (item: PreviewItem) => void;
  onOpenUploadModal: () => void;
  onDeletePreview: (id: string) => void;
}

export const PreviewGrid: React.FC<PreviewGridProps> = ({
  previews,
  isAdmin,
  onSelectPreview,
  onOpenUploadModal,
  onDeletePreview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Shorts & Reels',
    'Commercial & Ads',
    'YouTube & Long-form',
    'Color Grade',
  ];

  const filtered = selectedCategory === 'All'
    ? previews
    : previews.filter(p => p.category === selectedCategory);

  return (
    <section id="previews" className="py-16 sm:py-24 border-b border-[#1b1e2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9d78ff] mb-2">
              Portfolio & Work Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Desktop Editing Previews
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Watch timeline cuts, inspect color grading before/after, and leave frame-referenced comments. All projects mastered in Adobe Premiere Pro.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={onOpenUploadModal}
                className="py-2.5 px-4 bg-[#7045f2] hover:bg-[#6037df] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#7045f2]/20 whitespace-nowrap"
              >
                <Upload className="w-4 h-4" />
                <span>Upload From Desktop</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls (Segmented Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-3.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7045f2] text-white shadow-sm'
                  : 'bg-[#151722] text-slate-300 hover:bg-[#1f2231] hover:text-white border border-[#232737]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Previews Bento / Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#13151f] border border-[#222536] hover:border-[#7045f2]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col"
            >
              {/* Media Thumbnail Container */}
              <div
                onClick={() => onSelectPreview(item)}
                className="relative aspect-video bg-[#0d0e14] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 bg-[#0d0e15]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-200 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#9d78ff]" />
                  <span>{item.duration}</span>
                </div>

                {/* Category kicker */}
                <div className="absolute top-3 right-3 text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                  {item.category}
                </div>

                {/* Center Play Button on hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#7045f2]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Price watermark */}
                <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-white text-xs font-bold px-2 py-1 rounded font-mono shadow">
                  From ${item.startingPrice}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectPreview(item)}
                    className="text-base font-bold text-white group-hover:text-[#9d78ff] transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Premiere Technique tags (clean unboxed text with separators) */}
                  <div className="mt-3 text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5">
                    {item.premiereFeatures.slice(0, 3).map((feat, idx) => (
                      <React.Fragment key={feat}>
                        <span className="text-slate-300">{feat}</span>
                        {idx < Math.min(item.premiereFeatures.length, 3) - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="pt-4 mt-4 border-t border-[#1f2231] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <MessageSquare className="w-3.5 h-3.5 text-[#9d78ff]" />
                      {item.comments.length}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      {item.viewsCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && item.isCustomUpload && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete preview "${item.title}"?`)) {
                            onDeletePreview(item.id);
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete custom preview"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectPreview(item)}
                      className="text-xs font-semibold text-[#9d78ff] hover:text-[#b498ff] transition-colors cursor-pointer"
                    >
                      Watch & Comment →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-[#12141d] rounded-2xl border border-[#212433]">
            <p className="text-sm text-slate-400">No previews found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
