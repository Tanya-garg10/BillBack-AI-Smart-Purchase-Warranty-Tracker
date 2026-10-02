import React from 'react';
import { ReturnUrgency, WarrantyUrgency, ClaimStatus } from '../types';
import { Clock, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  type: 'return' | 'warranty' | 'claim';
  urgency?: ReturnUrgency | WarrantyUrgency;
  claimStatus?: ClaimStatus;
  text: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  urgency,
  claimStatus,
  text,
  size = 'md',
}) => {
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-xs';

  if (type === 'return') {
    if (urgency === 'critical') {
      return (
        <span
          id="badge-return-critical"
          className={`inline-flex items-center gap-1.5 font-medium text-[#E77E72] ${textSize}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E77E72] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E77E72]" />
          </span>
          <span>{text}</span>
        </span>
      );
    }
    if (urgency === 'warning') {
      return (
        <span
          id="badge-return-warning"
          className={`inline-flex items-center gap-1.5 font-medium text-[#B8A27B] ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A27B]" />
          <span>{text}</span>
        </span>
      );
    }
    if (urgency === 'expired') {
      return (
        <span
          id="badge-return-expired"
          className={`inline-flex items-center gap-1.5 font-medium text-[#A6AAA1]/70 ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6AAA1]/50" />
          <span>{text}</span>
        </span>
      );
    }
    return (
      <span
        id="badge-return-normal"
        className={`inline-flex items-center gap-1.5 font-medium text-[#A6AAA1] ${textSize}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
        <span>{text}</span>
      </span>
    );
  }

  if (type === 'warranty') {
    if (urgency === 'expiring_soon') {
      return (
        <span
          id="badge-warranty-warning"
          className={`inline-flex items-center gap-1.5 font-medium text-[#B8A27B] ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A27B]" />
          <span>{text}</span>
        </span>
      );
    }
    if (urgency === 'expired') {
      return (
        <span
          id="badge-warranty-expired"
          className={`inline-flex items-center gap-1.5 font-medium text-[#A6AAA1]/70 ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6AAA1]/50" />
          <span>{text}</span>
        </span>
      );
    }
    return (
      <span
        id="badge-warranty-active"
        className={`inline-flex items-center gap-1.5 font-medium text-[#B7F36B] ${textSize}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
        <span>{text}</span>
      </span>
    );
  }

  if (type === 'claim') {
    if (claimStatus === 'ready') {
      return (
        <span
          id="badge-claim-ready"
          className={`inline-flex items-center gap-1.5 font-medium text-[#B7F36B] ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
          <span>{text || 'Ready to Claim'}</span>
        </span>
      );
    }
    if (claimStatus === 'in_progress') {
      return (
        <span
          id="badge-claim-progress"
          className={`inline-flex items-center gap-1.5 font-medium text-[#B8A27B] ${textSize}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A27B] animate-pulse" />
          <span>{text || 'In Progress'}</span>
        </span>
      );
    }
    if (claimStatus === 'completed') {
      return (
        <span
          id="badge-claim-completed"
          className={`inline-flex items-center gap-1.5 font-medium text-[#B7F36B] ${textSize}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F36B]" />
          <span>{text || 'Resolved'}</span>
        </span>
      );
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[#A6AAA1] ${textSize}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#A6AAA1]/50" />
      <span>{text}</span>
    </span>
  );
};
