'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, ArrowDown, ArrowUp } from 'lucide-react'
import { DetailColumn, ClientIcon, InternalIcon } from './DetailColumn'
import { ViewMode } from '@/lib/constants'

interface HeaderProps {
  isMobile: boolean
  isReady: boolean
  showDetails: boolean
  setShowDetails: (show: boolean) => void
  showMobileMenu: boolean
  setShowMobileMenu: (show: boolean) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  resetApp: () => void
  handleContactClick: () => void
  copied: boolean
  time: string
  writings: any[]
  selectedWritingId: number | null
  setSelectedWritingId: (id: number | null) => void
  isEstimatorOpen: boolean
  setIsEstimatorOpen: (open: boolean) => void
}

const Header = ({
  isMobile,
  isReady,
  showDetails,
  setShowDetails,
  showMobileMenu,
  setShowMobileMenu,
  viewMode,
  setViewMode,
  resetApp,
  handleContactClick,
  copied,
  time,
  writings,
  selectedWritingId,
  setSelectedWritingId,
  isEstimatorOpen,
  setIsEstimatorOpen
}: HeaderProps) => {
  const selectedWriting = writings.find(w => w.id === selectedWritingId)

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-opacity duration-300 ${!isReady ? 'opacity-0' : 'opacity-100'}`}>
      {isMobile ? (
        <div className="flex flex-col px-5 pt-8 pb-3 gap-8">
          <div className="flex justify-between items-center">
            <button 
              onClick={resetApp}
              className="hover:opacity-60 transition-opacity"
            >
              <Globe size={18} strokeWidth={1} className="text-black/40" />
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setShowDetails(!showDetails)
                  setShowMobileMenu(false)
                }} 
                className={`text-[11px] font-medium flex items-center gap-1 leading-none uppercase tracking-wider ${showDetails ? 'text-black' : 'text-black/40'}`}
              >
                Details {showDetails ? '↑' : '↓'}
              </button>
              <button 
                onClick={() => {
                  setShowMobileMenu(!showMobileMenu)
                  setShowDetails(false)
                }} 
                className={`text-[11px] font-medium flex items-center gap-1 leading-none uppercase tracking-wider ${showMobileMenu ? 'text-black' : 'text-black/40'}`}
              >
                Menu {showMobileMenu ? '↑' : '↓'}
              </button>
            </div>
          </div>
          <div className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[11px] font-bold uppercase tracking-widest leading-none">OverHorizon</h1>
              {viewMode !== 'about' && (
                <button 
                onClick={resetApp}
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
              >
                Back to About
              </button>
              )}
            </div>
            <AnimatePresence mode="wait">
              {viewMode === 'about' ? (
                <motion.p 
                  key="desc"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[11px] leading-[1.3] text-black/60 max-w-[280px]"
                >
                  A design engineering studio building products and websites for AI and future-tech companies.
                </motion.p>
              ) : viewMode === 'writing' ? (
                <motion.div
                  key="writing"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="max-h-[300px] overflow-y-auto no-scrollbar pt-2"
                >
                  {!selectedWritingId ? (
                    <div className="space-y-1">
                      {writings.map((writing) => (
                        <div 
                          key={writing.id} 
                          onClick={() => setSelectedWritingId(writing.id)}
                          className="flex items-baseline justify-between py-2 border-b border-black/[0.05]"
                        >
                          <span className="text-[12px] text-black truncate pr-4">{writing.title}</span>
                          <span className="text-[9px] text-black/30 font-bold uppercase shrink-0">{writing.date}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 pb-4">
                      <p className="text-[13px] leading-[1.5] text-black/80">{selectedWriting?.content}</p>
                      <button onClick={() => setSelectedWritingId(null)} className="text-[10px] font-bold uppercase tracking-wider text-black/40">← Back to Journal</button>
                    </div>
                  )}
                </motion.div>
              ) : viewMode === 'os-tools' ? (
                <motion.div
                  key="os-tools"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 pt-2"
                >
                  <p className="text-[12px] leading-[1.4] text-black/80">
                    The R&D lab of OverHorizon. Build tools that remove stimulation and create space for work that matters.
                  </p>
                  <div className="p-4 bg-black/[0.02] rounded-2xl">
                     <h4 className="text-[12px] font-bold mb-1">Store®</h4>
                     <p className="text-[11px] text-black/50 mb-3">A place to find and purchase our high-end digital templates.</p>
                     <button onClick={() => setViewMode('template-store')} className="text-[11px] font-bold border-b border-black/20 pb-0.5">Explore Store &rarr;</button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-black/[0.05] pt-6 pb-2"
              >
                <div className="space-y-8">
                  <DetailColumn 
                    title="Leadership" 
                    items={[
                      "Ani Chisom",
                      { text: "Founder / Design Engineer - X", icon: null, href: "https://x.com" }
                    ]} 
                  />
                  <DetailColumn 
                    title="Services" 
                    items={[
                      "Frontend Engineering",
                      "Interaction Design",
                      "Integration Engineering (API Layer)",
                      "UX / Flow design",
                      "Creative Development (WebGL)"
                    ]} 
                  />
                  <DetailColumn 
                    title="Philosophy" 
                    items={[
                      "○ Care, obsessively",
                      "○ Build to elevate, not just execute",
                      "○ Extension of teams, not external vendors",
                      "○ Win in the details"
                    ]} 
                  />
                  <DetailColumn 
                    title="Contact" 
                    items={[
                      "anichisom4top@gmail.com",
                      "X (Twitter)"
                    ]} 
                    onAction={handleContactClick}
                    isCopied={copied}
                  />
                  <DetailColumn 
                    title="Location" 
                    items={[
                      "Based at the bottom of the world.",
                      "Partnering globally.",
                      `NZT: ${time}`
                    ]} 
                  />
                </div>
              </motion.div>
            )}

            {showMobileMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-black/[0.05] pt-6 pb-2"
              >
                <div className="space-y-8">
                  <DetailColumn 
                    title="Index" 
                    items={[
                      { text: "Weekly Journal", onClick: () => { setViewMode('writing'); setSelectedWritingId(null); setShowMobileMenu(false); } },
                      { text: "Get an Instant Estimate", onClick: () => { setIsEstimatorOpen(true); setShowMobileMenu(false); } },
                      { text: "OS Software®", onClick: () => { setViewMode('os-tools'); setShowMobileMenu(false); } }
                    ]} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full h-px bg-black/[0.05]" />
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto px-6 py-8 md:px-10 md:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-8 items-start shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
          {/* Logo */}
          <div className="lg:col-span-3 header-logo">
            <h1 className="text-[28px] md:text-[32px] font-normal tracking-tight leading-none">OverHorizon</h1>
          </div>

          {/* Index */}
          <div className="lg:col-span-2 header-index">
            <button 
              onClick={resetApp}
              className="text-[10px] md:text-[11px] font-medium text-black/40 uppercase mb-3 md:mb-4 hover:text-black transition-colors text-left w-full"
            >
              Index
            </button>
            <nav className="flex flex-col space-y-2 md:space-y-0.5">
              <button 
                onClick={() => {
                  setViewMode('writing')
                  setSelectedWritingId(null)
                }}
                className={`text-[13px] text-left transition-all ${viewMode === 'writing' ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100'}`}
              >
                Weekly Journal
              </button>
              <button 
                onClick={() => setIsEstimatorOpen(true)}
                className={`text-[13px] text-left transition-all ${isEstimatorOpen ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100'}`}
              >
                Get an Instant Estimate
              </button>
              <button 
                onClick={() => {
                  setViewMode('os-tools')
                  setSelectedWritingId(null)
                }}
                className={`text-[13px] text-left transition-all ${viewMode === 'os-tools' ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100'}`}
              >
                OS Software®
              </button>
              <button 
                onClick={() => {
                  handleContactClick()
                  setSelectedWritingId(null)
                }}
                className={`text-[13px] text-left transition-all ${viewMode === 'about' ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100'} lg:hidden`}
              >
                {copied ? 'Email Copied' : 'Contact'}
              </button>
            </nav>
          </div>

          {/* About / Dynamic Content */}
          <div className="lg:col-span-5 lg:pr-12 header-about">
            <AnimatePresence mode="wait">
              {viewMode === 'about' ? (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-[10px] md:text-[11px] font-medium text-black/40 uppercase mb-3 md:mb-4">About OverHorizon</h4>
                  <p className="text-[14px] md:text-[15px] leading-[1.4] text-black font-normal max-w-full md:max-w-[340px]">
                    OverHorizon is a design sensitive engineering studio building products and websites for AI and future-tech companies. Teams bring us in when taste, feel, and care matter.
                  </p>
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-5 md:mt-6 flex items-center gap-1.5 text-[13px] font-medium group h-8 md:h-auto"
                  >
                    <span className="border-b border-transparent group-hover:border-black transition-colors">
                      {showDetails ? 'Close Studio Details' : 'See Studio Details'}
                    </span>
                    {showDetails ? <ArrowUp size={12} strokeWidth={2.5} /> : <ArrowDown size={12} strokeWidth={2.5} />}
                  </button>
                </motion.div>
              ) : viewMode === 'writing' ? (
                <motion.div
                  key="writing"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h4 className="text-[10px] md:text-[11px] font-medium text-black/40 uppercase">
                      {selectedWritingId ? `Writing / ${selectedWriting?.title}` : 'Writings'}
                    </h4>
                    {selectedWritingId && (
                      <button 
                        onClick={() => setSelectedWritingId(null)}
                        className="text-[10px] uppercase tracking-wider font-medium opacity-40 hover:opacity-100 transition-opacity"
                      >
                        Back to list
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {!selectedWritingId ? (
                      <motion.div 
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1"
                      >
                        {writings.map((writing) => (
                          <div 
                            key={writing.id} 
                            onClick={() => setSelectedWritingId(writing.id)}
                            className="flex items-baseline justify-between group cursor-pointer border-b border-black/5 py-1.5 md:py-1"
                          >
                            <span className="text-[13px] text-black/80 group-hover:text-black transition-colors truncate pr-4">
                              {writing.title}
                            </span>
                            <span className="text-[11px] text-black/30 group-hover:text-black/50 transition-colors uppercase shrink-0">
                              {writing.date}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-[640px]"
                      >
                        <div className="flex gap-4 mb-4">
                          <span className="text-[10px] px-1.5 py-0.5 bg-black/5 text-black/60 rounded uppercase font-medium">{selectedWriting?.category}</span>
                          <span className="text-[10px] text-black/30 uppercase font-medium self-center">{selectedWriting?.date}</span>
                        </div>
                        <p className="text-[15px] leading-[1.6] text-black/80 font-normal">
                          {selectedWriting?.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="os-tools"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-[10px] md:text-[11px] font-medium text-black/40 uppercase mb-3 md:mb-4">OverHorizon Tools®</h4>
                  <p className="text-[14px] md:text-[15px] leading-[1.4] text-black font-normal max-w-full md:max-w-[340px]">
                    The R&D lab of OverHorizon. A place to test ideas, sharpen our craft, and build what we wish existed. The ethos here is simple: Build tools that remove stimulation and create space for work that matters.
                  </p>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group cursor-pointer">
                      <h4 className="text-[13px] md:text-[13px] font-medium mb-1.5 flex items-center gap-2">
                         Template Store
                         <span className="text-[9px] px-1 bg-black/5 rounded">Beta</span>
                      </h4>
                      <p className="text-[12px] md:text-[13px] leading-relaxed text-black/50 max-w-full md:max-w-[340px] mb-3">
                        A curated collection of web patterns, components, and full sites built with care and obsessed-over details.
                      </p>
                      <button 
                        onClick={() => setViewMode('template-store')}
                        className="text-[12px] font-medium border-b border-black/20 pb-0.5 hover:border-black/100 transition-colors uppercase tracking-widest"
                      >
                        Explore Store &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Email */}
          <div className="lg:col-span-2 text-right hidden lg:block header-email">
            <button 
              onClick={handleContactClick}
              className="text-[13px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {copied ? 'Email copied' : 'anichisom4top@gmail.com'}
            </button>
          </div>
        </div>
      )}

      {/* Expandable Details Section Desktop */}
      <AnimatePresence>
        {showDetails && !isMobile && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white"
          >
            <div className="max-w-[1800px] mx-auto px-6 pb-12 pt-0 md:px-10 md:pb-20 md:pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12 md:gap-x-8">
              <DetailColumn 
                className="detail-column"
                title="Leadership" 
                items={[
                  "Ani Chisom",
                  { text: "Founder / Design Engineer - X", icon: null, href: "https://x.com" }
                ]} 
                onAction={handleContactClick}
                isCopied={copied}
              />
              <DetailColumn 
                className="detail-column"
                title="Services" 
                items={[
                  "Frontend Engineering",
                  "Interaction Design",
                  "Integration Engineering (API Layer)",
                  "UX / Flow design",
                  "Creative Development (WebGL)",
                  "Marketing and Ads Strategy",
                  "Content and Copywriting",
                  "Brand Identity"
                ]} 
              />
              <DetailColumn 
                className="detail-column"
                title="Labels" 
                items={[
                  { text: "Client", icon: <ClientIcon /> },
                  { text: "Internal", icon: <InternalIcon /> }
                ]} 
              />
              <div className="flex flex-col gap-10 md:gap-12 detail-column">
                 <DetailColumn 
                  title="Philosophy" 
                  items={[
                    "○ Care, obsessively",
                    "○ Build to elevate, not just execute",
                    "○ Extension of teams, not external vendors",
                    "○ Win in the details"
                  ]} 
                />
                <DetailColumn 
                  className="hidden lg:flex"
                  title="Contact" 
                  items={[
                    "anichisom4top@gmail.com",
                    "X (Twitter)"
                  ]} 
                  onAction={handleContactClick}
                  isCopied={copied}
                />
                <DetailColumn 
                  title="Location" 
                  items={[
                    "Based at Western Part of the world.",
                    "Partnering globally.",
                    `EUR: ${time}`
                  ]} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
