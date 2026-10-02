import React from 'react';
import { Shield, FileCheck, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { PurchaseItem } from '../types';
import { StatusBadge } from './status-badge';

interface WarrantyCardProps {
  purchase: PurchaseItem;
  onView: () => void;
  onStartClaim: () => void;
}

export const WarrantyCard: React.FC<WarrantyCardProps> = ({
  purchase,
  onView,
  onStartClaim,
}) => {
  const { warranty, productName, seller } = purchase;

  return (
    <div
      id={`warranty-card-${purchase.id}`}
      className="group bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B7F36B] block mb-1">
              {seller} · {purchase.category}
            </span>
            <h4 className="text-base font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] transition-colors line-clamp-1">
              {productName}
            </h4>
          </div>
          <StatusBadge
            type="warranty"
            urgency={warranty.urgency}
            text={warranty.statusText}
          />
        </div>

        {/* Provider & Coverage */}
        <div className="p-3.5 bg-black/20 border border-white/8 rounded-xl mb-4 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#F4F1E8]">
            <span className="text-[#A6AAA1] font-medium">Provider</span>
            <span className="font-semibold text-[#F4F1E8] text-right">{warranty.provider}</span>
          </div>
          <div className="flex items-center justify-between text-[#F4F1E8]">
            <span className="text-[#A6AAA1] font-medium">Coverage</span>
            <span className="font-semibold text-[#F4F1E8]">{warranty.coveragePeriod}</span>
          </div>
          <div className="flex items-center justify-between text-[#F4F1E8]">
            <span className="text-[#A6AAA1] font-medium">Valid Dates</span>
            <span className="font-mono text-[#A6AAA1] text-[11px]">
              {warranty.startDate} – {warranty.expiryDate}
            </span>
          </div>
        </div>

        {/* Invoice Status */}
        <div className="flex items-center justify-between text-xs text-[#A6AAA1] mb-4 pb-3 border-b border-white/8">
          <div className="flex items-center gap-1.5 text-[#B7F36B] font-semibold text-[11px]">
            <FileCheck className="w-3.5 h-3.5 text-[#B7F36B]" />
            <span className="truncate max-w-[150px]">Invoice Attached</span>
          </div>
          {warranty.serialNumber && (
            <span className="font-mono text-[11px] text-[#A6AAA1]">
              {warranty.serialNumber}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onView}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2.5 border border-white/10 hover:bg-white/5 text-[#F4F1E8] rounded-xl text-xs font-bold transition-colors"
        >
          <span>Record</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onStartClaim}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-[#101310]" />
          <span>Claim Pack</span>
        </button>
      </div>
    </div>
  );
};
