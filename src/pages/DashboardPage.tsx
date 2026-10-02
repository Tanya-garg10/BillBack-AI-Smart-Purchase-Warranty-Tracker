import React, { useState } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  ClockAlert,
  FileCheck2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Package,
  Calendar,
  ExternalLink,
  ChevronRight,
  Search,
  CornerDownLeft,
  Shield,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/stat-card';
import { PurchaseTable } from '../components/purchase-table';

export const DashboardPage: React.FC = () => {
  const { purchases, navigate, showToast } = useApp();
  const [askQuery, setAskQuery] = useState('');

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handlePromptClick = (promptText: string) => {
    navigate('/ask-billback');
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      navigate('/ask-billback');
    }
  };

  // Monthly spending breakdown data for minimal spending chart in Purchase Insights
  const miniChartData = [
    { month: 'May', height: '40%' },
    { month: 'Jun', height: '55%' },
    { month: 'Jul', height: '65%' },
    { month: 'Aug', height: '50%' },
    { month: 'Sep', height: '90%', active: true },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 4 Summary Cards */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="stat-total-purchases"
            title="Total Purchases"
            value={24}
            subtitle="Indexed across Amazon, Apple & Flipkart"
            icon={ShoppingBag}
            badgeText="All tracked"
            badgeVariant="neutral"
            onClick={() => navigate('/purchases')}
          />

          <StatCard
            id="stat-active-warranties"
            title="Active Warranties"
            value={18}
            subtitle="Manufacturer coverage verified"
            icon={ShieldCheck}
            badgeText="18 Active"
            badgeVariant="success"
            onClick={() => navigate('/warranties')}
          />

          <StatCard
            id="stat-returns-ending"
            title="Returns Ending Soon"
            value={3}
            subtitle="Require immediate decision"
            icon={ClockAlert}
            badgeText="3 Approaching"
            badgeVariant="warning"
            onClick={() => navigate('/expiring')}
          />

          <StatCard
            id="stat-potential-claims"
            title="Potential Claims"
            value={2}
            subtitle="Dossiers compiled and ClaimReady"
            icon={FileCheck2}
            badgeText="2 Ready"
            badgeVariant="blue"
            onClick={() => navigate('/claims')}
          />
        </div>
      </section>

      {/* Main Dashboard Grid: Left (Upcoming Actions) & Right (Purchase Insights) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section (7 cols): Upcoming Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F4F1E8] tracking-tight">
                Upcoming Actions
              </h2>
              <p className="text-xs text-[#A6AAA1]">
                Deadlines and replacement windows needing attention.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/expiring')}
              className="text-xs font-semibold text-[#B7F36B] hover:text-[#c5f784] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Action 1: Sony WH-CH720N — Return window closes in 2 days (warm amber/soft red alert) */}
            <div className="bg-[#17251F] border border-amber-500/30 rounded-2xl p-5 shadow-lg hover:border-amber-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Amazon Return Window
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Closes in 2 days
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F4F1E8]">
                    Sony WH-CH720N
                  </h4>
                  <p className="text-xs text-[#A6AAA1]">
                    7-Day replacement window closes on 19 Sep 2026. Verify audio and mic function.
                  </p>

                  {/* Progress bar countdown */}
                  <div className="w-full max-w-xs pt-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[80%]" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/purchases/sony-wh-ch720n')}
                className="px-3.5 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs self-end sm:self-center"
              >
                Review Purchase
              </button>
            </div>

            {/* Action 2: Samsung Monitor — Warranty expires in 8 months */}
            <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B] font-bold flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#B7F36B] uppercase tracking-wider">
                      Samsung Care Protection
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-semibold text-[#B7F36B] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
                      Expires in 8 months
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F4F1E8]">
                    Samsung 27" Curved Gaming Monitor
                  </h4>
                  <p className="text-xs text-[#A6AAA1]">
                    Panel and logic board covered. Free pick-and-drop authorized service available.
                  </p>

                  {/* Progress bar countdown */}
                  <div className="w-full max-w-xs pt-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B7F36B] rounded-full w-[35%]" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/warranties')}
                className="px-3.5 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] border border-white/10 rounded-xl text-xs font-semibold transition-all whitespace-nowrap self-end sm:self-center"
              >
                View Warranty
              </button>
            </div>

            {/* Action 3: Logitech Keyboard — Return window closes in 5 days */}
            <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      Flipkart Exchange Policy
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Closes in 5 days
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F4F1E8]">
                    Logitech MX Mechanical Keyboard
                  </h4>
                  <p className="text-xs text-[#A6AAA1]">
                    Return or replacement valid until 25 Sep 2026.
                  </p>

                  {/* Progress bar countdown */}
                  <div className="w-full max-w-xs pt-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/purchases')}
                className="px-3.5 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] border border-white/10 rounded-xl text-xs font-semibold transition-all whitespace-nowrap self-end sm:self-center"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (5 cols): Purchase Insights */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#F4F1E8] tracking-tight">
              Purchase Insights
            </h2>
            <p className="text-xs text-[#A6AAA1]">
              Spending velocity and warranty protection distribution.
            </p>
          </div>

          <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg space-y-5">
            {/* Top Insight Stats */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/8">
              <div>
                <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block">
                  Purchases This Month
                </span>
                <span className="text-2xl font-extrabold text-[#F4F1E8] mt-0.5 block tabular-nums">
                  4 items
                </span>
                <span className="text-[11px] text-[#B7F36B] font-medium">
                  +1 from last month
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block">
                  Total Purchase Value
                </span>
                <span className="text-2xl font-extrabold text-[#F4F1E8] mt-0.5 block tabular-nums">
                  ₹84,398
                </span>
                <span className="text-[11px] text-[#A6AAA1] font-medium">
                  Across 24 purchases
                </span>
              </div>
            </div>

            {/* Warranty Coverage Overview */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#F4F1E8]">Warranty Coverage Overview</span>
                <span className="font-bold text-[#B7F36B]">75% Protected</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                <div className="bg-[#B7F36B] h-full w-[75%]" title="18 Active Warranties" />
                <div className="bg-amber-400 h-full w-[12%]" title="3 Expiring Soon" />
                <div className="bg-white/20 h-full w-[13%]" title="Past Warranties" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#A6AAA1] mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B7F36B]" /> 18 Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> 3 Expiring
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30" /> 3 Expired
                </span>
              </div>
            </div>

            {/* Minimal Spending Chart */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block mb-2">
                Monthly Spending Trend
              </span>
              <div className="h-20 flex items-end justify-between gap-2 px-1 pt-2 border-b border-white/8">
                {miniChartData.map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-white/5 rounded-t-sm h-14 flex items-end">
                      <div
                        style={{ height: bar.height }}
                        className={`w-full rounded-t-sm transition-all ${
                          bar.active ? 'bg-[#B7F36B]' : 'bg-white/20'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-[#A6AAA1] font-mono">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent but Elegant "Ask BillBack" AI Card */}
      <section>
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F4F1E8]">
                  Ask BillBack
                </h3>
                <p className="text-xs text-[#A6AAA1]">
                  Instant answers across all your invoices, warranties, and return dates.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/ask-billback')}
              className="text-xs font-semibold text-[#B7F36B] hover:text-[#c5f784] flex items-center gap-1"
            >
              <span>Full Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={handleAskSubmit} className="relative">
            <Search className="w-4 h-4 text-[#A6AAA1] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="Ask about your purchases... (e.g. warranties, return deadlines, spend)"
              className="w-full pl-11 pr-24 py-3 bg-black/30 border border-white/10 rounded-xl text-xs sm:text-sm text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Ask</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>

          {/* Suggested Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-[#A6AAA1] font-mono">Try asking:</span>
            {[
              'Which warranties are expiring soon?',
              'Show purchases from this month',
              'Which return deadline is closest?',
            ].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePromptClick(p)}
                className="text-xs text-[#F4F1E8] hover:text-[#B7F36B] bg-white/5 hover:bg-white/10 border border-white/8 hover:border-[#B7F36B]/30 px-3 py-1.5 rounded-lg transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Below: "Recently Added" Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#F4F1E8]">
              Recently Added
            </h2>
            <p className="text-xs text-[#A6AAA1]">
              Verified invoices organized with return and warranty trackers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/purchases')}
            className="text-xs font-semibold text-[#B7F36B] hover:text-[#c5f784] flex items-center gap-1 transition-colors"
          >
            <span>See all {purchases.length} purchases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <PurchaseTable
          purchases={purchases}
          onSelectPurchase={(id) => navigate(`/purchases/${id}`)}
          maxItems={6}
        />
      </section>
    </div>
  );
};
