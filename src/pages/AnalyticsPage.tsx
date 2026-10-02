import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  IndianRupee,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Building2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { purchases, stats } = useApp();

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const avgPurchase = Math.round(stats.totalSpend / (purchases.length || 1));

  // Monthly expenditure trend
  const monthlyData = [
    { month: 'Apr', spend: 8900 },
    { month: 'May', spend: 12400 },
    { month: 'Jun', spend: 15600 },
    { month: 'Jul', spend: 18900 },
    { month: 'Aug', spend: 9400 },
    { month: 'Sep', spend: 33496, isCurrent: true },
  ];

  const maxMonthlySpend = Math.max(...monthlyData.map((d) => d.spend));

  // Category breakdown
  const categoryData = [
    { name: 'Computing & Laptops', amount: 114900, pct: 54.2, color: 'bg-[#B7F36B]', dot: 'bg-[#B7F36B]' },
    { name: 'Smartphones & Displays', amount: 49998, pct: 23.6, color: 'bg-emerald-400', dot: 'bg-emerald-400' },
    { name: 'Audio & Wearables', amount: 17994, pct: 8.5, color: 'bg-amber-400', dot: 'bg-amber-400' },
    { name: 'Home Appliances', amount: 19490, pct: 9.2, color: 'bg-blue-400', dot: 'bg-blue-400' },
    { name: 'Accessories', amount: 9698, pct: 4.5, color: 'bg-white/40', dot: 'bg-white/40' },
  ];

  // Seller concentration
  const sellerBreakdown = [
    { seller: 'Amazon India', count: 7, total: 34672, pct: 40.8, dot: 'bg-amber-400' },
    { seller: 'Flipkart', count: 2, total: 26998, pct: 31.8, dot: 'bg-blue-400' },
    { seller: 'Apple Store', count: 1, total: 14900, pct: 17.5, dot: 'bg-[#B7F36B]' },
    { seller: 'Mi Store & Croma', count: 2, total: 8350, pct: 9.9, dot: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
          Portfolio Analytics
        </h2>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Spending velocity, category breakdown, and warranty coverage depth.
        </p>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-[#A6AAA1] text-[11px] font-mono uppercase tracking-wider mb-2">
            <span>Total Spend</span>
            <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] tabular-nums">
            {formatPrice(stats.totalSpend)}
          </div>
          <span className="text-xs text-[#B7F36B] font-semibold mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
            12 verified tax invoices
          </span>
        </div>

        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-[#A6AAA1] text-[11px] font-mono uppercase tracking-wider mb-2">
            <span>Average Purchase</span>
            <div className="w-8 h-8 rounded-xl bg-white/5 text-[#F4F1E8] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] tabular-nums">
            {formatPrice(avgPurchase)}
          </div>
          <span className="text-xs text-[#A6AAA1] font-normal mt-1 block">
            Across consumer tech & home
          </span>
        </div>

        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-[#A6AAA1] text-[11px] font-mono uppercase tracking-wider mb-2">
            <span>Hardware Protected</span>
            <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] tabular-nums">
            {formatPrice(stats.totalSpend)}
          </div>
          <span className="text-xs text-[#B7F36B] font-semibold mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
            100% covered by proof of purchase
          </span>
        </div>

        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-[#A6AAA1] text-[11px] font-mono uppercase tracking-wider mb-2">
            <span>Purchases This Month</span>
            <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#F4F1E8] tabular-nums">
            4
          </div>
          <span className="text-xs text-[#A6AAA1] font-normal mt-1 block">
            September 2026 ({formatPrice(33496)})
          </span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Spending Bar Chart */}
        <div className="lg:col-span-7 bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#F4F1E8]">
                Monthly Expenditure
              </h3>
              <p className="text-xs text-[#A6AAA1]">
                Aggregate spend over the last 6 months (INR)
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-white/8 text-[#F4F1E8] border border-white/10 rounded-lg">
              FY 2026
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-white/8">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.spend / maxMonthlySpend) * 100);

              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-[#A6AAA1] group-hover:text-[#B7F36B] transition-colors tabular-nums">
                    {d.spend > 10000 ? `₹${Math.round(d.spend / 1000)}k` : `₹${d.spend}`}
                  </span>

                  <div className="w-full max-w-[44px] bg-white/5 rounded-t-xl relative flex items-end h-44 overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        d.isCurrent
                          ? 'bg-[#B7F36B] shadow-md shadow-[#B7F36B]/20'
                          : 'bg-white/20 group-hover:bg-white/30'
                      }`}
                    />
                  </div>

                  <span className={`text-xs font-mono font-bold ${d.isCurrent ? 'text-[#B7F36B]' : 'text-[#A6AAA1]'}`}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#A6AAA1] pt-4">
            <span>Peak spend in September (Festive sales & laptop upgrade)</span>
            <span className="font-mono">Monthly Avg: ₹14,153</span>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="lg:col-span-5 bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F4F1E8] mb-1">
              Category Distribution
            </h3>
            <p className="text-xs text-[#A6AAA1] mb-6">
              Allocation across hardware & appliance segments
            </p>

            {/* Stacked Progress Bar */}
            <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden flex mb-6">
              {categoryData.map((cat) => (
                <div
                  key={cat.name}
                  style={{ width: `${cat.pct}%` }}
                  className={`${cat.color} transition-all duration-500`}
                  title={`${cat.name}: ${cat.pct}%`}
                />
              ))}
            </div>

            {/* Legend List */}
            <div className="space-y-3.5 text-xs">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
                    <span className="font-medium text-[#F4F1E8]">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#F4F1E8] tabular-nums">{formatPrice(cat.amount)}</span>
                    <span className="text-[11px] text-[#A6AAA1] ml-1.5 font-mono">({cat.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/8 mt-6 text-xs text-[#A6AAA1] flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#B7F36B] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#B7F36B]" />
              100% indexed in Warranty Vault
            </span>
          </div>
        </div>
      </div>

      {/* Merchant Distribution */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg">
        <h3 className="text-base font-bold text-[#F4F1E8] mb-1">
          Merchant Allocation & Purchase Volume
        </h3>
        <p className="text-xs text-[#A6AAA1] mb-5">
          Spending spread across authorized retailers and marketplaces.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellerBreakdown.map((s) => (
            <div
              key={s.seller}
              className="p-4 rounded-xl bg-black/30 border border-white/8"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-xs font-bold text-[#F4F1E8]">
                  {s.seller}
                </span>
              </div>
              <div className="text-xl font-extrabold text-[#F4F1E8] tabular-nums">
                {formatPrice(s.total)}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#A6AAA1] mt-2 pt-2 border-t border-white/6 font-mono">
                <span>{s.count} invoices</span>
                <span>{s.pct}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
