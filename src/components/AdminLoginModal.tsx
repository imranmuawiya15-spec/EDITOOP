import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../services/storage';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
        onLoginSuccess();
        onClose();
      }, 300);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage('Incorrect email or password. Access is restricted to admin.');
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#11131c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden my-auto p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-[#212435] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7045f2] text-white flex items-center justify-center font-bold text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Admin Access Sign In</h2>
              <p className="text-xs text-slate-400">Muawiya Video Editor Portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202334] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-[#151724] rounded-xl border border-[#24283b] text-xs text-slate-300">
            Sign in with authorized administrator credentials to upload desktop previews and view incoming client hire inquiries.
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Incorrect Credentials</div>
                <div>{errorMessage}</div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
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
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171926] border border-[#2b3044] focus:border-[#7045f2] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
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
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171926] border border-[#2b3044] focus:border-[#7045f2] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Verifying...' : 'Sign In as Admin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
