'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Lock } from 'lucide-react'

function VerifyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [approvalMode, setApprovalMode] = useState<'automatic' | 'manual'>('automatic')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setErrorMessage('No verification token provided in URL.')
      setLoading(false)
      return
    }

    const verify = async () => {
      try {
        const res = await fetch('/api/verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Verification failed')
        }

        setSuccess(true)
        setApprovalMode(data.approval_mode || 'automatic')
      } catch (err: any) {
        setErrorMessage(err.message || 'Verification failed')
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [token, email])

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-8">
      <div className="max-w-lg w-full bg-[#FEFCF8] p-8 sm:p-12 border border-[#35332F]/10 shadow-sm text-center">
        {loading ? (
          <div className="space-y-4 py-8">
            <div className="w-10 h-10 border-2 border-[#70745C] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="font-serif text-2xl text-[#35332F]">Verifying Your Access Credentials...</h2>
            <p className="text-xs text-[#5C5A54]">Cryptographic security checks in progress.</p>
          </div>
        ) : errorMessage ? (
          <div className="space-y-5 py-4 animate-in fade-in">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#35332F]">
              Verification Could Not Be Completed
            </h2>
            <p className="text-sm text-[#5C5A54] leading-relaxed max-w-sm mx-auto">
              {errorMessage}
            </p>
            <div className="pt-4">
              <Link
                href="/catalogue-request"
                className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-7 py-3 text-xs tracking-widest uppercase hover:bg-[#5C5A54] transition-colors"
              >
                <span>Request New Access Link</span>
              </Link>
            </div>
          </div>
        ) : approvalMode === 'automatic' ? (
          <div className="space-y-6 py-4 animate-in fade-in">
            <div className="w-16 h-16 bg-[#F5F1E9] text-[#70745C] rounded-full flex items-center justify-center mx-auto border border-[#70745C]/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
                Access Granted
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light">
                Welcome to RUDRAKSH
              </h2>
            </div>
            <p className="text-sm text-[#5C5A54] leading-relaxed max-w-sm mx-auto">
              Your business email has been confirmed. Your session is active for the next 30 days. You may now explore our full digital line sheets and submit direct production inquiries.
            </p>
            <div className="pt-2">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-all shadow-md"
              >
                <span>Enter Private Digital Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4 animate-in fade-in">
            <div className="w-16 h-16 bg-[#F5F1E9] text-[#A18A73] rounded-full flex items-center justify-center mx-auto border border-[#A18A73]/40">
              <Clock className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
                Email Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light">
                Request Under Review
              </h2>
            </div>
            <p className="text-sm text-[#5C5A54] leading-relaxed max-w-sm mx-auto">
              Thank you for verifying your email address. In accordance with our security policies, our commercial team is conducting a brief review of your brand details. You will receive an access notification email as soon as approval is finalized.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#35332F] hover:text-[#7A6555]"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#35332F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  )
}
