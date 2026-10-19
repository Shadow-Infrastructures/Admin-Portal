import { useState } from 'react';
import { Bell, Globe, Shield, Mail, Save } from 'lucide-react';
import { Card, SectionHeader, PrimaryButton } from '@/components/ui';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newLoans: true,
    priceAlerts: true,
    userSignups: false,
    weeklyDigest: true,
  });
  const [security, setSecurity] = useState({
    twoFA: true,
    sessionTimeout: true,
    ipWhitelist: false,
  });

  return (
    <div className="space-y-5 max-w-3xl">
      {/* General */}
      <Card className="p-5">
        <SectionHeader title="General Settings" />
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center"><Globe className="w-5 h-5 text-brand-teal" /></div>
              <div>
                <p className="text-sm font-medium text-brand-charcoal">Platform Name</p>
                <p className="text-xs text-gray-400">Displayed across the portal</p>
              </div>
            </div>
            <input defaultValue="MyHome" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-brand-charcoal border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all w-40" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-dark/10 flex items-center justify-center"><Mail className="w-5 h-5 text-brand-dark" /></div>
              <div>
                <p className="text-sm font-medium text-brand-charcoal">Support Email</p>
                <p className="text-xs text-gray-400">For user inquiries</p>
              </div>
            </div>
            <input defaultValue="support@myhome.com" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-brand-charcoal border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all w-48" />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-5">
        <SectionHeader title="Notification Preferences" />
        <div className="space-y-1">
          {Object.entries({
            newLoans:    { label: 'New Loan Applications', desc: 'Alert when a loan is submitted' },
            priceAlerts: { label: 'Price Change Alerts',  desc: 'Notify on significant price movements' },
            userSignups: { label: 'New User Signups',     desc: 'Alert when a user registers' },
            weeklyDigest:{ label: 'Weekly Digest',         desc: 'Summary email every Monday' },
          }).map(([key, info]) => (
            <div key={key} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-brand-charcoal">{info.label}</p>
                  <p className="text-xs text-gray-400">{info.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${notifications[key as keyof typeof notifications] ? 'bg-brand-teal' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifications[key as keyof typeof notifications] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-5">
        <SectionHeader title="Security Settings" />
        <div className="space-y-1">
          {Object.entries({
            twoFA:          { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts' },
            sessionTimeout: { label: 'Session Timeout',           desc: 'Auto-logout after 30 minutes inactivity' },
            ipWhitelist:    { label: 'IP Whitelist',              desc: 'Restrict portal access to specific IPs' },
          }).map(([key, info]) => (
            <div key={key} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-brand-charcoal">{info.label}</p>
                  <p className="text-xs text-gray-400">{info.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setSecurity(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${security[key as keyof typeof security] ? 'bg-brand-teal' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${security[key as keyof typeof security] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Changes</span></PrimaryButton>
      </div>
    </div>
  );
}
