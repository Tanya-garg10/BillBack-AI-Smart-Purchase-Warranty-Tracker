import React from 'react';
import { PurchaseItem } from '../types';
import { StatusBadge } from './status-badge';
import { ArrowRight, FileText, Package } from 'lucide-react';

interface PurchaseCardProps {
  purchase: PurchaseItem;
  onSelect?: () => void;
  onClick?: () => void;
}

export const PurchaseCard: React.FC<PurchaseCardProps> = ({
  purchase,
  onSelect,
  onClick,
}) => {
  const handleClick = onSelect || onClick;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      id={`purchase-card-${purchase.id}`}
      onClick={handleClick}
      className="group bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-[#B7F36B] flex-shrink-0 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A6AAA1] block">
                {purchase.seller}
              </span>
              <h4 className="text-sm font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] transition-colors line-clamp-1">
                {purchase.productName}
              </h4>
            </div>
          </div>
          <span className="text-base font-extrabold text-[#F4F1E8] tabular-nums">
            {formatPrice(purchase.purchasePrice)}
          </span>
        </div>

        {/* Date & Order ID */}
        <div className="flex items-center justify-between text-xs text-[#A6AAA1] mb-3 pb-3 border-b border-white/8">
          <span>{purchase.purchaseDate}</span>
          <span className="font-mono text-[11px] text-[#A6AAA1]/80">
            {purchase.orderId.slice(0, 14)}...
          </span>
        </div>

        {/* Return & Warranty status */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A6AAA1] font-medium">Return Window:</span>
            <StatusBadge
              type="return"
              urgency={purchase.returnWindow.urgency}
              text={purchase.returnWindow.statusText}
              size="sm"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A6AAA1] font-medium">Warranty:</span>
            <StatusBadge
              type="warranty"
              urgency={purchase.warranty.urgency}
              text={purchase.warranty.statusText}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-3 border-t border-white/8 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#A6AAA1] font-mono text-[11px]">
          <FileText className="w-3.5 h-3.5 text-[#A6AAA1]" />
          <span className="truncate max-w-[140px]">{purchase.invoice.fileName}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#B7F36B] group-hover:translate-x-0.5 transition-transform">
          View <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
