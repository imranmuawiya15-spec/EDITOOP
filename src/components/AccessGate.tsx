import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, UserCheck, Video } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../services/storage';

interface AccessGateProps {
  onEnterAsClient: () => void;
  onAdminLoginSuccess: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({
  onEnterAsClient,
  onAdminLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (
      trimmedEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      trimmedPass === ADMIN_CREDENTIALS.password
    ) {
      setTimeout(() => {
        setIsSubmitting(false);
        onAdminLoginSuccess();
      }, 300);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage('Incorrect email or password. Access is restricted to admin.');
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090a0f] p-4 text-slate-100 overflow-y-auto">
      {/* Background glow ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7045f2]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1c1e2d_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative w-full max-w-lg bg-[#11131a] border border-[#232738] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Premiere Pro Branding Header */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#212435]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1236] to-[#0c0d17] border border-[#7045f2]/40 flex items-center justify-center font-bold text-xl text-[#9d78ff] shadow-inner">
            Pr
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Muawiya
              <span className="text-xs font-normal text-slate-400">· Video Editor</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              1 Year Experience · Adobe Premiere Pro Specialist
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-[#171924] rounded-xl mb-6 border border-[#232738]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('client');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'client'
                ? 'bg-[#222638] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Client / Visitor
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-[#7045f2] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Sign In
          </button>
        </div>

        {activeTab === 'client' ? (
          <div className="space-y-5">
            <div className="p-4 bg-[#161824] rounded-xl border border-[#222536] text-xs leading-relaxed text-slate-300">
              <p className="font-medium text-white mb-1.5 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#9d78ff]" />
                Explore Portfolio & Hire
              </p>
              Welcome! As a client or visitor, you can watch desktop video editing previews, test the Premiere Pro timeline scrubber, comment on clips, estimate your project price ($3 to $1,000), and hire Muawiya directly.
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between py-1 border-b border-[#1c1f2e]">
                <span>Editor</span>
                <span className="text-slate-200 font-medium">Muawiya</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#1c1f2e]">
                <span>Editing Software</span>
                <span className="text-slate-200 font-medium">Exclusively Adobe Premiere Pro</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#1c1f2e]">
                <span>Pricing Range</span>
                <span className="text-emerald-400 font-medium">$3 to $1,000</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Direct Contact</span>
                <span className="text-slate-200 font-medium font-mono text-[11px]">imranmuawiya15@gmail.com</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onEnterAsClient}
              className="w-full py-3.5 px-4 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Enter Portfolio & Client Suite</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="p-3.5 bg-[#171926] rounded-xl border border-[#262a3f] text-xs text-slate-300">
              <span className="font-semibold text-white">Admin Privileges:</span> Upload video previews from desktop and receive client hire messages and inquiries.
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Access Denied</div>
                  <div>{errorMessage}</div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Gmail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="imranmuawiya15@gmail.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171924] border border-[#2b3044] focus:border-[#7045f2] focus:ring-1 focus:ring-[#7045f2] rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171924] border border-[#2b3044] focus:border-[#7045f2] focus:ring-1 focus:ring-[#7045f2] rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying...' : 'Sign In as Admin'}</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onEnterAsClient}
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 cursor-pointer"
              >
                Or enter as visitor / client without admin credentials
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
