import React, { useState } from 'react';
import { X, Mail, DollarSign, Calendar, ExternalLink, Trash2, CheckCircle, Clock, MessageSquare, Reply } from 'lucide-react';
import { HireInquiry } from '../types';

interface AdminInboxModalProps {
  inquiries: HireInquiry[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: HireInquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({
  inquiries,
  onClose,
  onUpdateStatus,
  onDeleteInquiry,
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<HireInquiry | null>(
    inquiries.length > 0 ? inquiries[0] : null
  );
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? inquiries
    : inquiries.filter(i => i.status === statusFilter);

  const handleReplyMailto = (inq: HireInquiry) => {
    const subject = encodeURIComponent(`Regarding Your Video Editing Project (${inq.projectType}) - Muawiya`);
    const body = encodeURIComponent(
      `Hi ${inq.clientName},\n\nThank you for reaching out through my editing portfolio! I have reviewed your project brief and proposed budget ($${inq.budget}).\n\nI edit exclusively in Adobe Premiere Pro and can deliver your project within ${inq.deadline}.\n\nLet's discuss the next steps!\n\nBest regards,\nMuawiya\nVideo Editor (Adobe Premiere Pro Specialist)\nimranmuawiya15@gmail.com`
    );
    window.location.href = `mailto:${inq.clientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#11131c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#151722] border-b border-[#212435] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7045f2] text-white flex items-center justify-center font-bold text-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Client Hire Messages Inbox
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7045f2]/20 text-[#9d78ff] border border-[#7045f2]/30">
                  {inquiries.length} Inquiries
                </span>
              </h2>
              <p className="text-xs text-slate-400">Admin Portal · Messages sent to Muawiya</p>
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

        {/* Filter bar */}
        <div className="px-6 py-2.5 bg-[#141620] border-b border-[#202333] flex items-center gap-2 overflow-x-auto text-xs">
          {['All', 'New', 'In Discussion', 'In Progress', 'Completed'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === s
                  ? 'bg-[#7045f2] text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Main Body: Master-Detail view */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-0">
          {/* Inquiry List */}
          <div className="md:col-span-5 border-r border-[#202333] overflow-y-auto p-3 space-y-2 max-h-[60vh] md:max-h-none">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">
                No inquiries matching filter.
              </div>
            ) : (
              filtered.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedInquiry?.id === inq.id
                      ? 'bg-[#1b192e] border-[#7045f2] text-white shadow-sm'
                      : 'bg-[#141622] border-[#222536] text-slate-300 hover:border-[#2d3148]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white line-clamp-1">{inq.clientName}</span>
                    <span className="font-mono text-emerald-400 font-bold">${inq.budget}</span>
                  </div>

                  <div className="text-[11px] text-[#9d78ff] font-medium mb-1">
                    {inq.projectType}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {inq.brief}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-500">
                    <span>{inq.createdAt}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-medium ${
                        inq.status === 'New'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inq.status === 'In Discussion'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : inq.status === 'In Progress'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Inquiry Detail View */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5">
            {selectedInquiry ? (
              <>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#212435]">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {selectedInquiry.clientName}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-[#9d78ff]" />
                      <span className="font-mono">{selectedInquiry.clientEmail}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      ${selectedInquiry.budget}
                    </div>
                    <div className="text-[11px] text-slate-400">Budget Proposed</div>
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#151724] rounded-xl border border-[#232738]">
                    <span className="text-slate-400 block mb-1">Project Category:</span>
                    <span className="text-white font-semibold">{selectedInquiry.projectType}</span>
                  </div>
                  <div className="p-3 bg-[#151724] rounded-xl border border-[#232738]">
                    <span className="text-slate-400 block mb-1">Target Deadline:</span>
                    <span className="text-white font-semibold">{selectedInquiry.deadline}</span>
                  </div>
                </div>

                {/* Footage link */}
                <div className="p-3 bg-[#151724] rounded-xl border border-[#232738] text-xs">
                  <span className="text-slate-400 block mb-1">Client Footage Link:</span>
                  {selectedInquiry.projectLink.startsWith('http') ? (
                    <a
                      href={selectedInquiry.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#9d78ff] hover:underline flex items-center gap-1.5 break-all font-mono"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedInquiry.projectLink}</span>
                    </a>
                  ) : (
                    <span className="text-slate-300 font-mono">{selectedInquiry.projectLink}</span>
                  )}
                </div>

                {/* Brief */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Project Instructions & Brief:
                  </h4>
                  <div className="p-4 bg-[#141622] rounded-xl border border-[#222538] text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.brief}
                  </div>
                </div>

                {/* Status selector & Actions */}
                <div className="pt-4 border-t border-[#212435] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Update Status:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as HireInquiry['status'];
                        onUpdateStatus(selectedInquiry.id, newStatus);
                        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                      }}
                      className="px-2.5 py-1.5 bg-[#171926] border border-[#2a2f44] rounded-lg text-xs text-white outline-none focus:border-[#7045f2]"
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete message from ${selectedInquiry.clientName}?`)) {
                          onDeleteInquiry(selectedInquiry.id);
                          setSelectedInquiry(null);
                        }
                      }}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReplyMailto(selectedInquiry)}
                      className="py-2 px-4 bg-[#7045f2] hover:bg-[#6037df] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#7045f2]/20"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-24 text-sm text-slate-500">
                Select an inquiry from the left to view details and reply.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
