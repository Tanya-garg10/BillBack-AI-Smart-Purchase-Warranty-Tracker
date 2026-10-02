import React from 'react';
import { InvoiceUpload } from '../components/invoice-upload';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, FileText, Zap } from 'lucide-react';

export const UploadPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
          Add a Purchase
        </h2>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Upload a bill and let AI organize the details for you.
        </p>
      </div>

      {/* Main Upload Dropzone & Extractor */}
      <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 sm:p-8 shadow-lg">
        <InvoiceUpload onCompleteRedirect={() => navigate('/purchases')} />
      </div>

      {/* Processing capabilities banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-[#17251F] border border-white/8 rounded-xl flex items-start gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#F4F1E8] mb-0.5">Instant OCR Parsing</h4>
            <p className="text-[#A6AAA1]">
              Extracts items, GSTIN, invoice date, and seller registration in seconds.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#17251F] border border-white/8 rounded-xl flex items-start gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#F4F1E8] mb-0.5">Warranty Cataloging</h4>
            <p className="text-[#A6AAA1]">
              Auto-computes manufacturer warranty windows based on product category.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#17251F] border border-white/8 rounded-xl flex items-start gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-white/5 text-[#F4F1E8] flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#F4F1E8] mb-0.5">Encrypted Storage Ready</h4>
            <p className="text-[#A6AAA1]">
              Structured to connect with Amazon S3 and DynamoDB for production security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
