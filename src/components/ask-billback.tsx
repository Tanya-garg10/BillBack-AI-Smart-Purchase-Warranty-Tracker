import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, CornerDownLeft, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { ASK_BILLBACK_SUGGESTIONS, ASK_BILLBACK_RESPONSES } from '../lib/mock-data';

export const AskBillBack: React.FC<{ onNavigateToPurchase?: (id: string) => void }> = ({
  onNavigateToPurchase,
}) => {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState<string | null>(
    'Which products are still under warranty?'
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsSearching(true);
    setTimeout(() => {
      setActiveQuery(suggestion);
      setIsSearching(false);
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const match =
      ASK_BILLBACK_SUGGESTIONS.find(
        (s) =>
          s.toLowerCase().includes(query.toLowerCase()) ||
          query.toLowerCase().includes(s.toLowerCase())
      ) || 'Which products are still under warranty?';

    setIsSearching(true);
    setTimeout(() => {
      setActiveQuery(match);
      setIsSearching(false);
    }, 350);
  };

  const responseData = activeQuery ? ASK_BILLBACK_RESPONSES[activeQuery] : null;

  return (
    <div
      id="ask-billback-section"
      className="relative bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg overflow-hidden"
    >
      {/* Ambient background illumination */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#B7F36B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B] shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F1E8] tracking-tight flex items-center gap-2">
              <span>Ask BillBack AI</span>
            </h3>
            <p className="text-xs text-[#A6AAA1]">
              Instant answers across all invoices, return policies, and warranty contracts.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-[#B7F36B] font-mono self-start sm:self-auto">
          <Zap className="w-3.5 h-3.5 text-[#B7F36B]" />
          <span>Real-time Semantic Search</span>
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="relative mb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#A6AAA1] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything (e.g. Which items expire soon? What did I spend on electronics?)"
            className="w-full pl-11 pr-24 py-3.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 px-3.5 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Ask</span>
            <CornerDownLeft className="w-3 h-3 text-[#101310]" />
          </button>
        </div>
      </form>

      {/* Interactive prompt tabs (segmented controls) */}
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <span className="text-[11px] text-[#A6AAA1] font-mono mr-1">Suggested:</span>
        {ASK_BILLBACK_SUGGESTIONS.map((suggestion) => {
          const isSelected = activeQuery === suggestion;
          return (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#B7F36B] text-[#101310] border-[#B7F36B] font-bold shadow-xs'
                  : 'bg-white/5 text-[#A6AAA1] border-white/8 hover:border-white/20 hover:text-[#F4F1E8]'
              }`}
            >
              {suggestion}
            </button>
          );
        })}
      </div>

      {/* AI Response Display */}
      {isSearching ? (
        <div className="bg-black/30 border border-white/8 rounded-xl p-6 flex items-center justify-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-[#B7F36B] border-t-transparent animate-spin" />
          <span className="text-xs text-[#A6AAA1] font-medium">
            Scanning DynamoDB purchase index & computing warranty deadlines...
          </span>
        </div>
      ) : responseData ? (
        <div className="bg-black/30 border border-white/8 rounded-xl p-5 shadow-lg transition-all">
          <div className="flex items-start gap-3 mb-3.5">
            <div className="w-6 h-6 rounded-lg bg-[#B7F36B] text-[#101310] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A6AAA1] uppercase tracking-wider block mb-0.5">
                Answer Summary
              </span>
              <p className="text-sm font-bold text-[#F4F1E8] leading-snug">
                {responseData.answer}
              </p>
            </div>
          </div>

          {/* Results list */}
          <div className="divide-y divide-white/6 bg-[#17251F] rounded-xl border border-white/8 mb-3 overflow-hidden shadow-xs">
            {responseData.items.map((item, index) => (
              <div
                key={index}
                className="py-3 px-4 flex items-center justify-between text-xs hover:bg-white/4 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.statusType === 'green'
                        ? 'bg-[#B7F36B]'
                        : item.statusType === 'amber'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <span className="font-semibold text-[#F4F1E8]">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold text-xs ${
                      item.statusType === 'green'
                        ? 'text-[#B7F36B]'
                        : item.statusType === 'amber'
                        ? 'text-amber-400'
                        : 'text-blue-300'
                    }`}
                  >
                    {item.detail}
                  </span>
                  {onNavigateToPurchase && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        onNavigateToPurchase(targetId);
                      }}
                      className="text-[#A6AAA1] hover:text-[#B7F36B] transition-colors"
                      title="View details"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#A6AAA1] pt-1 font-mono">
            <span>{responseData.countNote}</span>
            <span>Verified from Ledger</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
