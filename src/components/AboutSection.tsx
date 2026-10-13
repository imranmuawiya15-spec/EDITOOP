import React, { useState } from 'react';
import { Mail, Check, Copy, Film, Sparkles, Sliders, Volume2, ShieldCheck } from 'lucide-react';
import editorPortrait from '../assets/images/editor_muawiya_workspace_1791884867033.jpg';

interface AboutSectionProps {
  onOpenHireModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenHireModal }) => {
  const [copied, setCopied] = useState(false);
  const email = 'imranmuawiya15@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const principles = [
    {
      num: '01',
      title: 'Pacing & Audience Retention',
      desc: 'Frame-accurate cuts aligned with psychological retention triggers, micro-zooms, and visual rhythm.',
    },
    {
      num: '02',
      title: 'Lumetri Color Grading',
      desc: 'Custom color wheels, 3D LUT calibration, clean skin tone protection, and high-contrast cinematic saturation.',
    },
    {
      num: '03',
      title: 'Sound Design & Foley Stems',
      desc: 'Layered whooshes, impacts, dialogue EQ, essential sound cleanup, and seamless music beat-matching.',
    },
    {
      num: '04',
      title: 'Exclusively Adobe Premiere Pro',
      desc: 'Zero generic templates or third-party auto-cutters. Dedicated, handcrafted timeline mastery with .prproj reliability.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-[#1b1e2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait & Console Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#26293d] shadow-2xl bg-[#11131c]">
              <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/5] overflow-hidden">
                <img
                  src={editorPortrait}
                  alt="Muawiya Video Editor Console"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent opacity-75" />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0d0f17]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded bg-[#7045f2] text-white text-[10px] flex items-center justify-center font-black">
                        Pr
                      </span>
                      Muawiya
                    </span>
                    <span className="text-[#9d78ff] font-mono text-[11px]">1 Year Experience</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Dedicated exclusively to Adobe Premiere Pro cutting and post-production.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile & Biography details */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9d78ff] mb-2">
                Behind the Edit
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Crafting Every Frame in Adobe Premiere Pro
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Hello, I am <strong className="text-white font-semibold">Muawiya</strong>. Over my 1 year of focused, hands-on experience in video editing, I have specialized strictly and exclusively in <strong className="text-white font-semibold">Adobe Premiere Pro</strong>.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              I believe great editing is invisible yet irresistible. Rather than relying on tacky automatic presets, I build every sequence cut-by-cut: tuning the audio wave ducking, keyframing kinetic titles, balancing color primaries in Lumetri, and ensuring the viewer never loses attention.
            </p>

            {/* Editing Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {principles.map((p) => (
                <div
                  key={p.num}
                  className="p-4 bg-[#141622] rounded-xl border border-[#212435] space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#9d78ff]">{p.num}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick action bar */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenHireModal}
                className="py-3 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all cursor-pointer"
              >
                Start a Project with Muawiya
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="py-3 px-4 bg-[#171926] hover:bg-[#202334] border border-[#292d40] text-slate-200 text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied {email}</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#9d78ff]" />
                    <span className="font-mono text-xs">{email}</span>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
