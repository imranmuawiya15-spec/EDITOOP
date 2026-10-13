import React, { useState } from 'react';
import { Check, Mail, Copy, Sparkles, Clock, ArrowRight, DollarSign, Film } from 'lucide-react';

interface HireSectionProps {
  onOpenHireModalWithBudget: (budget: number, packageTitle: string) => void;
}

export const HireSection: React.FC<HireSectionProps> = ({ onOpenHireModalWithBudget }) => {
  const [sliderBudget, setSliderBudget] = useState<number>(75);
  const [copied, setCopied] = useState(false);
  const email = 'imranmuawiya15@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScopeFromBudget = (val: number) => {
    if (val <= 25) {
      return {
        tier: 'Micro Cut & Viral Reel',
        turnaround: '12 – 24 Hours',
        features: [
          'High-retention TikTok / Reel / YouTube Short',
          'Kinetic dynamic captions & subtitles',
          'Audio sound effects & beat ducking',
          'Exported in vertical 9:16 1080x1920',
        ],
      };
    } else if (val <= 150) {
      return {
        tier: 'YouTube & Long-Form Video',
        turnaround: '24 – 48 Hours',
        features: [
          'Full YouTube episode / vlog pacing (up to 15 min)',
          'Pattern interrupts, zooms & engaging B-roll',
          'Essential Sound Panel audio mastering',
          'Custom Premiere Pro motion graphic titles',
          '2 Revision rounds included',
        ],
      };
    } else if (val <= 500) {
      return {
        tier: 'Commercial & Cinematic Ad',
        turnaround: '2 – 3 Days',
        features: [
          'High-production commercial, promo or music video',
          'Precision Lumetri 3D LUT color grading',
          'Multitrack sound design & foley mixing',
          'Multi-camera synchronized cut',
          '4K UHD Master delivery + Social cutdowns',
        ],
      };
    } else {
      return {
        tier: 'Full Campaign & Master Production',
        turnaround: '3 – 5 Days (Priority)',
        features: [
          'Comprehensive multi-video series or brand package',
          'Complete Adobe Premiere Pro project file (.prproj) handoff',
          'Uncompressed 4K ProRes & H.265 delivery',
          'Full sound stems and audio mastering',
          'Unlimited VIP revisions until 100% satisfied',
        ],
      };
    }
  };

  const currentScope = getScopeFromBudget(sliderBudget);

  const packages = [
    {
      title: 'Micro Cut / Short',
      price: '$3 – $25',
      idealFor: 'Reels, TikToks, Shorts',
      turnaround: '12–24h',
      features: [
        'Under 60-second vertical cut',
        'Frame-accurate beat sync',
        'Viral retention captions',
        'Audio ducking & sound FX',
      ],
      defaultBudget: 15,
      highlight: false,
    },
    {
      title: 'YouTube Creator',
      price: '$25 – $150',
      idealFor: 'Vlogs, Podcasts, Explainer',
      turnaround: '24–48h',
      features: [
        '5 to 15 min video pacing',
        'Dynamic B-roll & zoom cuts',
        'Premiere lower-thirds & titles',
        'Complete voice equalization',
        '2 rounds of revisions',
      ],
      defaultBudget: 75,
      highlight: true,
    },
    {
      title: 'Cinematic Commercial',
      price: '$150 – $500',
      idealFor: 'Brand Ads, Music Videos',
      turnaround: '2–3 Days',
      features: [
        'Commercial grade storytelling',
        'Lumetri cinematic color grade',
        'Full sound design & foley sync',
        '4K master + social crops',
        'Dedicated revisions',
      ],
      defaultBudget: 300,
      highlight: false,
    },
    {
      title: 'Master Retainer',
      price: '$500 – $1,000',
      idealFor: 'Agencies, Series, Retainers',
      turnaround: 'Priority 3–5 Days',
      features: [
        'Full brand campaign or multi-episode',
        'Raw Premiere .prproj file included',
        'VIP priority turnaround',
        'Full sound stems & ProRes exports',
        'Unlimited revisions',
      ],
      defaultBudget: 750,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 border-b border-[#1b1e2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9d78ff] mb-2">
            Pricing & Packages
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Simple Rates: $3 to $1,000
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Whether you need a single $3 viral hook test or a full $1,000 commercial campaign, every project is edited personally by Muawiya in Adobe Premiere Pro.
          </p>
        </div>

        {/* Interactive Budget Estimator Slider */}
        <div className="max-w-3xl mx-auto bg-[#131520] border border-[#232738] rounded-2xl p-6 sm:p-8 shadow-xl mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-[#9d78ff] uppercase tracking-wider">
                Instant Project Estimator
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Slide to Match Your Budget
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                ${sliderBudget}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Budget Scope: $3 – $1,000
              </div>
            </div>
          </div>

          {/* Range Slider */}
          <div className="space-y-3 mb-6">
            <input
              type="range"
              min="3"
              max="1000"
              step="1"
              value={sliderBudget}
              onChange={(e) => setSliderBudget(Number(e.target.value))}
              className="w-full h-2.5 bg-[#1f2233] rounded-lg appearance-none cursor-pointer accent-[#7045f2]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>$3 (Micro Edit)</span>
              <span>$150 (Long Form)</span>
              <span>$500 (Commercial)</span>
              <span>$1,000 (Master Package)</span>
            </div>
          </div>

          {/* Dynamic Scope Result Box */}
          <div className="p-4 bg-[#171a27] rounded-xl border border-[#262a3e] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#222538]">
              <div>
                <span className="text-xs text-slate-400">Estimated Tier:</span>
                <span className="text-sm font-bold text-white ml-2">{currentScope.tier}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#9d78ff]" />
                <span>Turnaround: {currentScope.turnaround}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
              {currentScope.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => onOpenHireModalWithBudget(sliderBudget, currentScope.tier)}
                className="py-2.5 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#7045f2]/20"
              >
                <span>Hire Muawiya for ${sliderBudget}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Tier Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-[#151724] border-[#7045f2] shadow-xl shadow-[#7045f2]/10 ring-1 ring-[#7045f2]/50'
                  : 'bg-[#12141e] border-[#222536] hover:border-[#2d3248]'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-[#9d78ff] mb-1">
                  {pkg.idealFor}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {pkg.title}
                </h4>
                <div className="text-2xl font-extrabold text-white font-mono mb-1">
                  {pkg.price}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mb-5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Delivery in {pkg.turnaround}</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-[#1f2231]">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1f2231]">
                <button
                  type="button"
                  onClick={() => onOpenHireModalWithBudget(pkg.defaultBudget, pkg.title)}
                  className={`w-full py-2.5 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    pkg.highlight
                      ? 'bg-[#7045f2] hover:bg-[#6037df] text-white shadow-md'
                      : 'bg-[#1c1f2e] hover:bg-[#25293d] text-white border border-[#292d42]'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Email Card */}
        <div id="contact" className="bg-gradient-to-r from-[#141624] to-[#17142b] border border-[#292c42] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9d78ff]">
              Direct Inquiry
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Prefer to email Muawiya directly?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Send your raw footage link, project brief, or questions directly to Muawiya's personal editing inbox. Quick response guaranteed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={copyEmail}
              className="w-full sm:w-auto py-3 px-4 bg-[#1d2030] hover:bg-[#252a40] border border-[#30364f] text-slate-200 text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-[#9d78ff]" />
                  <span className="font-mono text-xs">{email}</span>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                </>
              )}
            </button>

            <a
              href={`mailto:${email}?subject=Video Editing Project Inquiry for Muawiya&body=Hi Muawiya,%0D%0A%0D%0AI would like to hire you for a video editing project in Adobe Premiere Pro.%0D%0A%0D%0AProject Type:%0D%0ABudget ($3-$1000):%0D%0ADeadline:%0D%0AFootage link:%0D%0A%0D%0AThanks!`}
              className="w-full sm:w-auto py-3 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#7045f2]/20"
            >
              <span>Send Direct Email</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
