import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
  Download,
  Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PurchaseTable } from '../components/purchase-table';
import { PurchaseCard } from '../components/purchase-card';

type SortOption = 'date-desc' | 'date-asc' | 'price-desc' | 'price-asc' | 'warranty-desc';
type FilterTab = 'All' | 'Active Warranties' | 'Returns Expiring' | 'Expired' | 'Recent';

export const PurchasesPage: React.FC = () => {
  const { purchases, navigate, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filterTabs: FilterTab[] = [
    'All',
    'Active Warranties',
    'Returns Expiring',
    'Expired',
    'Recent',
  ];

  const handleExportCSV = () => {
    try {
      const headers = [
        'ID',
        'Product Name',
        'Seller',
        'Order ID',
        'Category',
        'Price (INR)',
        'Purchase Date',
        'Return Deadline',
        'Return Urgency',
        'Warranty Expiry',
        'Warranty Provider',
        'Invoice File',
      ];

      const rows = purchases.map((p) => [
        `"${p.id}"`,
        `"${p.productName.replace(/"/g, '""')}"`,
        `"${p.seller}"`,
        `"${p.orderId}"`,
        `"${p.category}"`,
        p.purchasePrice,
        `"${p.purchaseDate}"`,
        `"${p.returnWindow.deadlineDate}"`,
        `"${p.returnWindow.urgency}"`,
        `"${p.warranty.expiryDate}"`,
        `"${p.warranty.provider.replace(/"/g, '""')}"`,
        `"${p.invoice.fileName}"`,
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `billback_purchases_export_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${purchases.length} purchases to CSV`);
    } catch {
      showToast('Export failed. Please try again.');
    }
  };

  const filteredPurchases = useMemo(() => {
    return purchases
      .filter((item) => {
        const matchesSearch =
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.orderId.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeFilter === 'Active Warranties') {
          return item.warranty.isValid;
        }
        if (activeFilter === 'Returns Expiring') {
          return item.returnWindow.daysRemaining <= 7 && !item.returnWindow.isExpired;
        }
        if (activeFilter === 'Expired') {
          return item.returnWindow.isExpired && !item.warranty.isValid;
        }
        if (activeFilter === 'Recent') {
          return item.purchaseDate.includes('Sep 2026') || item.purchaseDate.includes('Aug 2026');
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.purchasePrice - a.purchasePrice;
        if (sortBy === 'price-asc') return a.purchasePrice - b.purchasePrice;
        if (sortBy === 'warranty-desc') return b.warranty.daysRemaining - a.warranty.daysRemaining;
        return 0;
      });
  }, [purchases, searchQuery, activeFilter, sortBy]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
            Purchase Vault
          </h2>
          <p className="text-xs text-[#A6AAA1] mt-0.5">
            Every purchase indexed from tax invoices with return & warranty timelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white/8 border border-white/10 hover:bg-white/12 text-[#F4F1E8] rounded-xl text-xs font-bold shadow-xs transition-all"
            title="Export all purchase history to CSV"
          >
            <Download className="w-4 h-4 text-[#A6AAA1]" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            id="add-invoice-btn"
            onClick={() => navigate('/upload')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-md shadow-[#B7F36B]/20 transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Invoice</span>
          </button>
        </div>
      </div>

      {/* Top Controls: Search, Sort, Filter, View Mode */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A6AAA1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search purchases by product, merchant (Amazon, Flipkart), order ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs sm:text-sm text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-1.5 text-xs text-[#F4F1E8] bg-black/30 border border-white/10 px-3 py-2.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A6AAA1]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold text-[#F4F1E8]"
              >
                <option value="date-desc" className="bg-[#17251F] text-[#F4F1E8]">Newest First</option>
                <option value="date-asc" className="bg-[#17251F] text-[#F4F1E8]">Oldest First</option>
                <option value="price-desc" className="bg-[#17251F] text-[#F4F1E8]">Highest Price</option>
                <option value="price-asc" className="bg-[#17251F] text-[#F4F1E8]">Lowest Price</option>
                <option value="warranty-desc" className="bg-[#17251F] text-[#F4F1E8]">Longest Warranty</option>
              </select>
            </div>

            {/* Grid / Table Toggle */}
            <div className="flex items-center border border-white/10 rounded-xl p-0.5 bg-black/30">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#B7F36B] text-[#101310] font-bold shadow-xs'
                    : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#B7F36B] text-[#101310] font-bold shadow-xs'
                    : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Segmented Filter Control Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/8">
          <div className="inline-flex p-1 bg-black/30 border border-white/8 rounded-xl">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? 'bg-[#B7F36B] text-[#101310] shadow-xs'
                    : 'text-[#A6AAA1] hover:text-[#F4F1E8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#A6AAA1] font-mono ml-auto">
            Showing {filteredPurchases.length} of {purchases.length} items
          </span>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {filteredPurchases.length === 0 ? (
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-12 text-center shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B7F36B] mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F4F1E8] mb-1">
            No purchases found
          </h3>
          <p className="text-xs text-[#A6AAA1] max-w-sm mx-auto mb-4">
            Try adjusting your search terms or filter criteria, or upload a new tax invoice.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
            className="px-4 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] rounded-xl text-xs font-bold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <PurchaseTable
          purchases={filteredPurchases}
          onSelectPurchase={(id) => navigate(`/purchases/${id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPurchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              onSelect={() => navigate(`/purchases/${purchase.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
