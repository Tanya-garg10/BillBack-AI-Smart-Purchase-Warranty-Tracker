import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'neutral' | 'warning' | 'success' | 'blue';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeVariant = 'neutral',
  onClick,
}) => {
  const accentStyles = {
    neutral: {
      iconBg: 'bg-white/5 text-[#F4F1E8] border border-white/10',
      indicator: 'text-[#A6AAA1]',
      dot: 'bg-[#A6AAA1]',
    },
    warning: {
      iconBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
      indicator: 'text-amber-400 font-semibold',
      dot: 'bg-amber-400 animate-pulse',
    },
    success: {
      iconBg: 'bg-[#B7F36B]/15 text-[#B7F36B] border border-[#B7F36B]/30',
      indicator: 'text-[#B7F36B] font-semibold',
      dot: 'bg-[#B7F36B]',
    },
    blue: {
      iconBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
      indicator: 'text-indigo-300 font-semibold',
      dot: 'bg-indigo-400',
    },
  }[badgeVariant];

  return (
    <div
      id={id}
      onClick={onClick}
      className={`group relative bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg hover:border-white/20 transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[#B7F36B]/5' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[11px] font-mono tracking-wider uppercase text-[#A6AAA1]">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${accentStyles.iconBg}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-extrabold tracking-tight text-[#F4F1E8] tabular-nums">
          {value}
        </div>
        {badgeText && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${accentStyles.indicator}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${accentStyles.dot}`} />
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-[#A6AAA1] font-normal leading-relaxed line-clamp-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
