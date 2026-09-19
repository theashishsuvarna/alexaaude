import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Lock,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { FamilyDocument } from '../../types/family';

interface DocumentsViewProps {
  documents: FamilyDocument[];
  onOpenAssistant: (query?: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents, onOpenAssistant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (title: string) => {
    setDownloadToast(`Decrypting and downloading: "${title}"`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Vault & Credentials</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">256-Bit Hardware Encrypted</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Encrypted Family Document Vault</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Emergency records, passports, appliance warranties, health insurance policies, and property deeds.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Kohli Household KMS</span>
        </div>
      </div>

      {/* Insurance Renewal Notice (from Section 8 Announcements) */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs text-blue-950">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Insurance Renewal:</strong> Star Health Family Comprehensive Policy expires in 24 days (Oct 14, 2026).
          </span>
        </div>
        <button
          onClick={() => onOpenAssistant('What is the procedure to renew our Star Health insurance policy?')}
          className="text-xs font-semibold text-blue-800 hover:underline flex-shrink-0 ml-3"
        >
          Review Renewal
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, tags, certificates..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900"
          />
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'identity', 'insurance', 'warranty', 'medical', 'property'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg capitalize transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">{doc.title}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                    {doc.fileType}
                  </span>
                  {doc.secureLevel === 'vault_encrypted' && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 flex items-center gap-1">
                      <Lock className="h-2.5 w-2.5" />
                      <span>Encrypted</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                  <span>Size: {doc.fileSize}</span>
                  <span>·</span>
                  <span>{doc.lastUpdated}</span>
                  {doc.expiryDate && (
                    <>
                      <span>·</span>
                      <span className="text-slate-700 font-medium">Expires: {doc.expiryDate}</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {doc.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(doc.title)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all self-end sm:self-center shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
