export interface PreviewComment {
  id: string;
  authorName: string;
  authorEmail?: string;
  timestampTag?: string; // e.g. "00:14"
  rating?: number;
  text: string;
  createdAt: string;
  isAdminReply?: boolean;
}

export interface PreviewItem {
  id: string;
  title: string;
  description: string;
  category: 'Shorts & Reels' | 'YouTube & Long-form' | 'Commercial & Ads' | 'Music Video' | 'Documentary' | 'Color Grade';
  videoUrl?: string;
  thumbnailUrl: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '4:3' | '1:1';
  createdAt: string;
  premiereFeatures: string[];
  startingPrice: number;
  viewsCount: number;
  likesCount: number;
  comments: PreviewComment[];
  isCustomUpload?: boolean;
}

export interface HireInquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  budget: number; // 3 to 1000
  deadline: string;
  projectLink: string;
  brief: string;
  status: 'New' | 'In Discussion' | 'In Progress' | 'Completed' | 'Archived';
  createdAt: string;
}

export interface AdminAuthState {
  isAdmin: boolean;
  adminEmail: string;
}
