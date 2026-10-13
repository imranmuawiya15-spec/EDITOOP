import React, { useState } from 'react';
import { X, Send, CheckCircle2, DollarSign, Calendar, Link, Mail, FileText, ArrowRight } from 'lucide-react';
import { HireInquiry } from '../types';

interface HireModalProps {
  initialBudget?: number;
  initialPackage?: string;
  onClose: () => void;
  onSubmitInquiry: (inquiry: HireInquiry) => void;
}

export const HireModal: React.FC<HireModalProps> = ({
  initialBudget = 50,
  initialPackage = 'YouTube & Long-form',
  onClose,
  onSubmitInquiry,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState(initialPackage);
  const [budget, setBudget] = useState(initialBudget);
  const [deadline, setDeadline] = useState('Within 48 hours');
  const [projectLink, setProjectLink] = useState('');
  const [brief, setBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !brief.trim()) return;

    const newInquiry: HireInquiry = {
      id: `inq-${Date.now()}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      projectType,
      budget: Math.max(3, Math.min(1000, Number(budget) || 3)),
      deadline: deadline.trim() || 'Flexible',
      projectLink: projectLink.trim() || 'Pending footage upload',
      brief: brief.trim(),
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitInquiry(newInquiry);
    setIsSubmitted(true);
  };

  const directMailtoUrl = `mailto:imranmuawiya15@gmail.com?subject=New Video Editing Project from ${encodeURIComponent(clientName || 'Client')}&body=Client Name: ${encodeURIComponent(clientName)}%0D%0AClient Email: ${encodeURIComponent(clientEmail)}%0D%0AProject Type: ${encodeURIComponent(projectType)}%0D%0ABudget: $${budget}%0D%0ADeadline: ${encodeURIComponent(deadline)}%0D%0AFootage Link: ${encodeURIComponent(projectLink)}%0D%0A%0D%0ABrief:%0D%0A${encodeURIComponent(brief)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#11131c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-[#151722] border-b border-[#212435] flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Hire Muawiya
              <span className="text-xs font-normal text-[#9d78ff]">· Adobe Premiere Pro</span>
            </h2>
            <p className="text-xs text-slate-400">Direct client message sent to editor portal</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202334] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Project Inquiry Received!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you <strong className="text-white">{clientName}</strong>. Muawiya has received your project details in the admin portal and will review your footage and brief immediately.
              </p>
            </div>

            <div className="p-4 bg-[#161826] rounded-xl border border-[#25293d] text-xs text-slate-300 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Project Type:</span>
                <span className="text-white font-medium">{projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Proposed Budget:</span>
                <span className="text-emerald-400 font-bold font-mono">${budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Editor Contact:</span>
                <span className="text-slate-200 font-mono">imranmuawiya15@gmail.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={directMailtoUrl}
                className="py-2.5 px-4 bg-[#7045f2] hover:bg-[#6037df] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Also Open in Gmail / Mail App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-[#1f2233] hover:bg-[#282c42] text-slate-200 text-xs font-medium rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  required
                  className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@company.com"
                  required
                  className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                />
              </div>
            </div>

            {/* Project Type & Budget ($3 - $1000) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2]"
                >
                  <option value="Shorts & Reels">Shorts & Reels ($3 - $25)</option>
                  <option value="YouTube & Long-form">YouTube & Long-form ($25 - $150)</option>
                  <option value="Commercial & Ads">Commercial & Ads ($150 - $500)</option>
                  <option value="Music Video">Music Video ($150 - $600)</option>
                  <option value="Color Grade & Polish">Color Grade & Polish ($30 - $300)</option>
                  <option value="Full Campaign">Full Campaign ($500 - $1,000)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Your Budget ($3 – $1,000)
                  </label>
                  <span className="font-mono text-xs font-bold text-emerald-400">${budget}</span>
                </div>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="3"
                    max="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    required
                    className="w-full pl-8 pr-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Deadline & Footage Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Deadline
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. 24 hours, or April 25"
                    className="w-full pl-8 pr-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Footage Link (Drive / Dropbox)
                </label>
                <div className="relative">
                  <Link className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-8 pr-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                  />
                </div>
              </div>
            </div>

            {/* Brief */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Brief & Instructions
              </label>
              <textarea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe your vision, pacing, music style, reference channels or specific requirements..."
                required
                className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
              />
            </div>

            {/* Footer */}
            <div className="pt-3 flex items-center justify-between border-t border-[#212435]">
              <div className="text-[11px] text-slate-400">
                Direct to: <span className="font-mono text-slate-300">imranmuawiya15@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Hire Request</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
