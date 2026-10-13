import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, MessageSquare, Send, Sparkles, Sliders, CheckCircle, Clock, ShieldCheck, Film } from 'lucide-react';
import { PreviewItem, PreviewComment } from '../types';

interface PreviewDetailModalProps {
  item: PreviewItem;
  isAdmin: boolean;
  onClose: () => void;
  onAddComment: (previewId: string, comment: PreviewComment) => void;
  onHireForThisStyle: (styleName: string, startingPrice: number) => void;
}

export const PreviewDetailModal: React.FC<PreviewDetailModalProps> = ({
  item,
  isAdmin,
  onClose,
  onAddComment,
  onHireForThisStyle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [colorGradeActive, setColorGradeActive] = useState(true);

  // Comment Form state
  const [authorName, setAuthorName] = useState(isAdmin ? 'Muawiya (Editor)' : '');
  const [commentText, setCommentText] = useState('');
  const [commentTimestamp, setCommentTimestamp] = useState('00:05');
  const [rating, setRating] = useState(5);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const formatTimecode = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    const frames = Math.floor((sec % 1) * 24);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  const insertCurrentTimecode = () => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    setCommentTimestamp(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !authorName.trim()) return;

    const newComment: PreviewComment = {
      id: `c-${Date.now()}`,
      authorName: authorName.trim(),
      timestampTag: commentTimestamp.trim(),
      rating: rating,
      text: commentText.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      isAdminReply: isAdmin,
    };

    onAddComment(item.id, newComment);
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#11131c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#151722] border-b border-[#212435] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-[#7045f2] text-white text-[11px] font-bold flex items-center justify-center">
              Pr
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white line-clamp-1">{item.title}</span>
              <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-slate-400 hidden sm:inline">{item.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onHireForThisStyle(item.title, item.startingPrice)}
              className="py-1.5 px-3 bg-[#7045f2] hover:bg-[#6037df] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Hire for this Style (${item.startingPrice})
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202334] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Custom Premiere Pro Player Viewport */}
          <div className="relative rounded-xl overflow-hidden bg-black border border-[#26293d] shadow-2xl">
            <div className="relative aspect-video w-full bg-[#0a0a0e] flex items-center justify-center">
              {item.videoUrl ? (
                <video
                  ref={videoRef}
                  src={item.videoUrl}
                  poster={item.thumbnailUrl}
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    colorGradeActive
                      ? 'filter contrast-110 saturate-110 brightness-105'
                      : 'filter saturate-90 brightness-95'
                  }`}
                />
              ) : (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className={`w-full h-full object-contain ${
                    colorGradeActive ? 'contrast-110 saturate-110' : ''
                  }`}
                />
              )}

              {/* Central Play/Pause Overlay for click */}
              <div
                onClick={togglePlay}
                className="absolute inset-0 cursor-pointer flex items-center justify-center"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-[#7045f2]/90 hover:bg-[#7045f2] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                )}
              </div>

              {/* Color grade A/B Badge */}
              <div className="absolute top-3 left-3 bg-[#0d0f17]/85 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 border border-white/10 flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#00f0ff]" />
                <span>{colorGradeActive ? 'Lumetri Color Grade: ON' : 'Raw Log Profile: REC709'}</span>
              </div>
            </div>

            {/* Premiere Pro Playback Controller Bar */}
            <div className="p-3 bg-[#13151f] border-t border-[#232638] space-y-2">
              {/* Timeline Scrubber */}
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 30}
                  step="0.05"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-[#25283a] rounded-lg appearance-none cursor-pointer accent-[#7045f2]"
                />
              </div>

              {/* Controller buttons & Timecode display */}
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 hover:text-white hover:bg-[#202334] rounded transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (videoRef.current) videoRef.current.muted = !isMuted;
                    }}
                    className="p-1.5 hover:text-white hover:bg-[#202334] rounded transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Premiere SMPTE Timecode Counter */}
                  <div className="font-mono text-xs font-semibold text-[#00f0ff] bg-[#0c0d14] px-2 py-0.5 rounded border border-[#212437]">
                    {formatTimecode(currentTime)} / {formatTimecode(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Lumetri Toggle */}
                  <button
                    type="button"
                    onClick={() => setColorGradeActive(!colorGradeActive)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                      colorGradeActive
                        ? 'bg-[#7045f2]/20 border-[#7045f2] text-[#9d78ff]'
                        : 'bg-[#181a26] border-[#292c3f] text-slate-400'
                    }`}
                  >
                    {colorGradeActive ? 'Lumetri Grade' : 'Raw Log View'}
                  </button>

                  {/* Speed options */}
                  {[1, 1.5, 2].map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => handleSpeedChange(sp)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                        playbackSpeed === sp ? 'bg-[#25283a] text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {sp}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details & Premiere Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#141622] rounded-xl border border-[#212435] text-xs">
            <div>
              <div className="text-slate-400 mb-1">Editor & Software</div>
              <div className="text-white font-semibold">Muawiya</div>
              <div className="text-[#9d78ff] font-medium mt-0.5">Adobe Premiere Pro Only</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Applied Effects & Workflow</div>
              <div className="flex flex-wrap gap-1 text-slate-300">
                {item.premiereFeatures.map((f) => (
                  <span key={f} className="text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Starting Price</div>
              <div className="text-emerald-400 font-bold font-mono text-sm">${item.startingPrice}</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Custom quotes up to $1,000</div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#212435]">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MessageSquare className="w-4 h-4 text-[#9d78ff]" />
                <span>Client & Visitor Feedback ({item.comments.length})</span>
              </div>
              <span className="text-xs text-slate-400">Frame-accurate discussions</span>
            </div>

            {/* Existing Comments List */}
            <div className="space-y-3">
              {item.comments.map((c) => (
                <div
                  key={c.id}
                  className={`p-3.5 rounded-xl border text-xs ${
                    c.isAdminReply
                      ? 'bg-[#18152b] border-[#7045f2]/40 text-slate-200'
                      : 'bg-[#141622] border-[#222538] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{c.authorName}</span>
                      {c.isAdminReply && (
                        <span className="bg-[#7045f2] text-white text-[10px] px-1.5 py-0.2 rounded font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Editor
                        </span>
                      )}
                      {c.timestampTag && (
                        <span className="font-mono text-[#00f0ff] bg-[#0c0d14] px-1.5 py-0.2 rounded text-[11px]">
                          @{c.timestampTag}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{c.createdAt}</span>
                  </div>
                  <p className="leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-4 bg-[#141622] rounded-xl border border-[#232738] space-y-3">
              <div className="text-xs font-semibold text-white flex items-center justify-between">
                <span>Leave a Comment on this Preview</span>
                <button
                  type="button"
                  onClick={insertCurrentTimecode}
                  className="text-[11px] text-[#9d78ff] hover:text-[#b498ff] flex items-center gap-1 cursor-pointer"
                >
                  <Clock className="w-3 h-3" />
                  Tag Current Frame ({formatTimecode(currentTime).slice(3)})
                </button>
              </div>

              {commentSuccess && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Comment published successfully!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. John Miller"
                    required
                    className="w-full px-3 py-2 bg-[#171926] border border-[#292d42] rounded-lg text-xs text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Video Timestamp Tag</label>
                  <input
                    type="text"
                    value={commentTimestamp}
                    onChange={(e) => setCommentTimestamp(e.target.value)}
                    placeholder="00:15"
                    className="w-full px-3 py-2 bg-[#171926] border border-[#292d42] rounded-lg text-xs text-white placeholder-slate-500 font-mono outline-none focus:border-[#7045f2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Your Feedback / Question</label>
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tell Muawiya what you think about the pacing, cuts, or sound design..."
                  required
                  className="w-full px-3 py-2 bg-[#171926] border border-[#292d42] rounded-lg text-xs text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#7045f2] hover:bg-[#6037df] text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#7045f2]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
