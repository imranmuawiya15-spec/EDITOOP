import React from 'react';
import { Lock, Mail, Upload, Inbox, LogOut, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  unreadInquiriesCount: number;
  onOpenHireModal: () => void;
  onOpenUploadModal: () => void;
  onOpenInboxModal: () => void;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin,
  unreadInquiriesCount,
  onOpenHireModal,
  onOpenUploadModal,
  onOpenInboxModal,
  onOpenAdminLogin,
  onAdminLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0e15]/90 backdrop-blur-md border-b border-[#1f2233]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <span className="w-7 h-7 rounded-lg bg-[#7045f2] text-white text-xs font-black flex items-center justify-center tracking-tighter">
            Pr
          </span>
          <span>Muawiya · Video Editor</span>
        </a>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#previews"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Showcase Previews
          </a>
          <a
            href="#pricing"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Pricing ($3 – $1k)
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            About Muawiya
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Direct Mail
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenInboxModal}
                className="relative py-2 px-3 text-xs font-semibold bg-[#1a1d2c] hover:bg-[#25293d] border border-[#2e334a] text-slate-200 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                title="Client Hire Messages"
              >
                <Inbox className="w-3.5 h-3.5 text-[#9d78ff]" />
                <span className="hidden sm:inline">Messages</span>
                {unreadInquiriesCount > 0 && (
                  <span className="bg-[#7045f2] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadInquiriesCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenUploadModal}
                className="py-2 px-3.5 text-xs font-semibold bg-[#7045f2] hover:bg-[#6037df] text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Preview</span>
              </button>

              <button
                type="button"
                onClick={onAdminLogout}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#1f2233] rounded-lg transition-all cursor-pointer"
                title="Sign out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#191b27] border border-transparent hover:border-[#272b3d] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                title="Sign in as admin"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Login</span>
              </button>

              <button
                type="button"
                onClick={onOpenHireModal}
                className="py-2 px-4 text-xs font-semibold text-white bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] rounded-lg transition-all whitespace-nowrap shrink-0 shadow-md shadow-[#7045f2]/20 cursor-pointer"
              >
                Hire Muawiya
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
