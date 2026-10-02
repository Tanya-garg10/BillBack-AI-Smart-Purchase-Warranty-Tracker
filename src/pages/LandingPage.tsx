import React, { useState } from 'react';
import {
  Archive,
  ArrowRight,
  Shield,
  Clock,
  FileCheck2,
  FileText,
  Upload,
  CheckCircle2,
  Lock,
  ChevronRight,
  Zap,
  X,
  ScanText,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('tanyagarg5315@gmail.com');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#101310] text-[#F4F1E8] flex flex-col font-sans selection:bg-[#B7F36B] selection:text-[#101310]">
      {/* Slim & Spacious Editorial Navbar */}
      <header className="sticky top-0 z-40 bg-[#101310]/85 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo with receipt-vault icon */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B7F36B] flex items-center justify-center text-[#101310] font-bold shadow-sm shadow-[#B7F36B]/20 group-hover:scale-105 transition-transform">
              <Archive className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#F4F1E8]">
                BillBack
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#A6AAA1] uppercase">
                VAULT
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A6AAA1]">
            <button
              type="button"
              onClick={() => scrollToSection('features-strip')}
              className="hover:text-[#F4F1E8] transition-colors"
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#F4F1E8] transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => setShowSecurityModal(true)}
              className="hover:text-[#F4F1E8] transition-colors"
            >
              Security
            </button>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSignInModal(true)}
              className="text-xs font-medium text-[#A6AAA1] hover:text-[#F4F1E8] px-3 py-2 transition-colors"
            >
              Sign In
            </button>

            {/* Emerald CTA: "Open Your Vault" */}
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold tracking-wide shadow-xs shadow-[#B7F36B]/25 transition-all hover:scale-[1.01]"
            >
              <span>Open Your Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section — Asymmetrical Editorial Layout */}
      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
        {/* Subtle Ambient Emerald Lighting */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B7F36B]/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-6 text-left space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] uppercase text-[#A6AAA1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
                <span>YOUR PURCHASE INTELLIGENCE</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-editorial tracking-tight text-[#F4F1E8] leading-[1.08]">
                Everything you own.<br />
                <span className="text-[#B7F36B] italic font-normal">Nothing you forget.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#A6AAA1] leading-relaxed font-normal max-w-xl">
                Your invoices hold more than purchase details. BillBack turns them into a living record of returns, warranties, and everything you may need next.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  id="hero-build-vault-cta"
                  onClick={() => navigate('/upload')}
                  className="px-6 py-3.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] font-bold rounded-xl text-xs sm:text-sm tracking-wide shadow-sm shadow-[#B7F36B]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Upload className="w-4 h-4" />
                  <span>Build Your Purchase Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="hero-explore-cta"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3.5 bg-[#17251F] hover:bg-[#1f322a] border border-white/8 text-[#F4F1E8] font-medium rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore the product</span>
                  <span className="text-[#B7F36B]">→</span>
                </button>
              </div>

              {/* Small Trust Line */}
              <p className="text-xs text-[#A6AAA1]/80 font-mono tracking-wide pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F36B]" />
                <span>One place for every purchase, deadline, and document.</span>
              </p>
            </div>

            {/* Right Column: 3D-Inspired Interface Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg space-y-4">
                {/* Layer 1: Miniature Purchase Vault Dashboard Header */}
                <div className="p-4 rounded-2xl bg-[#17251F] border border-white/10 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/6 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B7F36B]" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#A6AAA1]">
                        VAULT SUMMARY · ACTIVE
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#F4F1E8]">
                      24 Purchases Indexed
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                      <span className="text-[9px] font-mono text-[#A6AAA1] uppercase block">Protected</span>
                      <span className="text-sm font-bold text-[#F4F1E8] font-editorial">₹84,398</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                      <span className="text-[9px] font-mono text-[#A6AAA1] uppercase block">Warranties</span>
                      <span className="text-sm font-bold text-[#B7F36B] font-editorial">18 Active</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                      <span className="text-[9px] font-mono text-[#A6AAA1] uppercase block">Urgent</span>
                      <span className="text-sm font-bold text-[#E77E72] font-editorial">3 Actions</span>
                    </div>
                  </div>
                </div>

                {/* Layer 2: Floating Structured AI Extraction Panel & Return Deadline Notification */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Left: Structured AI extraction tile */}
                  <div className="sm:col-span-7 p-4 rounded-2xl bg-[#131A15] border border-white/8 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#B7F36B]">
                        BEDROCK OCR EXTRACT
                      </span>
                      <span className="text-[10px] font-mono text-[#A6AAA1]">Amazon.in</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#F4F1E8]">
                        Sony WH-CH720N
                      </h4>
                      <p className="text-xs text-[#A6AAA1]">
                        Tax Invoice OD-402-8921890 · ₹4,999
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/6 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A6AAA1]">Warranty:</span>
                      <span className="text-[#B7F36B] font-semibold">1 Year Sony India</span>
                    </div>
                  </div>

                  {/* Right: Urgent Return Deadline Notification */}
                  <div className="sm:col-span-5 p-4 rounded-2xl bg-[#17251F] border border-[#B8A27B]/30 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#B8A27B] uppercase tracking-wider mb-1">
                        <Clock className="w-3 h-3 text-[#B8A27B]" />
                        <span>RETURN RADAR</span>
                      </div>
                      <span className="text-sm font-bold text-[#F4F1E8] block font-editorial">
                        Closes in 2 days
                      </span>
                      <span className="text-[10px] text-[#A6AAA1]">
                        7-Day Replacement
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/purchases/sony-wh-ch720n')}
                      className="mt-3 py-1.5 px-2.5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#F4F1E8] rounded-lg border border-white/10 transition-colors text-center"
                    >
                      Inspect Item
                    </button>
                  </div>
                </div>

                {/* Layer 3: Refined Warranty Status Tile & Document Preview */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/6 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#B7F36B]/20 text-[#B7F36B] flex items-center justify-center font-mono text-xs">
                      ✓
                    </div>
                    <div>
                      <span className="text-[#F4F1E8] font-medium block">
                        MacBook Air M3 · AppleCare
                      </span>
                      <span className="text-[10px] text-[#A6AAA1] font-mono">
                        Valid through 15 Sep 2029 (35 months left)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B7F36B]/15 text-[#B7F36B] border border-[#B7F36B]/30">
                    PROTECTED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Value Strip — 4 Horizontal Statements with Line Icons */}
      <section id="features-strip" className="py-8 bg-[#17251F] border-y border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
            <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 first:pl-0">
              <ScanText className="w-5 h-5 text-[#B7F36B] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#F4F1E8]">Understand every invoice</h4>
                <p className="text-[11px] text-[#A6AAA1]">Automatic item parsing & pricing</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
              <Clock className="w-5 h-5 text-[#B8A27B] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#F4F1E8]">Never miss a return</h4>
                <p className="text-[11px] text-[#A6AAA1]">Proactive deadline alerts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
              <Shield className="w-5 h-5 text-[#B7F36B] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#F4F1E8]">Keep warranties visible</h4>
                <p className="text-[11px] text-[#A6AAA1]">Coverage terms always accessible</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
              <FileCheck2 className="w-5 h-5 text-[#F4F1E8] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#F4F1E8]">Be ready to make a claim</h4>
                <p className="text-[11px] text-[#A6AAA1]">1-Click ClaimReady evidence pack</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 3-Step Editorial Section */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#101310]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#B7F36B]">
              THE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#F4F1E8] tracking-tight">
              How the Vault Works
            </h2>
            <p className="text-xs text-[#A6AAA1]">
              Three steps from scattered paperwork to absolute ownership clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl bg-[#17251F] border border-white/8 space-y-4 relative group hover:border-[#B7F36B]/40 transition-all">
              <span className="text-4xl sm:text-5xl font-editorial font-bold text-[#B7F36B]/30 group-hover:text-[#B7F36B] transition-colors block">
                01
              </span>
              <h3 className="text-lg font-bold text-[#F4F1E8]">
                Capture your invoice
              </h3>
              <p className="text-xs text-[#A6AAA1] leading-relaxed">
                Drop any PDF or photo receipt from Amazon, Apple, Flipkart, or physical retail stores into your private vault.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl bg-[#17251F] border border-white/8 space-y-4 relative group hover:border-[#B7F36B]/40 transition-all">
              <span className="text-4xl sm:text-5xl font-editorial font-bold text-[#B7F36B]/30 group-hover:text-[#B7F36B] transition-colors block">
                02
              </span>
              <h3 className="text-lg font-bold text-[#F4F1E8]">
                Let intelligence organize it
              </h3>
              <p className="text-xs text-[#A6AAA1] leading-relaxed">
                Document models extract line item specifications, tax invoice numbers, return policies, and manufacturer warranty durations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl bg-[#17251F] border border-white/8 space-y-4 relative group hover:border-[#B7F36B]/40 transition-all">
              <span className="text-4xl sm:text-5xl font-editorial font-bold text-[#B7F36B]/30 group-hover:text-[#B7F36B] transition-colors block">
                03
              </span>
              <h3 className="text-lg font-bold text-[#F4F1E8]">
                Know what needs attention
              </h3>
              <p className="text-xs text-[#A6AAA1] leading-relaxed">
                Automated countdowns alert you before replacement windows close, and ClaimReady evidence is prepared whenever hardware breaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-[#17251F] border-t border-white/8 text-[#F4F1E8] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B7F36B]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-editorial font-bold tracking-tight text-[#F4F1E8] leading-tight">
            Your purchases deserve a better memory.
          </h2>
          <p className="text-sm sm:text-base text-[#A6AAA1] max-w-xl mx-auto leading-relaxed">
            Start building a purchase history that actually works for you.
          </p>
          <div className="pt-3">
            <button
              type="button"
              id="closing-create-vault-cta"
              onClick={() => navigate('/upload')}
              className="px-8 py-4 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] font-bold rounded-xl text-xs sm:text-sm tracking-wide shadow-md shadow-[#B7F36B]/25 transition-all inline-flex items-center gap-2 hover:scale-[1.01]"
            >
              <span>Create Your Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="mt-auto py-8 bg-[#101310] border-t border-white/8 text-xs text-[#A6AAA1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md bg-[#B7F36B] text-[#101310] flex items-center justify-center font-bold">
              <Archive className="w-3 h-3" />
            </div>
            <span className="font-bold text-[#F4F1E8]">BillBack AI</span>
            <span>— The Purchase Vault</span>
          </div>
          <div className="text-[11px] font-mono text-[#A6AAA1]/70">
            Encrypted with AWS S3 · Claude 3.5 Intelligence · © 2026
          </div>
        </div>
      </footer>

      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#17251F] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10 text-[#F4F1E8]">
            <div className="flex items-start justify-between pb-3 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F1E8]">
                    Vault Security & Privacy
                  </h3>
                  <p className="text-xs text-[#A6AAA1]">
                    Enterprise-grade isolation for your purchase documents
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                className="text-[#A6AAA1] hover:text-[#F4F1E8] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#A6AAA1]">
              <div className="p-3.5 rounded-xl bg-black/25 border border-white/6">
                <span className="font-bold text-[#F4F1E8] block mb-1">
                  Private Cloud Storage
                </span>
                <p>
                  Documents are stored with server-side encryption (AES-256) in private S3 buckets. No public URL exposure.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/25 border border-white/6">
                <span className="font-bold text-[#F4F1E8] block mb-1">
                  Zero Data Selling
                </span>
                <p>
                  Your purchase history is never sold to advertisers or third-party marketplaces. You own 100% of your records.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                className="px-4 py-2 bg-[#B7F36B] text-[#101310] font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#17251F] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-white/10 text-[#F4F1E8]">
            <div className="flex items-start justify-between pb-3 border-b border-white/8">
              <div>
                <h3 className="text-base font-bold text-[#F4F1E8]">
                  Open Your Vault
                </h3>
                <p className="text-xs text-[#A6AAA1]">
                  Sign in to access your purchase ledger
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSignInModal(false)}
                className="text-[#A6AAA1] hover:text-[#F4F1E8] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowSignInModal(false);
                showToast(`Vault unlocked for ${loginEmail}`);
                navigate('/dashboard');
              }}
              className="py-4 space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-[#A6AAA1] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-[#F4F1E8] focus:outline-none focus:border-[#B7F36B]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Enter Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
