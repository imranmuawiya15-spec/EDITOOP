import React from 'react';
import { Mail, Lock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isAdmin,
  onOpenAdminLogin,
  onAdminLogout,
}) => {
  const email = 'imranmuawiya15@gmail.com';

  return (
    <footer className="bg-[#090a10] border-t border-[#191c28] py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#181a26]">
          {/* Brand & summary */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
              <span className="w-5 h-5 rounded bg-[#7045f2] text-white text-[10px] flex items-center justify-center font-black">
                Pr
              </span>
              Muawiya · Video Editor
            </div>
            <p className="text-slate-400 text-xs">
              1 Year Experience · Specialized Exclusively in Adobe Premiere Pro
            </p>
          </div>

          {/* Links & Email */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={`mailto:${email}`}
              className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-[#9d78ff]" />
              {email}
            </a>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono font-medium">Pricing: $3 to $1,000</span>
          </div>

          {/* Access status */}
          <div>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9d78ff] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Logged in as Admin
                </span>
                <button
                  type="button"
                  onClick={onAdminLogout}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:underline"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Muawiya. All cuts, grades, and audio mastered in Adobe Premiere Pro.
          </div>
          <div>
            High-Retention Editing & Creative Post-Production
          </div>
        </div>
      </div>
    </footer>
  );
};
