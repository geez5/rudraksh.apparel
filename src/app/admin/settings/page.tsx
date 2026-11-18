'use client'

import React, { useState } from 'react'
import { Settings, Save, CheckCircle2, ShieldCheck, Mail, Globe, Phone, MapPin } from 'lucide-react'

export default function AdminSettingsPage() {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Configurable settings state
  const [settings, setSettings] = useState({
    catalogue_approval_mode: 'automatic', // 'automatic' | 'manual'
    catalogue_access_days: 30,
    email: 'export@rudraksh.in',
    phone: '+91 (0) 141 278 4000',
    whatsapp: '+91 98290 12345',
    address: 'Sitapura Industrial Apparel Zone, Jaipur, Rajasthan, India',
    instagram: 'https://instagram.com/rudraksh.apparel',
    linkedin: 'https://linkedin.com/company/rudraksh-apparel',
    notify_on_request: true,
    notify_on_enquiry: true,
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setFeedback('Global website settings updated successfully.')
      setTimeout(() => setFeedback(null), 3000)
    }, 600)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
          Configuration & Policies
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
          Website & Showroom Settings
        </h1>
        <p className="text-xs text-[#5C5A54] mt-1">
          Configure catalogue access workflows, company contacts, and transactional notification settings.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Section 1: Catalogue Access Protocol */}
        <div className="bg-[#FEFCF8] p-6 sm:p-8 border border-[#35332F]/10 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#35332F]/10">
            <ShieldCheck className="w-5 h-5 text-[#70745C]" />
            <h3 className="font-serif text-xl text-[#35332F]">Catalogue Approval Workflow</h3>
          </div>

          <div className="space-y-4">
            <label className="block font-medium uppercase tracking-wider text-[#35332F]">
              Select Showroom Approval Mode:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 border cursor-pointer transition-all ${
                  settings.catalogue_approval_mode === 'automatic'
                    ? 'border-[#35332F] bg-[#F5F1E9]'
                    : 'border-[#35332F]/10 bg-white hover:border-[#35332F]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mode"
                    value="automatic"
                    checked={settings.catalogue_approval_mode === 'automatic'}
                    onChange={() => setSettings({ ...settings, catalogue_approval_mode: 'automatic' })}
                    className="accent-[#35332F]"
                  />
                  <div>
                    <p className="font-semibold text-sm text-[#35332F]">Mode A: Automatic Approval</p>
                    <p className="text-[11px] text-[#5C5A54] mt-0.5 leading-relaxed">
                      Instant access granted as soon as buyer confirms their business email address.
                    </p>
                  </div>
                </div>
              </label>

              <label
                className={`p-4 border cursor-pointer transition-all ${
                  settings.catalogue_approval_mode === 'manual'
                    ? 'border-[#35332F] bg-[#F5F1E9]'
                    : 'border-[#35332F]/10 bg-white hover:border-[#35332F]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mode"
                    value="manual"
                    checked={settings.catalogue_approval_mode === 'manual'}
                    onChange={() => setSettings({ ...settings, catalogue_approval_mode: 'manual' })}
                    className="accent-[#35332F]"
                  />
                  <div>
                    <p className="font-semibold text-sm text-[#35332F]">Mode B: Manual Admin Review</p>
                    <p className="text-[11px] text-[#5C5A54] mt-0.5 leading-relaxed">
                      Buyer verifies email, then waits for administrator review in the Requests tab.
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="pt-2 max-w-xs">
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Default Access Duration (Days)
              </label>
              <input
                type="number"
                min={1}
                max={365}
                value={settings.catalogue_access_days}
                onChange={(e) => setSettings({ ...settings, catalogue_access_days: parseInt(e.target.value) || 30 })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-[#FEFCF8] p-6 sm:p-8 border border-[#35332F]/10 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#35332F]/10">
            <Mail className="w-5 h-5 text-[#70745C]" />
            <h3 className="font-serif text-xl text-[#35332F]">Public Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Business Sourcing Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Export Desk Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                WhatsApp Business Link
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Facility / Registered Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="bg-[#FEFCF8] p-6 sm:p-8 border border-[#35332F]/10 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#35332F]/10">
            <Globe className="w-5 h-5 text-[#70745C]" />
            <h3 className="font-serif text-xl text-[#35332F]">Social Presence</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Email Notifications */}
        <div className="bg-[#FEFCF8] p-6 sm:p-8 border border-[#35332F]/10 space-y-4">
          <h3 className="font-serif text-xl text-[#35332F]">Transactional Alerts</h3>
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notify_on_request}
                onChange={(e) => setSettings({ ...settings, notify_on_request: e.target.checked })}
                className="accent-[#35332F]"
              />
              <span className="text-[#35332F]">
                Send email alert to administrator when a new buyer submits a catalogue application
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notify_on_enquiry}
                onChange={(e) => setSettings({ ...settings, notify_on_enquiry: e.target.checked })}
                className="accent-[#35332F]"
              />
              <span className="text-[#35332F]">
                Send email alert to merchandising team on incoming sample specification inquiries
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#5C5A54] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </form>
    </div>
  )
}
