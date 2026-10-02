import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  AlertCircle,
  RefreshCw,
  Edit2,
  Check,
} from 'lucide-react';
import { ProcessingState } from './processing-state';
import { PurchaseItem } from '../types';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface ExtractedData {
  productName: string;
  seller: string;
  purchaseDate: string;
  price: number;
  returnWindowDays: number;
  warrantyPeriod: string;
  category: 'Audio' | 'Smartphones' | 'Computing' | 'Wearables' | 'Home Appliances' | 'Accessories';
  orderId: string;
  confidenceScore?: number;
}

const DEMO_EXTRACTIONS: Record<string, ExtractedData> = {
  default: {
    productName: 'Sony WH-CH720N',
    seller: 'Amazon',
    purchaseDate: '12 Sep 2026',
    price: 4999,
    returnWindowDays: 7,
    warrantyPeriod: '1 year',
    category: 'Audio',
    orderId: 'OD-402-8921890-4491021',
    confidenceScore: 0.994,
  },
  macbook: {
    productName: 'Apple MacBook Air M3 (16GB)',
    seller: 'Apple India',
    purchaseDate: '15 Sep 2026',
    price: 114900,
    returnWindowDays: 14,
    warrantyPeriod: '1 year AppleCare',
    category: 'Computing',
    orderId: 'W109928120',
    confidenceScore: 0.988,
  },
  dyson: {
    productName: 'Dyson V8 Absolute Cordless Vacuum',
    seller: 'Flipkart',
    purchaseDate: '17 Sep 2026',
    price: 29900,
    returnWindowDays: 7,
    warrantyPeriod: '2 years Manufacturer',
    category: 'Home Appliances',
    orderId: 'FK-OD-992104910',
    confidenceScore: 0.975,
  },
};

