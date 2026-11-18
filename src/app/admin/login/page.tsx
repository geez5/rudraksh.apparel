'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminSecret, setAdminSecret] = useState('')
  const [useSecretMode, setUseSecretMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          useSecretMode
            ? { adminSecret, email: email || 'admin@rudraksh.in' }
            : { email, password }
        ),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#35332F] text-[#F5F1E9] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#FEFCF8] text-[#35332F] p-8 sm:p-10 border border-[#D8C7B1] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#F5F1E9] border border-[#70745C]/40 flex items-center justify-center mx-auto text-[#70745C]">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-3xl font-light text-[#35332F] tracking-wide">
            RUDRAKSH
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#7A6555] font-sans font-semibold">
            Administrative Portal
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {!useSecretMode ? (
            <>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rudraksh.in"
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3.5 py-2.5 text-xs text-[#35332F] outline-none focus:border-[#35332F]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3.5 py-2.5 text-xs text-[#35332F] outline-none focus:border-[#35332F]"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                Admin Setup Secret Key
              </label>
              <input
                type="password"
                required
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Enter ADMIN_SETUP_SECRET"
                className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3.5 py-2.5 text-xs text-[#35332F] outline-none focus:border-[#35332F]"
              />
              <p className="text-[10px] text-[#7A6555] mt-1">
                Use the secret configured in .env or default dev key.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#35332F] text-[#F5F1E9] py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Console'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#35332F]/10">
          <button
            type="button"
            onClick={() => {
              setUseSecretMode(!useSecretMode)
              setError(null)
            }}
            className="text-[11px] text-[#7A6555] hover:text-[#35332F] underline"
          >
            {useSecretMode ? 'Switch to Email / Password login' : 'Or sign in using Setup Secret Key'}
          </button>
        </div>
      </div>
    </div>
  )
}
