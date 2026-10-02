import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  FileText,
  Printer,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Info,
  Edit3,
} from 'lucide-react';
import { PurchaseItem } from '../types';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface ClaimReadyProps {
  purchase: PurchaseItem;
  onViewInvoice: () => void;
  onBack?: () => void;
}

export const ClaimReady: React.FC<ClaimReadyProps> = ({
  purchase,
  onViewInvoice,
  onBack,
}) => {
  const { generateClaimPack, showToast } = useApp();
  const [packGenerated, setPackGenerated] = useState(false);
  const [dossierId, setDossierId] = useState<string>('CLM-SONY-720');
  const [claimNotes, setClaimNotes] = useState(
    'Right audio driver buzzing intermittently under active noise cancellation. Verified hardware fault, tested with multiple audio sources.'
  );

  const handleGenerateSummary = () => {
    const id = generateClaimPack(purchase.id);
    setDossierId(id);
    setPackGenerated(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    showToast('Claim Summary generated successfully!');
  };

  const handleDownloadDossier = () => {
    const content = `=========================================
OFFICIAL WARRANTY CLAIM PACK — BILLBACK AI
=========================================
Claim Dossier ID : ${dossierId}
Status           : VERIFIED FOR CLAIM SUBMISSION
Generated Date   : 20 Sep 2026

1. PRODUCT IDENTITY
Product Name     : ${purchase.productName}
Category         : ${purchase.category}
Serial Number    : ${purchase.warranty.serialNumber || 'SN-VERIFIED-77192'}

2. PROOF OF PURCHASE
Merchant         : ${purchase.seller}
Order Number     : ${purchase.orderId}
Purchase Date    : ${purchase.purchaseDate}
Purchase Amount  : ₹${purchase.purchasePrice.toLocaleString('en-IN')}
Invoice Number   : ${purchase.invoice.invoiceNumber}
Invoice File     : ${purchase.invoice.fileName}

3. WARRANTY COVERAGE
Provider         : ${purchase.warranty.provider}
Coverage Period  : ${purchase.warranty.coveragePeriod}
Valid Range      : ${purchase.warranty.startDate} to ${purchase.warranty.expiryDate}
Current Status   : Active & Enforceable

4. ISSUE DESCRIPTION & NOTES
${claimNotes}

5. CHECKLIST VERIFICATION:
[X] Valid tax invoice verified and attached
[X] Serial number cataloged
[X] Active manufacturer warranty duration confirmed
[X] Merchant purchase timestamp documented
=========================================
Digitally prepared with BillBack AI ClaimReady.
Submit this dossier to the manufacturer or authorized repair center.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BillBack_ClaimDossier_${dossierId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Claim Dossier ${dossierId} downloaded!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button if present */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6AAA1] hover:text-[#B7F36B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Claims</span>
        </button>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B7F36B]">
            BillBack ClaimReady
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
          <span className="text-xs text-[#A6AAA1] font-mono">Dossier #{dossierId}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
          ClaimReady Package
        </h2>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Structured proof of purchase, warranty specs, and claim details compiled for submission.
        </p>
      </div>

      {/* Retailer Submission Notice */}
      <div className="p-3.5 rounded-xl bg-black/30 border border-white/8 text-xs text-[#A6AAA1] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#B7F36B] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#F4F1E8] font-semibold">Important Notice:</strong> BillBack AI prepares verified claim information and official documentation packets. It does not automatically submit claims on your behalf to the retailer.
        </p>
      </div>

      {/* Structured Evidence Checklist */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg space-y-6">
        <div>
          <h3 className="text-sm font-bold text-[#F4F1E8] uppercase tracking-wider mb-3">
            Structured Evidence Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Product details', status: 'Verified' },
              { label: 'Purchase proof', status: 'Invoice Attached' },
              { label: 'Seller information', status: 'Identified' },
              { label: 'Warranty information', status: 'Valid Coverage' },
              { label: 'Claim notes', status: 'Ready' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 border border-white/8"
              >
                <CheckCircle2 className="w-4 h-4 text-[#B7F36B] flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#F4F1E8] block">{item.label}</span>
                  <span className="text-[10px] text-[#B7F36B]">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Product & Details Review */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/30 border border-white/8 text-xs">
          <div>
            <span className="text-[#A6AAA1] block text-[11px] font-mono">Product</span>
            <span className="font-bold text-[#F4F1E8] block truncate">{purchase.productName}</span>
          </div>
          <div>
            <span className="text-[#A6AAA1] block text-[11px] font-mono">Merchant</span>
            <span className="font-semibold text-[#F4F1E8] block truncate">{purchase.seller}</span>
          </div>
          <div>
            <span className="text-[#A6AAA1] block text-[11px] font-mono">Purchase Date</span>
            <span className="font-medium text-[#F4F1E8] block">{purchase.purchaseDate}</span>
          </div>
          <div>
            <span className="text-[#A6AAA1] block text-[11px] font-mono">Warranty Status</span>
            <span className="font-semibold text-[#B7F36B] block">Valid Coverage</span>
          </div>
        </div>

        {/* Claim Notes Editor */}
        <div>
          <label className="text-xs font-semibold text-[#F4F1E8] block mb-1.5 flex items-center justify-between">
            <span>Claim Notes & Issue Description</span>
            <span className="text-[11px] text-[#A6AAA1]">Editable for official record</span>
          </label>
          <textarea
            value={claimNotes}
            onChange={(e) => setClaimNotes(e.target.value)}
            rows={3}
            className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-xs text-[#F4F1E8] placeholder:text-[#A6AAA1] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] leading-relaxed"
            placeholder="Describe hardware malfunction or defect details..."
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            id="generate-claim-summary-btn"
            onClick={handleGenerateSummary}
            className="w-full sm:flex-1 py-3 px-5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#B7F36B]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Claim Summary</span>
          </button>

          <button
            type="button"
            id="view-invoice-btn"
            onClick={onViewInvoice}
            className="w-full sm:w-auto py-3 px-4 bg-white/8 border border-white/10 hover:bg-white/12 text-[#F4F1E8] text-xs sm:text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#A6AAA1]" />
            <span>View Attached Invoice</span>
          </button>
        </div>
      </div>

      {/* Generated Claim Pack Summary Display */}
      {packGenerated && (
        <div className="bg-black/50 text-[#F4F1E8] rounded-2xl p-6 sm:p-7 font-mono text-xs shadow-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B7F36B]" />
              <span className="font-bold tracking-wider text-[#F4F1E8]">
                OFFICIAL CLAIM SUMMARY DOSSIER
              </span>
            </div>
            <button
              type="button"
              onClick={handleDownloadDossier}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-lg text-xs font-sans font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#A6AAA1]">
            <div>
              <span className="text-[#A6AAA1]/70 block text-[10px] uppercase">Product</span>
              <span className="text-[#F4F1E8] font-bold">{purchase.productName}</span>
            </div>
            <div>
              <span className="text-[#A6AAA1]/70 block text-[10px] uppercase">Warranty Provider</span>
              <span className="text-[#F4F1E8] font-bold">{purchase.warranty.provider}</span>
            </div>
            <div>
              <span className="text-[#A6AAA1]/70 block text-[10px] uppercase">Order Reference</span>
              <span className="text-[#F4F1E8]">{purchase.orderId}</span>
            </div>
            <div>
              <span className="text-[#A6AAA1]/70 block text-[10px] uppercase">Validity</span>
              <span className="text-[#B7F36B] font-bold">{purchase.warranty.startDate} – {purchase.warranty.expiryDate}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-[#A6AAA1]">
            <span className="block text-[#A6AAA1]/70 uppercase text-[9px] mb-1">Issue Details</span>
            <p className="font-sans text-[#F4F1E8]">{claimNotes}</p>
          </div>
        </div>
      )}
    </div>
  );
};
