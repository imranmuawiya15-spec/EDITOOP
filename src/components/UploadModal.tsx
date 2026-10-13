import React, { useState, useRef } from 'react';
import { X, Upload, Film, DollarSign, Clock, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { PreviewItem } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: (newPreview: PreviewItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploadSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PreviewItem['category']>('Shorts & Reels');
  const [duration, setDuration] = useState('0:45');
  const [aspectRatio, setAspectRatio] = useState<PreviewItem['aspectRatio']>('16:9');
  const [startingPrice, setStartingPrice] = useState<number>(25);
  const [featuresInput, setFeaturesInput] = useState('Speed Ramps, Lumetri Color, Sound FX');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const isVid = file.type.startsWith('video/');
      setIsVideo(isVid);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewMediaUrl(reader.result);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file from desktop.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for the preview.');
      return;
    }
    if (!previewMediaUrl) {
      setError('Please select a video or image preview file from your desktop.');
      return;
    }

    setIsProcessing(true);

    const featureList = featuresInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newPreview: PreviewItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Custom Adobe Premiere Pro edit uploaded from desktop workstation.',
      category: category,
      videoUrl: isVideo ? previewMediaUrl : undefined,
      thumbnailUrl: previewMediaUrl,
      duration: duration.trim() || '0:30',
      aspectRatio: aspectRatio,
      createdAt: new Date().toISOString().split('T')[0],
      premiereFeatures: featureList.length > 0 ? featureList : ['Adobe Premiere Pro', 'Lumetri Color'],
      startingPrice: Math.max(3, Math.min(1000, Number(startingPrice) || 3)),
      viewsCount: 1,
      likesCount: 0,
      comments: [],
      isCustomUpload: true,
    };

    setTimeout(() => {
      onUploadSuccess(newPreview);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#11131c] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-[#151722] border-b border-[#212435] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#7045f2] text-white flex items-center justify-center font-bold text-xs">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upload Preview from Desktop</h2>
              <p className="text-xs text-slate-400">Admin Only · Add your Premiere Pro edits directly</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Desktop File Picker Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Select Video or Showcase File from Desktop
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#2d3247] hover:border-[#7045f2] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#141622] hover:bg-[#181b29]"
            >
              {previewMediaUrl ? (
                <div className="space-y-3">
                  <div className="max-h-48 rounded-lg overflow-hidden flex items-center justify-center bg-black">
                    {isVideo ? (
                      <video src={previewMediaUrl} controls className="max-h-48 object-contain" />
                    ) : (
                      <img src={previewMediaUrl} alt="Preview" className="max-h-48 object-contain" />
                    )}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Loaded from desktop: {selectedFile?.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-xs text-[#9d78ff] hover:underline"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-[#202334] text-[#9d78ff] flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Click to browse video / thumbnail from desktop
                  </div>
                  <p className="text-xs text-slate-400">
                    Supports MP4, WebM, MOV, JPG, PNG from your Adobe Premiere export folder
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cyberpunk Cinematic Reel"
                required
                className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PreviewItem['category'])}
                className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2]"
              >
                <option value="Shorts & Reels">Shorts & Reels (9:16)</option>
                <option value="Commercial & Ads">Commercial & Ads (16:9)</option>
                <option value="YouTube & Long-form">YouTube & Long-form</option>
                <option value="Color Grade">Color Grade / Lumetri</option>
                <option value="Music Video">Music Video</option>
                <option value="Documentary">Documentary</option>
              </select>
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Starting Price ($3 - $1000)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="3"
                  max="1000"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                  required
                  className="w-full pl-8 pr-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Duration (e.g. 0:30, 2:15)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="0:45"
                  className="w-full pl-8 pr-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as PreviewItem['aspectRatio'])}
                className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white outline-none focus:border-[#7045f2]"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="9:16">9:16 (Vertical Reels)</option>
                <option value="4:3">4:3 (Classic)</option>
                <option value="1:1">1:1 (Square)</option>
              </select>
            </div>
          </div>

          {/* Premiere Pro Features / Techniques */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Premiere Pro Features / Techniques (comma separated)
            </label>
            <input
              type="text"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Lumetri Color, Speed Ramps, Sound Foley, Custom Transitions"
              className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the editing choices, pacing, storytelling, and Premiere Pro workflow used..."
              className="w-full px-3 py-2.5 bg-[#171926] border border-[#2b3044] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#7045f2]"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#212435]">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-transparent hover:bg-[#1f2233] text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="py-2.5 px-5 bg-[#7045f2] hover:bg-[#6037df] active:bg-[#522ecc] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-[#7045f2]/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{isProcessing ? 'Publishing...' : 'Publish to Portfolio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