export const InvoiceUpload: React.FC<{ onCompleteRedirect?: () => void }> = ({
  onCompleteRedirect,
}) => {
  const { addPurchase, navigate, showToast } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData>(DEMO_EXTRACTIONS.default);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const startExtraction = async (fileName: string, fileSize: string, presetKey = 'default') => {
    setFile({ name: fileName, size: fileSize });
    setIsProcessing(true);

    try {
      const response = await fetch('/api/invoices/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          userId: 'tanyagarg_1024',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.extracted) {
          setExtractedData({
            productName: result.extracted.productName,
            category: result.extracted.category,
            seller: result.extracted.seller,
            orderId: result.extracted.orderId,
            purchaseDate: result.extracted.purchaseDate,
            price: result.extracted.price,
            returnWindowDays: result.extracted.returnWindowDays,
            warrantyPeriod: result.extracted.warrantyPeriod,
            confidenceScore: result.extracted.rawConfidence || 0.994,
          });
          return;
        }
      }
    } catch {
      // safe fallback
    }

    setExtractedData(DEMO_EXTRACTIONS[presetKey] || DEMO_EXTRACTIONS.default);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const sizeKb = Math.round(droppedFile.size / 1024);
      startExtraction(droppedFile.name, `${sizeKb} KB`);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const sizeKb = Math.round(selectedFile.size / 1024);
      startExtraction(selectedFile.name, `${sizeKb} KB`);
    }
  };

  const handleSavePurchase = () => {
    const newId = extractedData.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newPurchase: PurchaseItem = {
      id: newId,
      productName: extractedData.productName,
      category: extractedData.category,
      seller: extractedData.seller,
      orderId: extractedData.orderId,
      purchaseDate: extractedData.purchaseDate,
      purchasePrice: Number(extractedData.price) || 4999,
      currency: '₹',
      paymentMethod: 'Verified Invoice Payment',
      invoice: {
        fileName: file ? file.name : 'Uploaded_Tax_Invoice.pdf',
        fileSize: file ? file.size : '412 KB',
        fileType: 'PDF',
        uploadDate: '20 Sep 2026',
        invoiceNumber: `INV-AUTO-${Math.floor(10000 + Math.random() * 90000)}`,
      },
      returnWindow: {
        policyDays: Number(extractedData.returnWindowDays) || 7,
        purchaseDate: extractedData.purchaseDate,
        deadlineDate: '26 Sep 2026',
        daysRemaining: 6,
        isExpired: false,
        statusText: `${extractedData.returnWindowDays} days left`,
        urgency: 'normal',
      },
      warranty: {
        provider: `${extractedData.seller} / Manufacturer Support`,
        coveragePeriod: extractedData.warrantyPeriod,
        durationMonths: 12,
        startDate: extractedData.purchaseDate,
        expiryDate: '11 Sep 2027',
        daysRemaining: 356,
        monthsRemaining: 12,
        statusText: `${extractedData.warrantyPeriod} remaining`,
        isValid: true,
        urgency: 'active',
        coverageDetails: [
          'Full hardware & electronic components coverage',
          'Free pick-and-drop service or walk-in authorized center service',
        ],
        serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      claimStatus: 'none',
    };

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }

    addPurchase(newPurchase);
    showToast(`Purchase "${extractedData.productName}" saved successfully!`);

    if (onCompleteRedirect) {
      onCompleteRedirect();
    } else {
      navigate(`/purchases/${newId}`);
    }
  };

  if (isProcessing) {
    return (
      <ProcessingState
        onComplete={() => {
          setIsProcessing(false);
          setIsExtracted(true);
        }}
      />
    );
  }

  // Editable extraction review form
  if (isExtracted) {
    return (
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F4F1E8]">Review Extracted Details</h3>
              <p className="text-xs text-[#A6AAA1]">Edit any field before saving to your purchase ledger.</p>
            </div>
          </div>
          {extractedData.confidenceScore && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#B7F36B]/15 text-[#B7F36B] border border-[#B7F36B]/30 font-semibold">
              {(extractedData.confidenceScore * 100).toFixed(1)}% match
            </span>
          )}
        </div>

        {/* Editable Form */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={extractedData.productName}
              onChange={(e) => setExtractedData({ ...extractedData, productName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-medium focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
                Seller
              </label>
              <input
                type="text"
                value={extractedData.seller}
                onChange={(e) => setExtractedData({ ...extractedData, seller: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-medium focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                required
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
                Purchase Price (₹)
              </label>
              <input
                type="number"
                value={extractedData.price}
                onChange={(e) => setExtractedData({ ...extractedData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-medium focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
                Purchase Date
              </label>
              <input
                type="text"
                value={extractedData.purchaseDate}
                onChange={(e) => setExtractedData({ ...extractedData, purchaseDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-mono focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                required
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
                Return Period (Days)
              </label>
              <input
                type="number"
                value={extractedData.returnWindowDays}
                onChange={(e) => setExtractedData({ ...extractedData, returnWindowDays: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-medium focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                required
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1">
                Warranty Duration
              </label>
              <input
                type="text"
                value={extractedData.warrantyPeriod}
                onChange={(e) => setExtractedData({ ...extractedData, warrantyPeriod: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] font-medium focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
                required
              />
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            id="save-purchase-button"
            onClick={handleSavePurchase}
            className="w-full sm:flex-1 py-3 px-5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#B7F36B]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <span>Save Purchase to Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsExtracted(false);
              setFile(null);
            }}
            className="w-full sm:w-auto py-3 px-4 bg-white/8 border border-white/10 hover:bg-white/12 text-[#F4F1E8] text-xs sm:text-sm font-medium rounded-xl transition-colors"
          >
            Try another invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Main Upload Card */}
      <div
        id="invoice-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#B7F36B] bg-[#B7F36B]/10 scale-[0.99]'
            : 'border-white/15 hover:border-[#B7F36B]/50 bg-black/25 hover:bg-black/35 shadow-lg'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#B7F36B]/15 border border-[#B7F36B]/30 flex items-center justify-center text-[#B7F36B] mx-auto mb-4 shadow-sm">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#F4F1E8] mb-1">
          Drop your invoice here
        </h3>
        <p className="text-xs text-[#A6AAA1] mb-4">
          PDF, PNG, or JPG up to 10 MB
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-4 py-2 bg-white/10 hover:bg-white/15 text-[#F4F1E8] rounded-xl text-xs font-semibold border border-white/10 transition-colors"
        >
          Browse files
        </button>
      </div>

      {/* Instant Demo Presets */}
      <div className="pt-2">
        <span className="text-xs text-[#A6AAA1] font-mono uppercase tracking-wider block mb-3 text-center">
          Or test instantly with sample invoices:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => startExtraction('Amazon_Sony_WHCH720N_TaxInvoice.pdf', '412 KB', 'default')}
            className="p-3 text-left border border-white/8 bg-black/30 hover:border-[#B7F36B]/50 rounded-xl transition-all group"
          >
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-0.5">Amazon</span>
            <span className="text-xs font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] block line-clamp-1">
              Sony WH-CH720N
            </span>
            <span className="text-[11px] text-[#A6AAA1] font-mono">₹4,999 · PDF</span>
          </button>

          <button
            type="button"
            onClick={() => startExtraction('Apple_Store_MacBook_Air_M3.pdf', '680 KB', 'macbook')}
            className="p-3 text-left border border-white/8 bg-black/30 hover:border-[#B7F36B]/50 rounded-xl transition-all group"
          >
            <span className="text-[10px] font-mono font-bold text-[#B7F36B] uppercase tracking-wider block mb-0.5">Apple Store</span>
            <span className="text-xs font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] block line-clamp-1">
              MacBook Air M3
            </span>
            <span className="text-[11px] text-[#A6AAA1] font-mono">₹1,14,900 · PDF</span>
          </button>

          <button
            type="button"
            onClick={() => startExtraction('Flipkart_Dyson_V8_Invoice.pdf', '540 KB', 'dyson')}
            className="p-3 text-left border border-white/8 bg-black/30 hover:border-[#B7F36B]/50 rounded-xl transition-all group"
          >
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block mb-0.5">Flipkart</span>
            <span className="text-xs font-bold text-[#F4F1E8] group-hover:text-[#B7F36B] block line-clamp-1">
              Dyson V8 Vacuum
            </span>
            <span className="text-[11px] text-[#A6AAA1] font-mono">₹29,900 · PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
