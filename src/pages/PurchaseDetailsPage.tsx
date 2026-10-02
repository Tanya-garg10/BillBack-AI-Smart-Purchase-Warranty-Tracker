import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Download,
  Shield,
  Clock,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building,
  Hash,
  AlertCircle,
  Share2,
  Printer,
  Sparkles,
  Edit2,
  Check,
  X,
  History,
  ShieldCheck,
  ChevronRight,
  Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvoicePreview } from '../components/invoice-preview';
import { StatusBadge } from '../components/status-badge';

interface PurchaseDetailsPageProps {
  purchaseId: string;
}

export const PurchaseDetailsPage: React.FC<PurchaseDetailsPageProps> = ({ purchaseId }) => {
  const { purchases, navigate, showToast, updatePurchase } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const purchase = purchases.find((p) => p.id === purchaseId) || purchases[0];

  // Editable fields state
  const [editedName, setEditedName] = useState(purchase.productName);
  const [editedSeller, setEditedSeller] = useState(purchase.seller);
  const [editedPrice, setEditedPrice] = useState(purchase.purchasePrice);
  const [editedDate, setEditedDate] = useState(purchase.purchaseDate);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatePurchase) {
      updatePurchase(purchase.id, {
        productName: editedName,
        seller: editedSeller,
        purchasePrice: Number(editedPrice),
        purchaseDate: editedDate,
      });
    }
    setIsEditing(false);
    showToast('Purchase details updated successfully!');
  };

  const handleDownloadInvoice = () => {
    const invoiceContent = `BILLBACK AI — VERIFIED TAX INVOICE
======================================
Seller: ${purchase.seller}
Order ID: ${purchase.orderId}
Invoice No: ${purchase.invoice.invoiceNumber}
Date: ${purchase.purchaseDate}

ITEM DESCRIPTION:
- ${purchase.productName} (${purchase.category})
Price: ₹${purchase.purchasePrice.toLocaleString('en-IN')}
Payment: ${purchase.paymentMethod}

WARRANTY RECORD:
Provider: ${purchase.warranty.provider}
Coverage: ${purchase.warranty.coveragePeriod}
Expires: ${purchase.warranty.expiryDate}
Serial No: ${purchase.warranty.serialNumber || 'N/A'}
======================================
Digitally indexed by BillBack AI.`;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${purchase.invoice.fileName.replace(/\.pdf$/, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded invoice: ${purchase.invoice.fileName}`);
  };

  // Activity History log items
  const activityLogs = [
    {
      action: 'Invoice Uploaded & Encrypted',
      timestamp: '12 Sep 2026, 14:32',
      detail: `File "${purchase.invoice.fileName}" securely saved in AWS S3 storage.`,
      icon: FileText,
      color: 'text-[#B7F36B]',
    },
    {
      action: 'AI Extraction Completed',
      timestamp: '12 Sep 2026, 14:33',
      detail: 'Amazon Bedrock Claude model parsed product, order ID, and line item total.',
      icon: Sparkles,
      color: 'text-amber-400',
    },
    {
      action: 'Return & Warranty Deadlines Scheduled',
      timestamp: '12 Sep 2026, 14:33',
      detail: `Return deadline: ${purchase.returnWindow.deadlineDate} · Warranty active through ${purchase.warranty.expiryDate}`,
      icon: Clock,
      color: 'text-indigo-400',
    },
    {
      action: 'ClaimReady Dossier Compiled',
      timestamp: '20 Sep 2026, 09:15',
      detail: 'Proof-of-purchase package and serial verification pre-assembled for 1-click claim.',
      icon: ShieldCheck,
      color: 'text-[#B7F36B]',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium">
        <button
          type="button"
          onClick={() => navigate('/purchases')}
          className="text-[#A6AAA1] hover:text-[#B7F36B] transition-colors"
        >
          My Purchases
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#A6AAA1]" />
        <span className="text-[#F4F1E8] font-semibold truncate max-w-xs">
          {purchase.productName}
        </span>
      </nav>

      {/* Top Profile Area: Thumbnail, Name, Seller, Date, Price, Edit Button */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/8">
          <div className="flex items-start gap-4">
            {/* Product thumbnail */}
            <div className="w-14 h-14 rounded-2xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B] flex-shrink-0">
              <Package className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B7F36B]">
                  {purchase.seller}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-[#A6AAA1] font-medium">
                  {purchase.category}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold font-editorial text-[#F4F1E8] tracking-tight">
                {purchase.productName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#A6AAA1] pt-0.5">
                <span>Purchased: <strong className="text-[#F4F1E8] font-semibold">{purchase.purchaseDate}</strong></span>
                <span className="text-white/20">·</span>
                <span className="font-mono text-[#A6AAA1]">Order #{purchase.orderId}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#F4F1E8] tabular-nums">
              {formatPrice(purchase.purchasePrice)}
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/8 hover:bg-white/12 text-[#F4F1E8] border border-white/10 rounded-xl text-xs font-semibold transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#A6AAA1]" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>

        {/* Clear Status Panel (Return window, Warranty coverage, Purchase status) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Status 1: Return window */}
          <div className="p-4 rounded-xl border border-white/8 bg-black/30">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
                Return Window
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-base font-bold text-[#F4F1E8] mb-0.5">
              {purchase.returnWindow.statusText}
            </div>
            <p className="text-[11px] text-[#A6AAA1]">
              {purchase.returnWindow.isExpired
                ? `Closed on ${purchase.returnWindow.deadlineDate}`
                : `Active through ${purchase.returnWindow.deadlineDate}`}
            </p>
          </div>

          {/* Status 2: Warranty coverage */}
          <div className="p-4 rounded-xl border border-white/8 bg-black/30">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
                Warranty Coverage
              </span>
              <ShieldCheck className="w-4 h-4 text-[#B7F36B]" />
            </div>
            <div className="text-base font-bold text-[#F4F1E8] mb-0.5">
              {purchase.warranty.statusText}
            </div>
            <p className="text-[11px] text-[#A6AAA1]">
              Expires {purchase.warranty.expiryDate} ({purchase.warranty.provider})
            </p>
          </div>

          {/* Status 3: Document Status */}
          <div className="p-4 rounded-xl border border-white/8 bg-black/30">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider">
                Tax Invoice
              </span>
              <FileText className="w-4 h-4 text-[#B7F36B]" />
            </div>
            <div className="text-base font-bold text-[#F4F1E8] mb-0.5">
              Verified & Secured
            </div>
            <p className="text-[11px] text-[#A6AAA1]">
              {purchase.invoice.fileName} ({purchase.invoice.fileSize})
            </p>
          </div>
        </div>
      </div>

      {/* Claim Banner CTA */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F1E8]">
              Need a repair or replacement?
            </h3>
            <p className="text-xs text-[#A6AAA1] mt-0.5">
              Your purchase details and invoice are ready to help you prepare a warranty claim.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/claims/${purchase.id}`)}
          className="px-5 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-md shadow-[#B7F36B]/20 transition-all whitespace-nowrap self-end sm:self-center"
        >
          Prepare Claim Pack
        </button>
      </div>

      {/* Grid: Purchase Information & Warranty Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section: Purchase Information */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-[#F4F1E8] pb-2 border-b border-white/8">
            Purchase Information
          </h3>

          <div className="divide-y divide-white/6 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Product</span>
              <span className="font-bold text-[#F4F1E8] text-right">{purchase.productName}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Category</span>
              <span className="font-semibold text-[#F4F1E8]">{purchase.category}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Seller / Store</span>
              <span className="font-semibold text-[#F4F1E8]">{purchase.seller}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Order Number</span>
              <span className="font-mono text-[#F4F1E8]">{purchase.orderId}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Purchase Date</span>
              <span className="font-mono text-[#F4F1E8]">{purchase.purchaseDate}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Purchase Price</span>
              <span className="font-bold text-[#F4F1E8]">{formatPrice(purchase.purchasePrice)}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Payment Method</span>
              <span className="text-[#F4F1E8]">{purchase.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Section: Warranty Details */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-[#F4F1E8] pb-2 border-b border-white/8 flex items-center justify-between">
            <span>Warranty Details</span>
            <StatusBadge
              type="warranty"
              urgency={purchase.warranty.urgency}
              text={purchase.warranty.statusText}
            />
          </h3>

          <div className="divide-y divide-white/6 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Provider</span>
              <span className="font-bold text-[#F4F1E8] text-right">{purchase.warranty.provider}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Coverage Period</span>
              <span className="font-semibold text-[#F4F1E8]">{purchase.warranty.coveragePeriod}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Start Date</span>
              <span className="font-mono text-[#A6AAA1]">{purchase.warranty.startDate}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Expiry Date</span>
              <span className="font-mono text-[#A6AAA1]">{purchase.warranty.expiryDate}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#A6AAA1] font-medium">Serial Number</span>
              <span className="font-mono text-[#A6AAA1]">{purchase.warranty.serialNumber || 'SN-VERIFIED-77192'}</span>
            </div>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-white/8 text-xs space-y-1.5">
            <span className="text-[11px] font-mono text-[#A6AAA1] uppercase tracking-wider block mb-1">
              Coverage Terms
            </span>
            {purchase.warranty.coverageDetails.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[#A6AAA1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F36B] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Invoice Document */}
      <div id="invoice-panel-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F4F1E8]">
              Invoice Document
            </h3>
            <p className="text-xs text-[#A6AAA1]">
              Verified digital tax invoice attached to this record.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] border border-white/10 rounded-xl text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-[#A6AAA1]" />
            <span>Download Invoice</span>
          </button>
        </div>

        <InvoicePreview
          purchase={purchase}
          onDownload={handleDownloadInvoice}
        />
      </div>

      {/* Section: Activity History */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/8">
          <History className="w-4 h-4 text-[#B7F36B]" />
          <h3 className="text-base font-bold text-[#F4F1E8]">
            Activity History
          </h3>
        </div>

        <div className="space-y-4 pt-1">
          {activityLogs.map((log, idx) => {
            const Icon = log.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/8 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-4 h-4 ${log.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F4F1E8]">{log.action}</span>
                    <span className="text-[11px] text-[#A6AAA1] font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[#A6AAA1] mt-0.5 leading-relaxed">{log.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Purchase Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#17251F] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10">
            <div className="flex items-start justify-between pb-3 border-b border-white/8">
              <div>
                <h3 className="text-base font-bold text-[#F4F1E8]">
                  Edit Purchase Record
                </h3>
                <p className="text-xs text-[#A6AAA1]">
                  Update product details or pricing
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-[#A6AAA1] hover:text-[#F4F1E8] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">Product Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">Seller</label>
                <input
                  type="text"
                  value={editedSeller}
                  onChange={(e) => setEditedSeller(e.target.value)}
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">Purchase Date</label>
                  <input
                    type="text"
                    value={editedDate}
                    onChange={(e) => setEditedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-mono focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-white/10 text-[#A6AAA1] hover:text-[#F4F1E8] rounded-xl hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
