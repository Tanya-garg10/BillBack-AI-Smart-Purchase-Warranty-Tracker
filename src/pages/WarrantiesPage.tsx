import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Plus, Search, Calendar, ChevronRight, Shield, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WarrantyCard } from '../components/warranty-card';

export const WarrantiesPage: React.FC = () => {
  const { purchases, navigate } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all');
  const [search, setSearch] = useState('');

  const activeCount = purchases.filter((p) => p.warranty.isValid).length;
  const expiringCount = purchases.filter(
    (p) => p.warranty.daysRemaining > 0 && p.warranty.daysRemaining <= 30
  ).length;
  const expiredCount = purchases.filter((p) => !p.warranty.isValid).length;

  const filteredPurchases = purchases.filter((p) => {
    const matchesSearch =
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.warranty.provider.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'active') return p.warranty.isValid;
    if (filter === 'expiring') return p.warranty.daysRemaining > 0 && p.warranty.daysRemaining <= 30;
    if (filter === 'expired') return !p.warranty.isValid;
    return true;
  });

  // Upcoming warranty expirations timeline items
  const timelineItems = [
    {
      product: 'Samsung Galaxy M55',
      date: '15 Oct 2026',
      daysRemaining: '21 days remaining',
      status: 'expiring',
      provider: 'Samsung Care+',
    },
    {
      product: 'Logitech MX Master 3S',
      date: '12 Sep 2027',
      daysRemaining: '345 days remaining',
      status: 'active',
      provider: 'Logitech Authorized',
    },
    {
      product: 'Sony WH-CH720N',
      date: '12 Sep 2028',
      daysRemaining: '23 months remaining',
      status: 'active',
      provider: 'Sony India Support',
    },
    {
      product: 'Apple MacBook Air M3',
      date: '15 Sep 2029',
      daysRemaining: '35 months remaining',
      status: 'active',
      provider: 'AppleCare Protection',
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
            Warranty Vault
          </h2>
          <p className="text-xs text-[#A6AAA1] mt-0.5">
            Active warranties, expiration countdowns, and authorized repair coverage.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/upload')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-md shadow-[#B7F36B]/20 transition-all self-start sm:self-auto hover:scale-[1.01]"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Warranty</span>
        </button>
      </div>

      {/* 3 Status Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block">
              Active Warranties
            </span>
            <div className="text-3xl font-extrabold text-[#F4F1E8] mt-1 tabular-nums">
              {activeCount}
            </div>
            <span className="text-xs text-[#B7F36B] font-semibold mt-1 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
              Full hardware protection
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 text-[#B7F36B] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block">
              Expiring Soon
            </span>
            <div className="text-3xl font-extrabold text-[#F4F1E8] mt-1 tabular-nums">
              {expiringCount}
            </div>
            <span className="text-xs text-amber-400 font-semibold mt-1 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Action required
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block">
              Expired Warranties
            </span>
            <div className="text-3xl font-extrabold text-[#F4F1E8] mt-1 tabular-nums">
              {expiredCount}
            </div>
            <span className="text-xs text-[#A6AAA1] font-medium mt-1 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6AAA1]/50" />
              Archived coverage
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#A6AAA1] flex items-center justify-center">
            <ShieldX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Visual Timeline for Upcoming Warranty Expirations */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F4F1E8]">
              Warranty Expiration Roadmap
            </h3>
            <p className="text-xs text-[#A6AAA1]">
              Chronological timeline of upcoming protection dates.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-white/8 text-[#F4F1E8] border border-white/10 rounded-lg font-mono">
            2026 – 2029
          </span>
        </div>

        <div className="relative py-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {timelineItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                  item.status === 'expiring'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-black/30 border-white/8'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#A6AAA1]">
                    {item.date}
                  </span>
                  <span
                    className={`font-semibold text-[11px] ${
                      item.status === 'expiring' ? 'text-amber-400 font-bold' : 'text-[#B7F36B]'
                    }`}
                  >
                    {item.daysRemaining}
                  </span>
                </div>
                <h4 className="font-bold text-[#F4F1E8] truncate">{item.product}</h4>
                <p className="text-[11px] text-[#A6AAA1] flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#B7F36B]" />
                  <span>{item.provider}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="inline-flex p-1 bg-black/30 border border-white/8 rounded-xl self-start">
          {[
            { id: 'all', label: `All (${purchases.length})` },
            { id: 'active', label: `Active (${activeCount})` },
            { id: 'expiring', label: `Expiring Soon (${expiringCount})` },
            { id: 'expired', label: `Expired (${expiredCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === tab.id
                  ? 'bg-[#B7F36B] text-[#101310] shadow-xs'
                  : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#A6AAA1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search warranties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
          />
        </div>
      </div>

      {/* Warranty Cards Grid */}
      {filteredPurchases.length === 0 ? (
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-12 text-center shadow-lg">
          <ShieldAlert className="w-10 h-10 text-[#A6AAA1] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#F4F1E8] mb-1">No warranties match filter</h3>
          <p className="text-xs text-[#A6AAA1] max-w-sm mx-auto mb-4">
            Try adjusting your search query or selecting a different warranty status filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter('all');
              setSearch('');
            }}
            className="px-4 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] rounded-xl text-xs font-bold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPurchases.map((purchase) => (
            <WarrantyCard
              key={purchase.id}
              purchase={purchase}
              onView={() => navigate(`/purchases/${purchase.id}`)}
              onStartClaim={() => navigate(`/claims/${purchase.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
