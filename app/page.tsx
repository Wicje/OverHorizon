'use client'

import React, { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// modular imports
import { projects, writings, ViewMode } from '@/lib/constants'
import Header from '@/components/ui/Header'
import IntroOverlay from '@/components/intro/IntroOverlay'
import BallparkEstimator from '@/components/sections/BallparkEstimator'
import TemplateStoreSection from '@/components/sections/TemplateStoreSection'
import ProjectCardsSection from '@/components/sections/ProjectCardsSection'
import PartnersSection from '@/components/sections/PartnersSection'

export default function OverStimulatedApp() {
  const isMobile = useIsMobile()
  const [isReady, setIsReady] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('about')
  const [time, setTime] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [selectedWritingId, setSelectedWritingId] = useState<number | null>(null)
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false)

  useEffect(() => {
    // Auto transition to ready state if overlay doesn't trigger
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    setViewMode('about')
    navigator.clipboard.writeText('anichisom4top@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetApp = () => {
    setViewMode('about')
    setIsEstimatorOpen(false)
    setShowDetails(false)
    setShowMobileMenu(false)
    setSelectedWritingId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useGSAP(() => {
    if (!isReady) return

    // Initial Entrance for Header Elements
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })
    
    tl.from('.header-logo', { y: 30, opacity: 0, delay: 0.2 })
      .from('.header-index > *', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.9')
      .from('.header-about > *', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.9')
      .from('.header-email', { x: 30, opacity: 0 }, '-=0.9')

  }, [isReady])

  useGSAP(() => {
    if (showDetails) {
      const tl = gsap.timeline()
      tl.from('.detail-column', {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1
      })
      .from('.detail-item', {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.6')
    }
  }, [showDetails])

  return (
    <main className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* Background Overlay for Expand state */}
      <div 
        className={`fixed inset-0 z-40 bg-white/20 backdrop-blur-3xl transition-opacity duration-700 pointer-events-none ${showDetails ? 'opacity-100' : 'opacity-0'}`} 
      />

      <BallparkEstimator 
        isOpen={isEstimatorOpen} 
        onClose={() => setIsEstimatorOpen(false)} 
      />
      
      <TemplateStoreSection 
        projects={projects} 
        isOpen={viewMode === 'template-store'} 
        onClose={() => setViewMode('about')} 
        isMobile={isMobile} 
      />

      <Header 
        isMobile={isMobile}
        isReady={isReady}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        viewMode={viewMode}
        setViewMode={setViewMode}
        resetApp={resetApp}
        handleContactClick={handleContactClick}
        copied={copied}
        time={time}
        writings={writings}
        selectedWritingId={selectedWritingId}
        setSelectedWritingId={setSelectedWritingId}
        isEstimatorOpen={isEstimatorOpen}
        setIsEstimatorOpen={setIsEstimatorOpen}
      />

      <IntroOverlay 
        isReady={isReady} 
        setIsReady={setIsReady} 
      />

      <ProjectCardsSection 
        projects={projects} 
        isMobile={isMobile} 
        showDetails={showDetails} 
      />

      <PartnersSection />

      {/* Global Scrollbar Customization */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
