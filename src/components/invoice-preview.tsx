import React from 'react';
import { Download, Copy, Check, FileText, Shield } from 'lucide-react';
import { PurchaseItem } from '../types';

interface InvoicePreviewProps {
  purchase: PurchaseItem;
  onDownload?: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ purchase, onDownload }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyInvoiceNumber = () => {
    navigator.clipboard.writeText(purchase.invoice.invoiceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Base price and 18% GST calculation
  const totalAmount = purchase.purchasePrice;
  const taxableValue = Math.round(totalAmount / 1.18);
  const gstAmount = totalAmount - taxableValue;

  return (
    <div className="bg-[#17251F] border border-white/8 rounded-2xl shadow-xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-5 py-3.5 bg-black/30 border-b border-white/8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F4F1E8] flex items-center gap-1.5">
              <span>{purchase.invoice.fileName}</span>
              <span className="text-[10px] bg-white/10 text-[#B7F36B] font-mono px-1.5 py-0.2 rounded">
                {purchase.invoice.fileType}
              </span>
            </h4>
            <span className="text-[11px] text-[#A6AAA1]">
              Verified document ({purchase.invoice.fileSize})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyInvoiceNumber}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#F4F1E8] bg-white/8 border border-white/10 hover:bg-white/12 rounded-lg transition-colors"
            title="Copy Invoice Number"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B7F36B]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Inv #'}</span>
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#101310] bg-[#B7F36B] hover:bg-[#c5f784] rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>

      {/* Realistic Tax Invoice Document Sheet (Warm Ivory official paper) */}
      <div className="p-6 sm:p-8 m-4 rounded-xl font-sans bg-[#F4F1E8] text-[#101310] shadow-md">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-[#101310]/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black tracking-tight text-[#101310]">
                {purchase.seller.toUpperCase()}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#17251F] text-[#B7F36B] rounded font-mono">
                TAX INVOICE
              </span>
            </div>
            <p className="text-xs text-[#101310]/70">
              Authorized E-Commerce Retailer & Distributor
            </p>
            <p className="text-xs text-[#101310]/70 font-mono">
              GSTIN: {purchase.invoice.taxGst || '29AABCS1429B1ZB'}
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1">
            <div className="font-mono text-[#101310] font-bold">
              Invoice #{purchase.invoice.invoiceNumber}
            </div>
            <div className="text-[#101310]/80">
              Date: <span className="font-semibold text-[#101310]">{purchase.purchaseDate}</span>
            </div>
            <div className="text-[#101310]/80 font-mono text-[11px]">
              Order ID: {purchase.orderId}
            </div>
          </div>
        </div>

        {/* Bill To / Sold By details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#101310]/10 text-xs">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#101310]/60 block mb-1">
              Billed To
            </span>
            <p className="font-bold text-[#101310]">Tanya Garg</p>
            <p className="text-[#101310]/80">Flat 402, Prestige Palms</p>
            <p className="text-[#101310]/80">Bangalore, Karnataka, 560103</p>
            <p className="text-[#101310]/60 mt-1">Payment: {purchase.paymentMethod}</p>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#101310]/60 block mb-1">
              Warranty Registration
            </span>
            <p className="font-bold text-[#101310]">{purchase.warranty.provider}</p>
            <p className="text-[#101310]/80">Period: {purchase.warranty.coveragePeriod}</p>
            {purchase.warranty.serialNumber && (
              <p className="font-mono text-[11px] text-[#17251F] font-semibold mt-1">
                Serial: {purchase.warranty.serialNumber}
              </p>
            )}
          </div>
        </div>

        {/* Item Table */}
        <div className="my-5 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#101310]/15 text-[#101310]/70 uppercase text-[10px] tracking-wider bg-black/5 font-mono">
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Taxable</th>
                <th className="py-2.5 px-3 text-right">GST (18%)</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#101310]/10">
              <tr>
                <td className="py-3 px-3">
                  <span className="font-bold text-[#101310] block">
                    {purchase.productName}
                  </span>
                  <span className="text-[11px] text-[#101310]/60">
                    Category: {purchase.category} • Brand Sealed Unit
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-mono">1</td>
                <td className="py-3 px-3 text-right font-mono text-[#101310]/80">
                  {formatPrice(taxableValue)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#101310]/80">
                  {formatPrice(gstAmount)}
                </td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#101310]">
                  {formatPrice(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-[#101310]/15 gap-3">
          <div className="text-xs text-[#101310]/70">
            <span className="font-semibold text-[#17251F] flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Digitally signed & verified by BillBack AI Document Engine
            </span>
          </div>

          <div className="text-right w-full sm:w-auto">
            <div className="text-xs text-[#101310]/60 mb-0.5 font-mono">Total Paid (Inclusive of Taxes)</div>
            <div className="text-xl font-black text-[#101310] tabular-nums">
              {formatPrice(totalAmount)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
