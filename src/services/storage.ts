import { PreviewItem, HireInquiry, PreviewComment } from '../types';

import heroImg from '../assets/images/hero_premiere_suite_1791884866695.jpg';
import commercialImg from '../assets/images/preview_commercial_film_1791884867280.jpg';
import viralImg from '../assets/images/preview_short_form_viral_1791884867904.jpg';
import workspaceImg from '../assets/images/editor_muawiya_workspace_1791884867033.jpg';

const STORAGE_PREVIEWS_KEY = 'muawiya_portfolio_previews_v1';
const STORAGE_INQUIRIES_KEY = 'muawiya_client_inquiries_v1';
const STORAGE_AUTH_KEY = 'muawiya_admin_session_v1';

export const ADMIN_CREDENTIALS = {
  email: 'imranmuawiya15@gmail.com',
  password: 'smoke000',
};

const DEFAULT_PREVIEWS: PreviewItem[] = [
  {
    id: 'preview-1',
    title: 'High-Retention MTB Action Reel',
    description: 'Dynamic sports edit featuring frame-accurate beat drops, speed ramps, aggressive sound design, and custom Lumetri color pop created in Adobe Premiere Pro.',
    category: 'Shorts & Reels',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: viralImg,
    duration: '0:32',
    aspectRatio: '9:16',
    createdAt: '2026-03-28',
    premiereFeatures: ['Speed Ramps', 'Lumetri Color Pop', 'Audio SFX Ducking', 'Dynamic Subtitles'],
    startingPrice: 15,
    viewsCount: 1420,
    likesCount: 184,
    comments: [
      {
        id: 'c1',
        authorName: 'Alex Mercer',
        timestampTag: '00:08',
        rating: 5,
        text: 'The transition on the 8-second jump is crazy clean! Did you keyframe that zoom in Premiere?',
        createdAt: '2026-04-02',
      },
      {
        id: 'c2',
        authorName: 'Muawiya (Editor)',
        timestampTag: '00:08',
        rating: 5,
        text: 'Thanks Alex! Yes, custom directional blur keyframed on adjustment layers in Premiere Pro!',
        createdAt: '2026-04-02',
        isAdminReply: true,
      },
    ],
  },
  {
    id: 'preview-2',
    title: 'Cinematic Coastal Automotive Ad',
    description: 'High-end commercial edit with anamorphic tone grading, sound foley layers, and pacing built exclusively in Adobe Premiere Pro timeline.',
    category: 'Commercial & Ads',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: commercialImg,
    duration: '1:15',
    aspectRatio: '16:9',
    createdAt: '2026-03-15',
    premiereFeatures: ['Anamorphic Grading', 'Multitrack Foley', 'Speed Interpolation', 'Curve Adjustments'],
    startingPrice: 180,
    viewsCount: 3890,
    likesCount: 412,
    comments: [
      {
        id: 'c3',
        authorName: 'Studio Drive',
        timestampTag: '00:24',
        rating: 5,
        text: 'Incredible color palette. The dusk tones look like a million-dollar commercial.',
        createdAt: '2026-03-20',
      },
      {
        id: 'c4',
        authorName: 'David K.',
        timestampTag: '00:45',
        rating: 5,
        text: 'Great work! We hired Muawiya for our launch video and delivered within 48 hours.',
        createdAt: '2026-03-22',
      },
    ],
  },
  {
    id: 'preview-3',
    title: 'Modern YouTube Vlog & Storytelling Edit',
    description: 'Full YouTube episode with audience retention pacing, zoom cuts, seamless sound effects, and B-roll sync.',
    category: 'YouTube & Long-form',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: heroImg,
    duration: '4:20',
    aspectRatio: '16:9',
    createdAt: '2026-02-18',
    premiereFeatures: ['Retention Cuts', 'Sound FX Stems', 'Custom Lower Thirds', 'Multicam Edit'],
    startingPrice: 45,
    viewsCount: 2150,
    likesCount: 295,
    comments: [
      {
        id: 'c5',
        authorName: 'Marcus V.',
        timestampTag: '01:10',
        rating: 5,
        text: 'Pacing never drops for a second. Highly recommended for YouTube creators.',
        createdAt: '2026-02-25',
      },
    ],
  },
  {
    id: 'preview-4',
    title: 'Studio Creative Session & Premiere Workflow',
    description: 'Behind the scenes Premiere Pro editing breakdown showing timeline organization, color wheels, and audio mixing.',
    category: 'Color Grade',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: workspaceImg,
    duration: '2:10',
    aspectRatio: '16:9',
    createdAt: '2026-01-10',
    premiereFeatures: ['Lumetri Curves', 'Timeline Nesting', 'Audio Compression', 'Color Wheels'],
    startingPrice: 30,
    viewsCount: 1780,
    likesCount: 220,
    comments: [
      {
        id: 'c6',
        authorName: 'Elena Rostova',
        timestampTag: '00:30',
        rating: 5,
        text: 'Your timeline setup is so clean and organized!',
        createdAt: '2026-01-15',
      },
    ],
  },
];

