import React, { useState } from 'react';
import { ArrowRight, Mail, Check, Play, Sparkles, Copy } from 'lucide-react';
import heroImg from '../assets/images/hero_premiere_suite_1791884866695.jpg';

interface HeroProps {
  onOpenHireModal: () => void;
  onExplorePreviews: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHireModal, onExplorePreviews }) => {
  const [copied, setCopied] = useState(false);
  const email = 'imranmuawiya15@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#1b1e2c]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#7045f2]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#9d78ff]">
              <span>Adobe Premiere Pro Specialist</span>
              <span aria-hidden="true">·</span>
              <span>1 Year Professional Experience</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Available For Hire</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Frame-Accurate Cuts. High-Retention Rhythm.
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              I am <strong className="text-white font-semibold">Muawiya</strong>, a dedicated video editor crafting high-converting viral shorts, commercial promos, and YouTube videos. Edited <span className="text-[#9d78ff] font-medium">exclusively in Adobe Premiere Pro</span> with custom sound design, Lumetri color grading, and dynamic motion.
            </p>

            {/* Starting price announcement */}
            <div className="p-3.5 bg-[#141622] rounded-xl border border-[#232738] flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-400">Flexible Rates for Creators & Brands</span>
              <span className="font-bold text-emerald-400 font-mono tabular-nums text-sm sm:text-base">
                Starting from $3 to $1,000
              </span>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenHireModal}
                className="py-3 px-6 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Hire Muawiya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="py-3 px-4 bg-[#171926] hover:bg-[#202334] border border-[#2b3044] text-slate-200 text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                title="Copy Direct Email"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#9d78ff]" />
                    <span className="font-mono text-xs text-slate-300">{email}</span>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}?subject=Video Editing Project Inquiry for Muawiya`}
                className="py-3 px-3 text-xs text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-4 hidden sm:inline"
              >
                Open Mail App
              </a>
            </div>
          </div>

          {/* Right Column: Large Visual Showcase Container */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#272b3e] shadow-2xl bg-[#12141e] group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={heroImg}
                  alt="Adobe Premiere Pro Editing Workstation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent opacity-80" />

                {/* Overlay Floating Specs */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="bg-[#0e1018]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#25283a] text-slate-200 font-mono">
                    <span className="text-[#9d78ff] font-semibold">PRPROJ</span> · 4K 60FPS
                  </div>
                  <button
                    type="button"
                    onClick={onExplorePreviews}
                    className="bg-[#7045f2]/90 hover:bg-[#7045f2] backdrop-blur-md text-white px-3.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Previews</span>
                  </button>
                </div>
              </div>

              {/* Premiere Pro Status Ribbon */}
              <div className="p-3 bg-[#11131c] border-t border-[#1e2130] flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Lumetri Scopes: Calibrated</span>
                <span className="text-slate-300">100% Premiere Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width metric proof strip below hero split */}
        <div className="mt-12 pt-8 border-t border-[#1b1e2c] grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              1 Year
            </div>
            <div className="text-xs text-slate-400">
              Dedicated Editing Experience
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#9d78ff] font-mono tabular-nums">
              Premiere Pro
            </div>
            <div className="text-xs text-slate-400">
              100% Exclusive Software Stack
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
              $3 – $1,000
            </div>
            <div className="text-xs text-slate-400">
              Flexible Budget Tiers & Packages
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              24 – 48h
            </div>
            <div className="text-xs text-slate-400">
              Rapid Turnaround Time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
