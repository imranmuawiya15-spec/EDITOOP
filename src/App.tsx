import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PreviewGrid } from './components/PreviewGrid';
import { PreviewDetailModal } from './components/PreviewDetailModal';
import { HireSection } from './components/HireSection';
import { HireModal } from './components/HireModal';
import { AboutSection } from './components/AboutSection';
import { UploadModal } from './components/UploadModal';
import { AdminInboxModal } from './components/AdminInboxModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AccessGate } from './components/AccessGate';
import { Footer } from './components/Footer';
import {
  PreviewItem,
  HireInquiry,
  PreviewComment,
} from './types';
import {
  getStoredPreviews,
  addPreviewItem,
  deletePreviewItem,
  addCommentToPreview,
  getStoredInquiries,
  addHireInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getStoredAdminAuth,
  setStoredAdminAuth,
} from './services/storage';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('muawiya_has_entered') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getStoredAdminAuth());

  // Data states
  const [previews, setPreviews] = useState<PreviewItem[]>(() => getStoredPreviews());
  const [inquiries, setInquiries] = useState<HireInquiry[]>(() => getStoredInquiries());

  // Modal states
  const [selectedPreview, setSelectedPreview] = useState<PreviewItem | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hireModalBudget, setHireModalBudget] = useState(50);
  const [hireModalPackage, setHireModalPackage] = useState('YouTube & Long-form');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Sync state if selectedPreview gets updated (e.g. comment added)
  useEffect(() => {
    if (selectedPreview) {
      const updated = previews.find(p => p.id === selectedPreview.id);
      if (updated) {
        setSelectedPreview(updated);
      }
    }
  }, [previews]);

  // Access Gate handlers
  const handleEnterAsClient = () => {
    sessionStorage.setItem('muawiya_has_entered', 'true');
    setHasEntered(true);
  };

  const handleAdminLoginSuccess = () => {
    sessionStorage.setItem('muawiya_has_entered', 'true');
    setStoredAdminAuth(true);
    setIsAdmin(true);
    setHasEntered(true);
  };

  const handleAdminLogout = () => {
    setStoredAdminAuth(false);
    setIsAdmin(false);
  };

  // Preview management
  const handleUploadSuccess = (newPreview: PreviewItem) => {
    const updated = addPreviewItem(newPreview);
    setPreviews(updated);
  };

  const handleDeletePreview = (id: string) => {
    const updated = deletePreviewItem(id);
    setPreviews(updated);
  };

  const handleAddComment = (previewId: string, comment: PreviewComment) => {
    const updated = addCommentToPreview(previewId, comment);
    setPreviews(updated);
  };

  // Hire & Inquiries management
  const handleOpenHireModal = (budget: number = 50, pkg: string = 'YouTube & Long-form') => {
    setHireModalBudget(budget);
    setHireModalPackage(pkg);
    setIsHireModalOpen(true);
  };

  const handleSubmitInquiry = (inquiry: HireInquiry) => {
    const updated = addHireInquiry(inquiry);
    setInquiries(updated);
  };

  const handleUpdateInquiryStatus = (id: string, status: HireInquiry['status']) => {
    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
  };

  const unreadInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#0c0d12] text-slate-100 selection:bg-[#7045f2] selection:text-white">
      {/* Initial Access Gate: Sign in before website opens */}
      {!hasEntered && (
        <AccessGate
          onEnterAsClient={handleEnterAsClient}
          onAdminLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {/* Main Website View */}
      <Navbar
        isAdmin={isAdmin}
        unreadInquiriesCount={unreadInquiriesCount}
        onOpenHireModal={() => handleOpenHireModal(75, 'YouTube & Long-form')}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenInboxModal={() => setIsInboxModalOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenHireModal={() => handleOpenHireModal(75, 'YouTube & Long-form')}
          onExplorePreviews={() => {
            const el = document.getElementById('previews');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Video Previews Showcase Grid */}
        <PreviewGrid
          previews={previews}
          isAdmin={isAdmin}
          onSelectPreview={(item) => setSelectedPreview(item)}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onDeletePreview={handleDeletePreview}
        />

        {/* Pricing, $3 - $1000 Estimator & Direct Contact */}
        <HireSection
          onOpenHireModalWithBudget={(budget, pkg) => handleOpenHireModal(budget, pkg)}
        />

        {/* About Muawiya - 1 Year Experience & Adobe Premiere Pro Only */}
        <AboutSection
          onOpenHireModal={() => handleOpenHireModal(75, 'YouTube & Long-form')}
        />
      </main>

      <Footer
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Modals */}
      {selectedPreview && (
        <PreviewDetailModal
          item={selectedPreview}
          isAdmin={isAdmin}
          onClose={() => setSelectedPreview(null)}
          onAddComment={handleAddComment}
          onHireForThisStyle={(styleName, startingPrice) => {
            setSelectedPreview(null);
            handleOpenHireModal(startingPrice, styleName);
          }}
        />
      )}

      {isHireModalOpen && (
        <HireModal
          initialBudget={hireModalBudget}
          initialPackage={hireModalPackage}
          onClose={() => setIsHireModalOpen(false)}
          onSubmitInquiry={handleSubmitInquiry}
        />
      )}

      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {isInboxModalOpen && (
        <AdminInboxModal
          inquiries={inquiries}
          onClose={() => setIsInboxModalOpen(false)}
          onUpdateStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      )}

      {isAdminLoginModalOpen && (
        <AdminLoginModal
          onClose={() => setIsAdminLoginModalOpen(false)}
          onLoginSuccess={() => {
            setStoredAdminAuth(true);
            setIsAdmin(true);
          }}
        />
      )}
    </div>
  );
}
