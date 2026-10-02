import React, { useState } from 'react';
import {
  User,
  Bell,
  Clock,
  Shield,
  Palette,
  CheckCircle2,
  Lock,
  Download,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useApp();

  const [profileName, setProfileName] = useState('Tanya Garg');
  const [profileEmail, setProfileEmail] = useState('tanyagarg5315@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [currency, setCurrency] = useState('INR (₹)');

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [leadTimeDays, setLeadTimeDays] = useState('3');
  const [warrantyLeadTime, setWarrantyLeadTime] = useState('30');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Preferences updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#F4F1E8] tracking-tight">
          Settings
        </h2>
        <p className="text-xs text-[#A6AAA1] mt-0.5">
          Manage your profile, deadline reminders, notifications, and privacy preferences.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Profile */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 pb-4 border-b border-white/8 mb-6">
            <User className="w-5 h-5 text-[#B7F36B]" />
            <h3 className="text-base font-bold text-[#F4F1E8]">Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                Phone Number (for SMS & WhatsApp reminders)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B]"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                Default Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 focus:border-[#B7F36B] font-medium"
              >
                <option className="bg-[#17251F] text-[#F4F1E8]">INR (₹) - Indian Rupee</option>
                <option className="bg-[#17251F] text-[#F4F1E8]">USD ($) - US Dollar</option>
                <option className="bg-[#17251F] text-[#F4F1E8]">EUR (€) - Euro</option>
                <option className="bg-[#17251F] text-[#F4F1E8]">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 pb-4 border-b border-white/8 mb-6">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-[#F4F1E8]">Notifications</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/8">
              <div>
                <span className="font-bold text-[#F4F1E8] block mb-0.5">Email Notifications</span>
                <span className="text-[#A6AAA1]">
                  Receive invoice summaries, return window reminders, and warranty updates.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  emailAlerts ? 'bg-[#B7F36B]' : 'bg-white/10'
                }`}
              >
                <div
                  className={`bg-[#101310] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    emailAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/20 border border-white/8">
              <div>
                <span className="font-bold text-[#F4F1E8] block mb-0.5">WhatsApp Alerts</span>
                <span className="text-[#A6AAA1]">
                  High-priority alerts 24 hours before a return window closes.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  whatsappAlerts ? 'bg-[#B7F36B]' : 'bg-white/10'
                }`}
              >
                <div
                  className={`bg-[#101310] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    whatsappAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Deadline Reminders */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 pb-4 border-b border-white/8 mb-6">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-[#F4F1E8]">Deadline Reminders</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                First Return Deadline Reminder
              </label>
              <select
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 font-medium"
              >
                <option value="1" className="bg-[#17251F] text-[#F4F1E8]">1 day before expiry</option>
                <option value="2" className="bg-[#17251F] text-[#F4F1E8]">2 days before expiry</option>
                <option value="3" className="bg-[#17251F] text-[#F4F1E8]">3 days before expiry (Recommended)</option>
                <option value="5" className="bg-[#17251F] text-[#F4F1E8]">5 days before expiry</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#A6AAA1] block mb-1.5">
                Warranty Expiry Alert Window
              </label>
              <select
                value={warrantyLeadTime}
                onChange={(e) => setWarrantyLeadTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-[#F4F1E8] focus:outline-none focus:ring-2 focus:ring-[#B7F36B]/20 font-medium"
              >
                <option value="15" className="bg-[#17251F] text-[#F4F1E8]">15 days before warranty ends</option>
                <option value="30" className="bg-[#17251F] text-[#F4F1E8]">30 days before warranty ends</option>
                <option value="60" className="bg-[#17251F] text-[#F4F1E8]">60 days before warranty ends</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Data & Security */}
        <div className="bg-[#17251F] border border-white/8 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 pb-4 border-b border-white/8 mb-6">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-[#F4F1E8]">Data & Privacy</h3>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-[#A6AAA1]">
              Your invoices and personal purchase logs are encrypted and private to your account.
              You retain 100% data ownership.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => showToast('Data archive download started')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/8 hover:bg-white/12 text-[#F4F1E8] border border-white/10 rounded-xl font-bold transition-colors"
              >
                <Download className="w-4 h-4 text-[#A6AAA1]" />
                <span>Export Complete Ledger</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#B7F36B] hover:bg-[#c5f784] text-[#101310] rounded-xl text-xs font-bold shadow-md shadow-[#B7F36B]/20 transition-all hover:scale-[1.01]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
