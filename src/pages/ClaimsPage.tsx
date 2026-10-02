import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  FileText,
  Building,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/status-badge';
import { MOCK_CLAIMS } from '../lib/mock-data';

export const ClaimsPage: React.FC = () => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'in_progress' | 'completed'>('all');

  const readyClaims = MOCK_CLAIMS.filter((c) => c.status === 'ready');
  const inProgressClaims = MOCK_CLAIMS.filter((c) => c.status === 'in_progress');
  const completedClaims = MOCK_CLAIMS.filter((c) => c.status === 'completed');

  const filteredClaims = MOCK_CLAIMS.filter((c) => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
            Warranty Claims & Dossiers
          </h2>
          <p className="text-xs text-[#A6AAA1] mt-0.5">
            Pre-assembled claim packages, official service tickets, and resolution records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/warranties')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-md shadow-[#B7F36B]/20 transition-all self-start sm:self-auto hover:scale-[1.01]"
        >
          <Shield className="w-4 h-4" />
          <span>New Claim from Vault</span>
        </button>
      </div>

      {/* 3 Status Summary Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('ready')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'ready'
              ? 'bg-[#17251F] border-[#B7F36B]/60 ring-2 ring-[#B7F36B]/20 shadow-lg'
              : 'bg-[#17251F] border-white/8 hover:border-white/20 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
              Ready to Claim
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] mb-1 tabular-nums">
            {readyClaims.length}
          </div>
          <p className="text-xs text-[#A6AAA1]">
            Dossier compiled with verified tax invoice
          </p>
        </div>

        <div
          onClick={() => setActiveTab('in_progress')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'in_progress'
              ? 'bg-[#17251F] border-amber-500/60 ring-2 ring-amber-500/20 shadow-lg'
              : 'bg-[#17251F] border-white/8 hover:border-white/20 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] mb-1 tabular-nums">
            {inProgressClaims.length}
          </div>
          <p className="text-xs text-[#A6AAA1]">
            Active with authorized service center
          </p>
        </div>

        <div
          onClick={() => setActiveTab('completed')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-[#17251F] border-[#B7F36B]/60 ring-2 ring-[#B7F36B]/20 shadow-lg'
              : 'bg-[#17251F] border-white/8 hover:border-white/20 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
              Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] mb-1 tabular-nums">
            {completedClaims.length}
          </div>
          <p className="text-xs text-[#A6AAA1]">
            Hardware replacement or free repair fulfilled
          </p>
        </div>
      </div>

      {/* Segmented Filter Control */}
      <div className="inline-flex p-1 bg-black/30 border border-white/8 rounded-xl">
        {(['all', 'ready', 'in_progress', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#B7F36B] text-[#101310] shadow-xs'
                : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
            }`}
          >
            {tab === 'all'
              ? 'All Claims'
              : tab === 'ready'
              ? 'Ready to Claim'
              : tab === 'in_progress'
              ? 'In Progress'
              : 'Completed'}
          </button>
        ))}
      </div>

      {/* Claim History List */}
      <div className="space-y-4">
        {filteredClaims.map((claim) => (
          <div
            key={claim.id}
            id={`claim-card-${claim.id}`}
            className="group bg-[#17251F] border border-white/8 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#B7F36B]">
                  {claim.id}
                </span>
                <span className="text-white/20">·</span>
                <StatusBadge
                  type="claim"
                  claimStatus={claim.status}
                  text={
                    claim.status === 'ready'
                      ? 'Ready to Claim'
                      : claim.status === 'in_progress'
                      ? 'In Progress'
                      : 'Completed'
                  }
                  size="sm"
                />
                <span className="text-xs text-[#A6AAA1] font-mono hidden sm:inline">
                  · Claim Date: {claim.claimDate}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] transition-colors">
                {claim.productName}
              </h3>

              <p className="text-xs text-[#A6AAA1] leading-relaxed">
                {claim.issueDescription}
              </p>

              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A6AAA1] pt-1">
                <span>Provider: <strong className="text-[#F4F1E8] font-medium">{claim.warrantyProvider}</strong></span>
                <span className="text-white/20">·</span>
                <span>Purchased: {claim.purchaseDate} ({claim.seller})</span>
                {claim.ticketNumber && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="font-mono text-[#B7F36B] font-semibold">
                      Ticket #{claim.ticketNumber}
                    </span>
                  </>
                )}
                {claim.amountCovered && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-[#B7F36B] font-bold tabular-nums">
                      Covered: ₹{claim.amountCovered.toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => navigate(`/claims/${claim.purchaseId}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-xs transition-colors hover:scale-[1.01]"
              >
                <span>View Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
