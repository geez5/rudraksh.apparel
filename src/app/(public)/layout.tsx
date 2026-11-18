import React from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E9] text-[#35332F]">
      <Header />
      <div className="flex-1 pt-20 sm:pt-24">{children}</div>
      <Footer />
    </div>
  )
}
