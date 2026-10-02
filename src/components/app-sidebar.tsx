import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  UploadCloud,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Receipt,
  X,
  LifeBuoy,
  Lock,
  Archive,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export const AppSidebar: React.FC = () => {
  const {
    currentPath,
    navigate,
    isSidebarCollapsed,
    toggleSidebar,
    isMobileMenuOpen,
    setMobileMenuOpen,
    showToast,
  } = useApp();

  const [showHelpModal, setShowHelpModal] = useState(false);

  // Exact navigation items from prompt:
  // Overview, Purchases, Add Invoice, Warranty Vault, ClaimReady, Ask BillBack, Settings
  const mainNavItems: NavItem[] = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Purchases', path: '/purchases', icon: ShoppingBag, badgeCount: 24 },
    { name: 'Add Invoice', path: '/upload', icon: UploadCloud },
    { name: 'Warranty Vault', path: '/warranties', icon: ShieldCheck, badgeCount: 18 },
    { name: 'ClaimReady', path: '/claims', icon: FileCheck2, badgeCount: 2 },
    { name: 'Ask BillBack', path: '/ask-billback', icon: Sparkles },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && (currentPath === '/dashboard' || currentPath === '')) {
      return true;
    }
    if (path === '/purchases' && currentPath.startsWith('/purchases')) {
      return true;
    }
    if (path === '/claims' && currentPath.startsWith('/claims')) {
      return true;
    }
    return currentPath === path;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#17251F] text-[#A6AAA1] border-r border-white/8 select-none">
      {/* Brand Header with receipt-vault icon */}
      <div className="h-18 px-5 border-b border-white/6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#B7F36B] flex items-center justify-center text-[#101310] font-bold shadow-sm shadow-[#B7F36B]/20 group-hover:scale-105 transition-transform">
            <div className="relative">
              <Archive className="w-4 h-4" />
            </div>
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold tracking-tight text-[#F4F1E8]">
                  BillBack
                </span>
                <span className="text-[10px] font-mono font-semibold px-1 py-0.2 rounded bg-[#B7F36B]/15 text-[#B7F36B] border border-[#B7F36B]/30 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#A6AAA1] uppercase">
                PERSONAL VAULT
              </span>
            </div>
          )}
        </button>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden p-1.5 text-[#A6AAA1] hover:text-[#F4F1E8] rounded-lg hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Add Action in Vault */}
      <div className="p-3">
        <button
          type="button"
          id="sidebar-add-invoice-btn"
          onClick={() => handleNavClick('/upload')}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs ${
            isSidebarCollapsed ? 'px-0' : ''
          }`}
          title="Add Invoice"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isSidebarCollapsed && <span>Add Purchase</span>}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!isSidebarCollapsed && (
          <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#A6AAA1]/70">
            Vault Index
          </div>
        )}

        {mainNavItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              type="button"
              id={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all group relative ${
                active
                  ? 'bg-white/[0.08] text-[#F4F1E8] font-semibold border border-white/10 shadow-xs'
                  : 'text-[#A6AAA1] hover:bg-white/[0.04] hover:text-[#F4F1E8]'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
              title={isSidebarCollapsed ? item.name : undefined}
            >
              {/* Fine emerald indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-[#B7F36B]" />
              )}
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  active ? 'text-[#B7F36B]' : 'text-[#A6AAA1] group-hover:text-[#F4F1E8]'
                }`}
              />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left tracking-normal">{item.name}</span>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold tabular-nums ${
                        active
                          ? 'bg-[#B7F36B] text-[#101310]'
                          : 'bg-white/10 text-[#A6AAA1] group-hover:bg-white/15'
                      }`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Area: Help, User Profile & Account */}
      <div className="p-3 border-t border-white/6 space-y-1">
        <button
          type="button"
          onClick={() => setShowHelpModal(true)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#A6AAA1] hover:bg-white/[0.04] hover:text-[#F4F1E8] transition-colors ${
            isSidebarCollapsed ? 'justify-center px-0' : ''
          }`}
          title={isSidebarCollapsed ? 'Help & Vault Security' : undefined}
        >
          <HelpCircle className="w-4 h-4 text-[#A6AAA1]" />
          {!isSidebarCollapsed && <span>Vault Guide & Help</span>}
        </button>

        {/* User profile with avatar and name */}
        {!isSidebarCollapsed ? (
          <div
            onClick={() => handleNavClick('/settings')}
            className="mt-2 p-2.5 rounded-xl bg-black/20 border border-white/6 flex items-center gap-2.5 cursor-pointer hover:border-white/15 transition-all"
            title="Account Settings"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B7F36B]/20 border border-[#B7F36B]/40 text-[#B7F36B] font-bold text-xs flex items-center justify-center">
              TG
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#F4F1E8] block truncate">
                Tanya Garg
              </span>
              <span className="text-[10px] font-mono text-[#A6AAA1] block truncate">
                24 Purchases Vaulted
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleNavClick('/settings')}
            className="w-8 h-8 rounded-lg bg-[#B7F36B]/20 border border-[#B7F36B]/40 text-[#B7F36B] font-bold text-xs flex items-center justify-center mx-auto cursor-pointer mt-2"
            title="Tanya Garg (Settings)"
          >
            TG
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <div className="hidden md:block pt-1">
          <button
            type="button"
            id="sidebar-collapse-toggle"
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-1.5 rounded-lg text-[#A6AAA1] hover:text-[#F4F1E8] hover:bg-white/5 transition-colors"
            title={isSidebarCollapsed ? 'Expand vault sidebar' : 'Collapse vault sidebar'}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-[#A6AAA1]">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Collapse</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 z-30 transition-all duration-200 ${
          isSidebarCollapsed ? 'w-18' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* In-app Help & Vault Security Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#17251F] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10 text-[#F4F1E8]">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#B7F36B]/15 text-[#B7F36B] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F1E8]">
                    The Purchase Vault Guide
                  </h3>
                  <p className="text-xs text-[#A6AAA1]">
                    Architecture, security, and claim evidence
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-[#A6AAA1] hover:text-[#F4F1E8] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#A6AAA1]">
              <div className="p-3.5 rounded-xl bg-black/25 border border-white/6">
                <span className="font-bold text-[#F4F1E8] block mb-1">
                  1. Encrypted Document Storage
                </span>
                <p>
                  Every invoice and receipt is stored in isolated S3 buckets with server-side encryption. Zero data sharing or model leakage.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/25 border border-white/6">
                <span className="font-bold text-[#F4F1E8] block mb-1">
                  2. Deadline & Expiration Radar
                </span>
                <p>
                  Calculates return deadlines and warranty durations. EventBridge monitors deadlines and provides early warnings.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/25 border border-white/6">
                <span className="font-bold text-[#F4F1E8] block mb-1">
                  3. 1-Click ClaimReady Evidence
                </span>
                <p>
                  Pre-assembles serial numbers, tax invoices, purchase proof, and symptoms into a dossier for authorized warranty service centers.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowHelpModal(false);
                  showToast('Vault support: support@billback.ai');
                }}
                className="px-4 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
