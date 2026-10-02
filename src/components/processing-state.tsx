import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, FileText, ScanText, ShieldCheck, BookmarkCheck } from 'lucide-react';

interface ProcessingStateProps {
  onComplete: () => void;
}

interface StepInfo {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TIMELINE_STEPS: StepInfo[] = [
  {
    title: 'Reading invoice',
    subtitle: 'Decryption and optical document scanning',
    icon: FileText,
  },
  {
    title: 'Extracting purchase details',
    subtitle: 'Parsing merchant, price, date, and order number',
    icon: ScanText,
  },
  {
    title: 'Identifying warranty information',
    subtitle: 'Matching product category coverage and return window',
    icon: ShieldCheck,
  },
  {
    title: 'Preparing your purchase record',
    subtitle: 'Assembling structured record for portfolio ledger',
    icon: BookmarkCheck,
  },
];

export const ProcessingState: React.FC<ProcessingStateProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < TIMELINE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 550);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B] mx-auto shadow-xs">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#F4F1E8]">
          AI Analysis in Progress
        </h3>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Extracting purchase details, return policies, and warranty terms...
        </p>
      </div>

      {/* Sequential Steps List */}
      <div className="space-y-3 text-left max-w-lg mx-auto pt-2">
        {TIMELINE_STEPS.map((step, idx) => {
          const isDone = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.title}
              className={`p-3.5 rounded-xl border transition-all duration-300 ${
                isDone
                  ? 'bg-black/30 border-white/10 opacity-100'
                  : isCurrent
                  ? 'bg-[#B7F36B]/10 border-[#B7F36B]/30 opacity-100 shadow-sm'
                  : 'bg-black/10 border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#B7F36B]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#B7F36B] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-[#A6AAA1] font-mono">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold truncate ${
                        isDone ? 'text-[#F4F1E8]' : 'text-[#A6AAA1]'
                      }`}
                    >
                      {step.title}
                    </span>
                    {isDone && (
                      <span className="text-[10px] text-[#B7F36B] font-semibold font-mono">Done</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#A6AAA1] mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
