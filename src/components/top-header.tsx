import React, { useState } from 'react';
import { Menu, Plus, Bell, Search, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  showGreeting?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  showGreeting = false,
}) => {
  const { navigate, setMobileMenuOpen, stats } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-[#101310]/90 backdrop-blur-md border-b border-white/6 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl text-[#A6AAA1] hover:bg-white/5 hover:text-[#F4F1E8] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Title or Vault Greeting */}
        <div>
          {showGreeting ? (
            <div>
              <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#A6AAA1] block mb-0.5">
                YOUR VAULT
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-editorial tracking-tight text-[#F4F1E8]">
                Good evening, Tanya.
              </h1>
              <p className="text-xs text-[#A6AAA1] font-normal line-clamp-1 mt-0.5">
                A clear view of what you own and what needs attention.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#A6AAA1] block mb-0.5">
                VAULT RECORD
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-editorial tracking-tight text-[#F4F1E8]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-[#A6AAA1] font-normal mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search trigger */}
        <button
          type="button"
          onClick={() => navigate('/ask-billback')}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/8 bg-[#17251F] text-[#A6AAA1] hover:text-[#F4F1E8] text-xs font-medium hover:border-white/15 transition-all shadow-xs"
          title="Search Vault (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search vault...</span>
          <kbd className="font-mono text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#A6AAA1]">⌘K</kbd>
        </button>

        {/* Notification Bell with Dropdown Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-[#A6AAA1] hover:bg-white/5 hover:text-[#F4F1E8] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {stats.expiringSoon > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E77E72] ring-2 ring-[#101310] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#17251F] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 text-[#F4F1E8]">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#A6AAA1]">
                  VAULT NOTIFICATIONS
                </span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-[#A6AAA1] hover:text-[#F4F1E8]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 space-y-2">
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/purchases/sony-wh-ch720n');
                  }}
                  className="p-3 rounded-xl bg-black/20 hover:bg-white/5 cursor-pointer transition-colors border border-white/6"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#F4F1E8] mb-1">
                    <span>Sony WH-CH720N</span>
                    <span className="text-[#E77E72] font-mono text-[11px]">2 days left</span>
                  </div>
                  <p className="text-[11px] text-[#A6AAA1]">
                    Amazon return window closes in 2 days.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/purchases/samsung-galaxy-m55');
                  }}
                  className="p-3 rounded-xl bg-black/20 hover:bg-white/5 cursor-pointer transition-colors border border-white/6"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#F4F1E8] mb-1">
                    <span>Samsung Galaxy M55</span>
                    <span className="text-[#B8A27B] font-mono text-[11px]">21 days left</span>
                  </div>
                  <p className="text-[11px] text-[#A6AAA1]">
                    Manufacturer warranty expiration approaching.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/expiring');
                  }}
                  className="text-xs font-semibold text-[#B7F36B] hover:underline"
                >
                  View All Urgent Items →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Compact Profile Avatar */}
        <div
          onClick={() => navigate('/settings')}
          className="w-8 h-8 rounded-lg bg-[#B7F36B]/20 border border-[#B7F36B]/40 text-[#B7F36B] flex items-center justify-center font-bold text-xs cursor-pointer hover:border-[#B7F36B] transition-all shadow-xs"
          title="Tanya Garg (Settings)"
        >
          TG
        </div>

        {/* Distinctive + Add Purchase Button */}
        <button
          type="button"
          onClick={() => navigate('/upload')}
          id="header-add-invoice-btn"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold tracking-wide shadow-xs shadow-[#B7F36B]/20 transition-all hover:scale-[1.01]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Purchase</span>
        </button>
      </div>
    </header>
  );
};
