import React from 'react';
import { ArrowRight, AlertCircle, Clock, ShieldCheck, Calendar } from 'lucide-react';

export type UrgencyLevel = 'critical' | 'warning' | 'normal';

interface DeadlineCardProps {
  id: string;
  categoryType: string;
  productName: string;
  description: string;
  statusBadge: string;
  urgency: UrgencyLevel;
  buttonText: string;
  onAction: () => void;
  metadata?: string;
  daysRemaining?: number;
  totalDays?: number;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({
  id,
  categoryType,
  productName,
  description,
  statusBadge,
  urgency,
  buttonText,
  onAction,
  metadata,
}) => {
  const urgencyStyles = {
    critical: {
      border: 'border-[#E77E72]/40 hover:border-[#E77E72]',
      glow: 'from-[#E77E72]/15 to-transparent',
      dot: 'bg-[#E77E72] animate-ping',
      dotBase: 'bg-[#E77E72]',
      badgeText: 'text-[#E77E72] font-bold',
      button: 'bg-[#E77E72] hover:bg-[#d6695d] text-white shadow-xs',
      icon: AlertCircle,
      iconColor: 'text-[#E77E72]',
      progressBg: 'bg-[#E77E72]',
      progressPercent: 90,
    },
    warning: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      glow: 'from-amber-500/10 to-transparent',
      dot: 'bg-amber-400',
      dotBase: 'bg-amber-400',
      badgeText: 'text-amber-400 font-bold',
      button: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-xs',
      icon: Clock,
      iconColor: 'text-amber-400',
      progressBg: 'bg-amber-400',
      progressPercent: 65,
    },
    normal: {
      border: 'border-white/8 hover:border-white/20',
      glow: 'from-[#B7F36B]/10 to-transparent',
      dot: 'bg-[#B7F36B]',
      dotBase: 'bg-[#B7F36B]',
      badgeText: 'text-[#B7F36B] font-semibold',
      button: 'bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] font-bold shadow-xs',
      icon: ShieldCheck,
      iconColor: 'text-[#B7F36B]',
      progressBg: 'bg-[#B7F36B]',
      progressPercent: 25,
    },
  }[urgency];

  return (
    <div
      id={id}
      className={`group relative bg-[#17251F] border ${urgencyStyles.border} rounded-2xl p-5 shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Subtle corner light tint */}
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${urgencyStyles.glow} blur-xl pointer-events-none`}
      />

      <div>
        {/* Top Header Row with zero-pill unboxed status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A6AAA1] flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {urgency === 'critical' && (
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${urgencyStyles.dot}`} />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${urgencyStyles.dotBase}`} />
            </span>
            <span>{categoryType}</span>
          </span>

          <span className={`text-xs ${urgencyStyles.badgeText}`}>
            {statusBadge}
          </span>
        </div>

        {/* Product Name */}
        <h4 className="text-base font-bold text-[#F4F1E8] mb-1.5 group-hover:text-[#B7F36B] transition-colors line-clamp-1">
          {productName}
        </h4>

        {/* Description */}
        <p className="text-xs text-[#A6AAA1] leading-relaxed mb-4">
          {description}
        </p>

        {/* Progress Countdown Bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${urgencyStyles.progressBg}`}
              style={{ width: `${urgencyStyles.progressPercent}%` }}
            />
          </div>
        </div>

        {metadata && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#A6AAA1] font-mono mb-4">
            <Calendar className="w-3 h-3 text-[#A6AAA1]" />
            <span className="truncate">{metadata}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-white/8 flex items-center justify-between">
        <button
          type="button"
          onClick={onAction}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group-hover:scale-[1.01] ${urgencyStyles.button}`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
