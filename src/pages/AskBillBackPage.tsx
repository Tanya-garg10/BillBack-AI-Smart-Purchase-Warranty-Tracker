import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Package,
  ArrowRight,
  RefreshCw,
  CornerDownLeft,
  Bot,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  structuredResults?: Array<{
    title: string;
    subtitle: string;
    tagText: string;
    tagColor: 'green' | 'amber' | 'blue' | 'purple';
    price?: string;
    purchaseId?: string;
    actionLabel?: string;
  }>;
}

export const AskBillBackPage: React.FC = () => {
  const { purchases, navigate, showToast } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    'Which products are still under warranty?',
    'What is my next return deadline?',
    'Show my latest purchases.',
    'Find my invoice from a specific seller.',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: 'Hi Tanya! I can help you find purchase details, check warranties, and track important deadlines.',
      structuredResults: [
        {
          title: 'Sony WH-CH720N',
          subtitle: 'Amazon · Return closes tomorrow',
          tagText: 'Return: 1 day left',
          tagColor: 'amber',
          price: '₹4,999',
          purchaseId: 'sony-wh-ch720n',
          actionLabel: 'View Purchase',
        },
        {
          title: 'Samsung Galaxy M55',
          subtitle: 'Amazon · 21 days warranty remaining',
          tagText: 'Warranty Active',
          tagColor: 'green',
          price: '₹24,999',
          purchaseId: 'samsung-galaxy-m55',
          actionLabel: 'View Warranty',
        },
      ],
    },
  ]);

  const handleQuerySubmit = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: questionText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      const lower = questionText.toLowerCase();

      if (lower.includes('warranty') || lower.includes('warranties')) {
        const activeWarranties = purchases.filter((p) => p.warranty.isValid);
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `You have ${activeWarranties.length} products currently protected under manufacturer warranties. Here are the top items:`,
          structuredResults: activeWarranties.slice(0, 3).map((p) => ({
            title: p.productName,
            subtitle: `${p.warranty.provider} · Valid through ${p.warranty.expiryDate}`,
            tagText: p.warranty.statusText,
            tagColor: p.warranty.daysRemaining <= 30 ? 'amber' : 'green',
            price: `₹${p.purchasePrice.toLocaleString('en-IN')}`,
            purchaseId: p.id,
            actionLabel: 'Open Details',
          })),
        };
      } else if (lower.includes('return') || lower.includes('deadline')) {
        const activeReturns = purchases.filter((p) => !p.returnWindow.isExpired);
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Your closest return deadline is for the Sony WH-CH720N headphones on Amazon. The window closes tomorrow!`,
          structuredResults: [
            {
              title: 'Sony WH-CH720N',
              subtitle: 'Amazon 7-Day Replacement Policy closes tomorrow',
              tagText: 'Critical · 1 day left',
              tagColor: 'amber',
              price: '₹4,999',
              purchaseId: 'sony-wh-ch720n',
              actionLabel: 'Check Return Window',
            },
            {
              title: 'Logitech MX Master 3S',
              subtitle: 'Return closes on 25 Sep 2026',
              tagText: '5 days left',
              tagColor: 'amber',
              price: '₹8,995',
              purchaseId: 'logitech-mx-master-3s',
              actionLabel: 'Review',
            },
          ],
        };
      } else if (lower.includes('seller') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('apple')) {
        const matchingSeller = lower.includes('apple')
          ? 'Apple'
          : lower.includes('flipkart')
          ? 'Flipkart'
          : 'Amazon';
        const sellerItems = purchases.filter((p) => p.seller.toLowerCase().includes(matchingSeller.toLowerCase()));
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `I found ${sellerItems.length} indexed purchases from ${matchingSeller}:`,
          structuredResults: sellerItems.slice(0, 3).map((p) => ({
            title: p.productName,
            subtitle: `Purchased on ${p.purchaseDate} · Order #${p.orderId.slice(0, 16)}`,
            tagText: `Invoice Attached`,
            tagColor: 'blue',
            price: `₹${p.purchasePrice.toLocaleString('en-IN')}`,
            purchaseId: p.id,
            actionLabel: 'View Invoice',
          })),
        };
      } else {
        // Latest purchases
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Here are your most recently added purchases with active protection tracking:`,
          structuredResults: purchases.slice(0, 3).map((p) => ({
            title: p.productName,
            subtitle: `${p.seller} · ${p.purchaseDate}`,
            tagText: p.warranty.statusText,
            tagColor: 'blue',
            price: `₹${p.purchasePrice.toLocaleString('en-IN')}`,
            purchaseId: p.id,
            actionLabel: 'View Record',
          })),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B7F36B]">
            Conversational Intelligence
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
          Ask BillBack
        </h2>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Natural language purchase queries, warranty checks, and instant deadline lookups.
        </p>
      </div>

      {/* Suggested Questions Grid */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#A6AAA1] font-mono">Quick suggestions:</span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleQuerySubmit(q)}
            className="text-xs font-medium text-[#F4F1E8] bg-[#17251F] hover:bg-[#1f332a] hover:text-[#B7F36B] border border-white/10 hover:border-[#B7F36B]/40 px-3 py-1.5 rounded-xl transition-all shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl shadow-xl p-4 sm:p-6 min-h-[480px] flex flex-col justify-between">
        {/* Messages List */}
        <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#B7F36B] text-[#101310] flex items-center justify-center flex-shrink-0 shadow-xs font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#B7F36B] text-[#101310] rounded-2xl rounded-tr-xs p-4 text-xs sm:text-sm font-semibold shadow-xs'
                    : 'bg-black/30 border border-white/8 rounded-2xl rounded-tl-xs p-4 sm:p-5 text-xs sm:text-sm text-[#F4F1E8]'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>

                {/* Structured Cards inside assistant response */}
                {msg.structuredResults && msg.structuredResults.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {msg.structuredResults.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#17251F] border border-white/10 rounded-xl p-3.5 shadow-sm flex flex-col justify-between text-xs hover:border-[#B7F36B]/40 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                item.tagColor === 'green'
                                  ? 'bg-[#B7F36B]/15 text-[#B7F36B] border border-[#B7F36B]/30'
                                  : item.tagColor === 'amber'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                  : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              }`}
                            >
                              {item.tagText}
                            </span>
                            {item.price && (
                              <span className="font-extrabold text-[#F4F1E8] tabular-nums">
                                {item.price}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] transition-colors line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#A6AAA1] mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>

                        {item.purchaseId && (
                          <div className="pt-2 mt-2 border-t border-white/8 flex justify-end">
                            <button
                              type="button"
                              onClick={() => navigate(`/purchases/${item.purchaseId}`)}
                              className="text-xs font-semibold text-[#B7F36B] hover:text-[#c5f784] flex items-center gap-1 transition-colors"
                            >
                              <span>{item.actionLabel || 'View Record'}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-[#F4F1E8] flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs">
                  TG
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B7F36B] text-[#101310] flex items-center justify-center flex-shrink-0 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-black/30 border border-white/8 rounded-2xl rounded-tl-xs p-3.5 text-xs text-[#A6AAA1] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#B7F36B] animate-spin" />
                <span>Searching purchase records & policies...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuerySubmit(inputQuery);
          }}
          className="mt-4 pt-3 border-t border-white/8 relative"
        >
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#A6AAA1] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about your purchases, warranties, or return deadlines..."
              className="w-full pl-11 pr-24 py-3 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="absolute right-2 px-3.5 py-1.5 bg-[#B7F36B] hover:bg-[#c5f784] disabled:opacity-50 text-[#101310] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Ask</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
