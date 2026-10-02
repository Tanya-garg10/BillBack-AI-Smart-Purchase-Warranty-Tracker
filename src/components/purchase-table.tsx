import React from 'react';
import { PurchaseItem } from '../types';
import { StatusBadge } from './status-badge';
import { ArrowUpRight, Package, ArrowRight } from 'lucide-react';

interface PurchaseTableProps {
  purchases: PurchaseItem[];
  onSelectPurchase: (id: string) => void;
  maxItems?: number;
}

export const PurchaseTable: React.FC<PurchaseTableProps> = ({
  purchases,
  onSelectPurchase,
  maxItems,
}) => {
  const displayItems = maxItems ? purchases.slice(0, maxItems) : purchases;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getSellerDot = (seller: string) => {
    if (seller.toLowerCase().includes('amazon')) return 'bg-amber-400';
    if (seller.toLowerCase().includes('apple')) return 'bg-[#B7F36B]';
    if (seller.toLowerCase().includes('flipkart')) return 'bg-blue-400';
    return 'bg-emerald-400';
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/8 bg-[#17251F] shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/8 bg-white/4 text-[#A6AAA1] font-mono tracking-wider uppercase text-[11px]">
              <th className="py-3.5 px-5">Product</th>
              <th className="py-3.5 px-4">Merchant</th>
              <th className="py-3.5 px-4">Purchased</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4">Return Window</th>
              <th className="py-3.5 px-4">Warranty</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {displayItems.map((item) => (
              <tr
                key={item.id}
                id={`purchase-row-${item.id}`}
                onClick={() => onSelectPurchase(item.id)}
                className="hover:bg-white/4 transition-colors cursor-pointer group"
              >
                {/* Product Name & Category */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-[#B7F36B] flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] transition-colors block text-sm">
                        {item.productName}
                      </span>
                      <span className="text-[11px] text-[#A6AAA1] font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Seller */}
                <td className="py-4 px-4 font-medium text-[#F4F1E8]">
                  <span className="inline-flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${getSellerDot(item.seller)}`} />
                    <span>{item.seller}</span>
                  </span>
                </td>

                {/* Purchase Date */}
                <td className="py-4 px-4 text-[#A6AAA1] font-mono text-xs whitespace-nowrap">
                  {item.purchaseDate}
                </td>

                {/* Price */}
                <td className="py-4 px-4 text-right font-extrabold text-[#F4F1E8] tabular-nums whitespace-nowrap text-sm">
                  {formatPrice(item.purchasePrice)}
                </td>

                {/* Return Status */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <StatusBadge
                    type="return"
                    urgency={item.returnWindow.urgency}
                    text={item.returnWindow.statusText}
                    size="sm"
                  />
                </td>

                {/* Warranty Status */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <StatusBadge
                    type="warranty"
                    urgency={item.warranty.urgency}
                    text={item.warranty.statusText}
                    size="sm"
                  />
                </td>

                {/* Action View */}
                <td className="py-4 px-5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPurchase(item.id);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#F4F1E8] bg-white/6 group-hover:bg-[#B7F36B] group-hover:text-[#101310] rounded-lg transition-all shadow-xs"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