const DEFAULT_INQUIRIES: HireInquiry[] = [
  {
    id: 'inq-1',
    clientName: 'Julian Vance',
    clientEmail: 'julian.vance@brandstudio.io',
    projectType: 'Commercial & Ads',
    budget: 350,
    deadline: '2026-04-20',
    projectLink: 'https://drive.google.com/drive/folders/sample-automotive-ad',
    brief: 'Need a 60-second high-energy automotive promo cut from 4K B-roll footage. Dynamic speed ramps and clean Premiere color grading required.',
    status: 'In Discussion',
    createdAt: '2026-04-10',
  },
  {
    id: 'inq-2',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@fitpulse.co',
    projectType: 'Shorts & Reels',
    budget: 65,
    deadline: '2026-04-18',
    projectLink: 'https://wetransfer.com/downloads/sample-reels-pack',
    brief: '3x 9:16 Instagram Reels for fitness brand. High-retention cuts with bold subtitles and energetic sound effects.',
    status: 'New',
    createdAt: '2026-04-12',
  },
];

export function getStoredPreviews(): PreviewItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_PREVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PREVIEWS_KEY, JSON.stringify(DEFAULT_PREVIEWS));
      return DEFAULT_PREVIEWS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PREVIEWS;
  }
}

export function saveStoredPreviews(previews: PreviewItem[]): void {
  try {
    localStorage.setItem(STORAGE_PREVIEWS_KEY, JSON.stringify(previews));
  } catch (e) {
    console.error('Failed to save previews', e);
  }
}

export function addPreviewItem(item: PreviewItem): PreviewItem[] {
  const current = getStoredPreviews();
  const updated = [item, ...current];
  saveStoredPreviews(updated);
  return updated;
}

export function deletePreviewItem(id: string): PreviewItem[] {
  const current = getStoredPreviews();
  const updated = current.filter(p => p.id !== id);
  saveStoredPreviews(updated);
  return updated;
}

export function addCommentToPreview(previewId: string, comment: PreviewComment): PreviewItem[] {
  const current = getStoredPreviews();
  const updated = current.map(item => {
    if (item.id === previewId) {
      return {
        ...item,
        comments: [...item.comments, comment],
      };
    }
    return item;
  });
  saveStoredPreviews(updated);
  return updated;
}

export function getStoredInquiries(): HireInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INQUIRIES;
  }
}

export function saveStoredInquiries(inquiries: HireInquiry[]): void {
  try {
    localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Failed to save inquiries', e);
  }
}

export function addHireInquiry(inquiry: HireInquiry): HireInquiry[] {
  const current = getStoredInquiries();
  const updated = [inquiry, ...current];
  saveStoredInquiries(updated);
  return updated;
}

export function updateInquiryStatus(id: string, status: HireInquiry['status']): HireInquiry[] {
  const current = getStoredInquiries();
  const updated = current.map(inq => inq.id === id ? { ...inq, status } : inq);
  saveStoredInquiries(updated);
  return updated;
}

export function deleteInquiry(id: string): HireInquiry[] {
  const current = getStoredInquiries();
  const updated = current.filter(inq => inq.id !== id);
  saveStoredInquiries(updated);
  return updated;
}

export function getStoredAdminAuth(): boolean {
  try {
    return localStorage.getItem(STORAGE_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setStoredAdminAuth(isAdmin: boolean): void {
  try {
    if (isAdmin) {
      localStorage.setItem(STORAGE_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  } catch {
    // no-op
  }
}
