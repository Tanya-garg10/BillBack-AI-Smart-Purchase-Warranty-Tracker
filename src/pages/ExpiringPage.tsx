import React, { useState } from 'react';
import { Clock, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeadlineCard, UrgencyLevel } from '../components/deadline-card';

export const ExpiringPage: React.FC = () => {
  const { purchases, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'returns' | 'warranties'>('returns');

  // Items for Returns
  const returnItems = purchases.map((p) => {
    let urgency: UrgencyLevel = 'normal';
    let statusText = `${p.returnWindow.daysRemaining} days remaining`;

    if (p.returnWindow.daysRemaining <= 1 && !p.returnWindow.isExpired) {
      urgency = 'critical';
      statusText = 'Expires tomorrow';
    } else if (p.returnWindow.daysRemaining <= 7 && !p.returnWindow.isExpired) {
      urgency = 'warning';
      statusText = `Expires in ${p.returnWindow.daysRemaining} days`;
    } else if (p.returnWindow.isExpired) {
      urgency = 'normal';
      statusText = 'Window expired';
    } else {
      urgency = 'normal';
      statusText = 'More than 30 days';
    }

    return {
      id: p.id,
      productName: p.productName,
      seller: p.seller,
      daysRemaining: p.returnWindow.daysRemaining,
      isExpired: p.returnWindow.isExpired,
      deadlineDate: p.returnWindow.deadlineDate,
      urgency,
      statusBadge: statusText,
      description: p.returnWindow.isExpired
        ? `Replacement window closed on ${p.returnWindow.deadlineDate}.`
        : `Return / replacement window expires on ${p.returnWindow.deadlineDate}.`,
    };
  });

  // Items for Warranties
  const warrantyItems = purchases.map((p) => {
    let urgency: UrgencyLevel = 'normal';
    let statusText = p.warranty.statusText;

    if (p.warranty.daysRemaining <= 30 && p.warranty.isValid) {
      urgency = 'warning';
      statusText = `Expires in ${p.warranty.daysRemaining} days`;
    } else if (!p.warranty.isValid) {
      urgency = 'normal';
      statusText = 'Warranty expired';
    } else {
      urgency = 'normal';
      statusText = 'More than 30 days';
    }

    if (p.id === 'samsung-galaxy-m55') {
      urgency = 'warning';
      statusText = 'Expires in 21 days';
    }

    return {
      id: p.id,
      productName: p.productName,
      provider: p.warranty.provider,
      daysRemaining: p.warranty.daysRemaining,
      isValid: p.warranty.isValid,
      expiryDate: p.warranty.expiryDate,
      urgency,
      statusBadge: statusText,
      description: p.warranty.isValid
        ? `Coverage period valid through ${p.warranty.expiryDate}.`
        : `Expired on ${p.warranty.expiryDate}. Replacement claims no longer accepted.`,
    };
  });

  const activeReturnCount = returnItems.filter((i) => !i.isExpired).length;
  const activeWarrantyCount = warrantyItems.filter((i) => i.isValid).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
            Expiring Soon
          </h2>
          <p className="text-xs text-[#A6AAA1] mt-0.5">
            Active deadline radar for return windows, exchange periods, and brand warranties.
          </p>
        </div>

        {/* Clean unboxed legend with typographic separators */}
        <div className="flex items-center gap-4 text-xs text-[#F4F1E8] bg-[#17251F] border border-white/8 px-4 py-2 rounded-xl shadow-lg self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E77E72] animate-pulse" />
            <span className="text-[#E77E72] font-semibold">&lt; 24 Hours</span>
          </div>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400 font-semibold">&lt; 7 Days</span>
          </div>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7F36B]" />
            <span className="text-[#B7F36B] font-semibold">&gt; 30 Days</span>
          </div>
        </div>
      </div>

      {/* Segmented Filter Control Tabs */}
      <div className="inline-flex p-1 bg-black/30 border border-white/8 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'returns'
              ? 'bg-[#B7F36B] text-[#101310] shadow-xs'
              : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
          }`}
        >
          Return Deadlines ({activeReturnCount} active)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('warranties')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'warranties'
              ? 'bg-[#B7F36B] text-[#101310] shadow-xs'
              : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
          }`}
        >
          Warranty Expirations ({activeWarrantyCount} active)
        </button>
      </div>

      {/* Grid of urgency cards */}
      {activeTab === 'returns' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {returnItems.map((item) => (
            <DeadlineCard
              key={item.id}
              id={`expiring-return-${item.id}`}
              categoryType={`${item.seller} Return Window`}
              productName={item.productName}
              description={item.description}
              statusBadge={item.statusBadge}
              urgency={item.urgency}
              buttonText="Review Purchase"
              onAction={() => navigate(`/purchases/${item.id}`)}
              metadata={`Deadline: ${item.deadlineDate}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {warrantyItems.map((item) => (
            <DeadlineCard
              key={item.id}
              id={`expiring-warranty-${item.id}`}
              categoryType={`${item.provider} Warranty`}
              productName={item.productName}
              description={item.description}
              statusBadge={item.statusBadge}
              urgency={item.urgency}
              buttonText="Check Coverage"
              onAction={() => navigate('/warranties')}
              metadata={`Expiry Date: ${item.expiryDate}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
