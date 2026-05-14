'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, Check, MoveUpRight } from 'lucide-react'
import { LogoIcon } from '../intro/IntroHelpers'

interface BallparkEstimatorProps {
  isOpen: boolean
  onClose: () => void
}

const BallparkEstimator = ({ isOpen, onClose }: BallparkEstimatorProps) => {
  const [step, setStep] = useState<string>('intro')
  const [category, setCategory] = useState<string>('')
  const [pages, setPages] = useState(3)
  const [designComplexity, setDesignComplexity] = useState('Standard')
  const [illustrations, setIllustrations] = useState('None')
  const [animations, setAnimations] = useState('None')
  const [features, setFeatures] = useState<string[]>([])
  const [cms, setCms] = useState('None')
  const [integrations, setIntegrations] = useState(0)
  const [database, setDatabase] = useState('None')
  const [apis, setApis] = useState(0)
  const [dataComplexity, setDataComplexity] = useState('None')
  const [realtime, setRealtime] = useState('None')
  const [authMethods, setAuthMethods] = useState<string[]>([])
  const [deliverables, setDeliverables] = useState<string[]>([])
  const [timeline, setTimeline] = useState('1 month')
  const [specifics, setSpecifics] = useState<string>('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { label: 'Frontend Engineering', base: 6500, type: 'dev' },
    { label: 'Interaction Design', base: 4500, type: 'design' },
    { label: 'Integration Engineering', base: 7500, type: 'integration' },
    { label: 'UX / Flow Design', base: 5000, type: 'design' },
    { label: 'Creative Dev (WebGL)', base: 8500, type: 'design' },
    { label: 'AI Development', base: 9500, type: 'ai' },
    { label: 'Web Design', base: 4500, type: 'design' },
    { label: 'Website Development', base: 6000, type: 'web' },
    { label: 'Marketing and Ads Strategy', base: 4000, type: 'strategy' },
    { label: 'Content and Copywriting', base: 3500, type: 'content' },
    { label: 'Branding Identity', base: 5000, type: 'branding' },
  ]

  const calculateEstimate = () => {
    const catObj = categories.find(c => c.label === category)
    let total = catObj ? catObj.base : 5000

    // Per page
    total += (pages * 800)

    // Design Complexity
    if (designComplexity === 'Moderate') total += 1500
    if (designComplexity === 'High') total += 3000

    // Illustrations
    if (illustrations === 'Few') total += 1200
    if (illustrations === 'Extensive') total += 2500

    // Animations
    if (animations === 'Subtle') total += 800
    if (animations === 'Advanced') total += 2000

    // Features
    if (features.includes('User accounts & login')) total += 1500
    if (features.includes('Search functionality')) total += 1200
    if (features.includes('Payment processing')) total += 2000
    if (features.includes('Messaging system')) total += 1800
    if (features.includes('Analytics dashboard')) total += 1500

    // CMS
    if (cms === 'Basic CMS') total += 1500
    if (cms === 'Full-featured CMS') total += 3000

    // Integrations
    total += (integrations * 800)

    // Database
    if (database === 'Moderate') total += 1500
    if (database === 'Complex') total += 3000

    // APIs
    total += (apis * 1500)

    // Data Complexity
    if (dataComplexity === 'Moderate') total += 1000
    if (dataComplexity === 'Complex') total += 2500

    // Real-time
    if (realtime === 'Some') total += 1500
    if (realtime === 'Full') total += 3000

    // Auth Methods
    if (authMethods.includes('API keys')) total += 500
    if (authMethods.includes('OAuth 2.0')) total += 1000
    if (authMethods.includes('JWT tokens')) total += 800
    if (authMethods.includes('Multi-factor auth')) total += 1200

    // Deliverables
    if (deliverables.includes('Source Code')) total += 500
    if (deliverables.includes('Design Assets')) total += 800
    if (deliverables.includes('Documentation')) total += 400
    if (deliverables.includes('Hosting Setup')) total += 600
    if (deliverables.includes('SEO Optimization')) total += 1000

    // Timeline
    if (timeline === 'ASAP') total *= 1.3
    if (timeline === '1 week') total *= 1.2
    if (timeline === '2 weeks') total *= 1.1
    if (timeline === '1 month') total *= 1.0
    if (timeline === '2 months') total *= 0.9

    // Rounding to nearest 250
    total = Math.round(total / 250) * 250

    return total
  }

  const handleFinish = async () => {
    if (!email) return
    setLoading(true)
    setError(null)
    const estimateValue = calculateEstimate()
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    
    // Range +/- 10%
    const lower = Math.round((estimateValue * 0.9) / 250) * 250
    const upper = Math.round((estimateValue * 1.1) / 250) * 250
    const formattedRange = `${formatter.format(lower)} - ${formatter.format(upper)}`
    
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          userName,
          estimate: formattedRange,
          details: [
            `Category: ${category}`,
            `Pages/Screens: ${pages}`,
            `Design Complexity: ${designComplexity}`,
            `Illustrations: ${illustrations}`,
            `Animations: ${animations}`,
            `Features: ${features.join(', ')}`,
            `CMS: ${cms}`,
            `Integrations: ${integrations}`,
            `Database: ${database}`,
            `APIs: ${apis}`,
            `Data Complexity: ${dataComplexity}`,
            `Real-time: ${realtime}`,
            `Auth: ${authMethods.length > 0 ? authMethods.join(', ') : 'None'}`,
            `Deliverables: ${deliverables.length > 0 ? deliverables.join(', ') : 'Standard'}`,
            `Timeline: ${timeline}`
          ]
        })
      })
      
      if (res.ok) {
        setStep('success')
      } else {
        const data = await res.json()
        setError(data.error || 'Connection error')
      }
    } catch (e) {
      setError('Network error. Check settings.')
    } finally {
      setLoading(false)
    }
  }

  const stepsByType: Record<string, string[]> = {
    'design': ['intro', 'name', 'category', 'screens', 'complexity', 'illustrations', 'animations', 'deliverables', 'timeline', 'email', 'success'],
    'web': ['intro', 'name', 'category', 'screens', 'features', 'cms', 'integrations', 'database', 'deliverables', 'timeline', 'email', 'success'],
    'integration': ['intro', 'name', 'category', 'apis', 'dataComplexity', 'realtime', 'auth', 'deliverables', 'timeline', 'email', 'success'],
    'ai': ['intro', 'name', 'category', 'screens', 'dataComplexity', 'realtime', 'deliverables', 'timeline', 'email', 'success'],
    'content': ['intro', 'name', 'category', 'screens', 'deliverables', 'timeline', 'email', 'success'],
    'strategy': ['intro', 'name', 'category', 'screens', 'deliverables', 'timeline', 'email', 'success'],
    'dev': ['intro', 'name', 'category', 'screens', 'features', 'integrations', 'database', 'deliverables', 'timeline', 'email', 'success'],
    'branding': ['intro', 'name', 'category', 'screens', 'complexity', 'illustrations', 'deliverables', 'timeline', 'email', 'success']
  }

  const catType = categories.find(c => c.label === category)?.type || 'design'
  const stepsOrder = stepsByType[catType]
  const currentStepIndex = stepsOrder.includes(step) ? stepsOrder.indexOf(step) : 2
  const currentProgress = (currentStepIndex / (stepsOrder.length - 1)) * 100

  const handleCategorySelect = (selected: string) => {
    setCategory(selected)
    const cat = categories.find(c => c.label === selected)
    const nextStep = stepsByType[cat?.type || 'design'][3] // name, category are first 3 (0,1,2)
    setStep(nextStep)
  }

  const bubbleVariants = {
    initial: { opacity: 0, y: 15, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 80, x: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, x: 20, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          className="fixed bottom-8 right-8 z-[100] w-full max-w-[240px] min-h-[320px] bg-white/75 backdrop-blur-2xl rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.4)] border border-black/[0.03] overflow-hidden flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <LogoIcon />
              <span className="text-[10px] font-bold tracking-tight text-black">OverHorizon®</span>
            </div>
            {step !== 'intro' && step !== 'success' && (
              <button 
                onClick={onClose}
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
              >
                <ArrowDown size={14} className="text-black/30" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {step === 'intro' ? (
              <motion.div 
                key="intro"
                {...bubbleVariants}
                className="flex-1 p-5 flex flex-col items-start justify-center pt-14"
              >
                <h2 className="text-[20px] font-bold leading-[1.05] text-black tracking-tight mb-6 max-w-[180px]">
                  Looking for an estimated price for your project?
                </h2>
                <button 
                  onClick={() => setStep('name')}
                  className="w-full py-3 bg-[#4A4A4A] text-white rounded-full font-medium text-[13px] hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mb-4 shadow-lg shadow-black/10"
                >
                  Get started <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <div className="w-full text-center">
                  <span className="text-black/20 text-[9px] font-bold uppercase tracking-[0.2em]">Powered by Ballpark</span>
                </div>
              </motion.div>
            ) : step === 'success' ? (
              <motion.div 
                key="success"
                {...bubbleVariants}
                className="flex-1 p-5 flex flex-col items-center justify-center pt-14 text-center"
              >
                <div className="mb-4 p-2.5 bg-black/[0.02] rounded-full">
                  <Check size={20} className="text-black/40" />
                </div>
                <h2 className="text-[20px] font-bold leading-[1.1] text-black tracking-tight mb-2">
                  Check your inbox!
                </h2>
                <p className="text-[11px] text-black/40 mb-5 max-w-[160px]">We&apos;ve sent the detailed estimate to your email.</p>
                <button 
                  onClick={() => {
                    setStep('intro')
                    setCategory('')
                    setPages(3)
                    setEmail('')
                    setUserName('')
                    onClose()
                  }}
                  className="text-black/60 hover:text-black transition-colors text-[13px] font-bold underline underline-offset-4"
                >
                  Close widget
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                {...bubbleVariants}
                className="flex-1 flex flex-col pt-14 px-5 pb-4"
              >
                {/* Scrollable messages area */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 mb-4">
                  {step === 'name' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-3 rounded-2xl rounded-bl-none max-w-[90%] text-[13px] leading-[1.4] mb-2 shadow-sm">
                        Hey! I&apos;m Will. What&apos;s your name?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'category' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Nice to meet you, {userName}. What space do you operate in?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'complexity' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        How would you describe the design complexity?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'illustrations' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Do you need custom illustrations?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'animations' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Level of animations or interactive elements?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'features' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Which custom features do you need?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'cms' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Do you need a CMS for updates?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'integrations' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        How many third-party integrations (CRM, Email, etc)?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'database' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        How complex is your data structure?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'apis' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        How many APIs do you need to integrate?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'dataComplexity' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Complexity of the data being transferred?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'realtime' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Do you need real-time sync?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'auth' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Which authentication methods do you require? (You can skip if not needed)
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'deliverables' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        What deliverables do you expect?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'screens' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        How many pages/screens do you need?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}
                  
                  {step === 'timeline' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        What is your preferred project timeline?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}

                  {step === 'email' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-black/[0.03] text-black p-4 rounded-2xl rounded-bl-none max-w-[90%] text-[14px] leading-[1.4] mb-2 shadow-sm">
                        Where should we send your project estimate?
                      </div>
                      <div className="text-[8px] text-black/20 font-bold uppercase tracking-[0.2em] pl-1">Will from Ballpark</div>
                    </motion.div>
                  )}
                </div>

                {/* Input area */}
                <div className="space-y-3">
                  {step === 'name' && (
                    <div className="relative group">
                      <input 
                        autoFocus
                        className="w-full bg-black/[0.02] border border-black/[0.05] rounded-[20px] p-3.5 pr-12 text-[14px] outline-none focus:bg-white focus:border-black/20 transition-all text-black"
                        placeholder="Your name.."
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && userName && setStep('category')}
                      />
                      <button 
                        onClick={() => userName && setStep('category')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-black/20 hover:text-black transition-colors"
                      >
                        <MoveUpRight size={18} />
                      </button>
                    </div>
                  )}

                  {step === 'category' && (
                    <div className="grid grid-cols-1 gap-0.5 max-h-[140px] overflow-y-auto no-scrollbar border-t border-black/[0.05] pt-4">
                      {categories.map(c => (
                        <button 
                          key={c.label}
                          onClick={() => handleCategorySelect(c.label)}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {c.label}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'complexity' && (
                    <div className="grid grid-cols-1 gap-0.5 border-t border-black/[0.05] pt-4">
                      {['Standard', 'Moderate with custom elements', 'Highly complex and unique'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setDesignComplexity(opt.includes('Moderate') ? 'Moderate' : opt.includes('Highly') ? 'High' : 'Standard'); 
                            const nextStep = stepsOrder[stepsOrder.indexOf(step) + 1];
                            setStep(nextStep); 
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'illustrations' && (
                    <div className="grid grid-cols-1 gap-0.5 border-t border-black/[0.05] pt-4">
                      {['None', 'A few illustrations', 'Extensive custom artwork'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setIllustrations(opt.includes('few') ? 'Few' : opt.includes('Extensive') ? 'Extensive' : 'None'); 
                            const nextStep = stepsOrder[stepsOrder.indexOf(step) + 1];
                            setStep(nextStep); 
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'animations' && (
                    <div className="grid grid-cols-1 gap-0.5 border-t border-black/[0.05] pt-4">
                      {['None', 'Subtle animations', 'Advanced interactive effects'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setAnimations(opt.includes('Subtle') ? 'Subtle' : opt.includes('Advanced') ? 'Advanced' : 'None'); 
                            const nextStep = stepsOrder[stepsOrder.indexOf(step) + 1];
                            setStep(nextStep); 
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'features' && (
                    <div className="space-y-1 border-t border-black/[0.05] pt-4">
                      {['User accounts & login', 'Search functionality', 'Payment processing', 'Messaging system', 'Analytics dashboard'].map(feat => (
                        <button 
                          key={feat}
                          onClick={() => {
                            setFeatures(prev => prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat])
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-[12px] font-bold transition-all flex items-center justify-between ${features.includes(feat) ? 'bg-black text-white shadow-md' : 'text-black/30 hover:text-black hover:bg-black/[0.02]'}`}
                        >
                          {feat}
                          {features.includes(feat) && <Check size={12} />}
                        </button>
                      ))}
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full mt-3 py-2.5 bg-black text-white rounded-full font-bold text-[11px] uppercase tracking-widest active:scale-[0.98] transition-transform shadow-lg">Confirm Features</button>
                    </div>
                  )}

                  {step === 'cms' && (
                    <div className="grid grid-cols-1 gap-1 border-t border-black/[0.05] pt-5">
                      {['None', 'Basic CMS', 'Full-featured CMS'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setCms(opt); 
                            setStep(stepsOrder[stepsOrder.indexOf(step) + 1]); 
                          }}
                          className="w-full text-left px-5 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'integrations' && (
                    <div className="space-y-3 border-t border-black/[0.05] pt-4">
                      <div className="flex items-center justify-between px-5">
                        <button onClick={() => setIntegrations(Math.max(0, integrations - 1))} className="text-[24px] text-black/20 hover:text-black transition-colors">−</button>
                        <span className="text-[28px] font-bold tabular-nums text-black">{integrations}</span>
                        <button onClick={() => setIntegrations(integrations + 1)} className="text-[24px] text-black/20 hover:text-black transition-colors">+</button>
                      </div>
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full py-3 bg-black text-white rounded-full font-bold text-[12px] uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-transform">Continue</button>
                    </div>
                  )}

                  {step === 'database' && (
                    <div className="grid grid-cols-1 gap-1 border-t border-black/[0.05] pt-5">
                      {['None', 'Moderate with multiple tables', 'Complex with advanced queries'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setDatabase(opt.includes('Moderate') ? 'Moderate' : opt.includes('Complex') ? 'Complex' : 'None'); 
                            setStep(stepsOrder[stepsOrder.indexOf(step) + 1]); 
                          }}
                          className="w-full text-left px-5 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'apis' && (
                    <div className="space-y-4 border-t border-black/[0.05] pt-5">
                      <div className="flex items-center justify-between px-6 py-0.5">
                        <button onClick={() => setApis(Math.max(0, apis - 1))} className="text-[28px] text-black/20 hover:text-black transition-colors">−</button>
                        <span className="text-[32px] font-bold tabular-nums text-black">{apis}</span>
                        <button onClick={() => setApis(apis + 1)} className="text-[28px] text-black/20 hover:text-black transition-colors">+</button>
                      </div>
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full py-4 bg-black text-white rounded-full font-bold text-[13px] uppercase tracking-[0.3em] shadow-xl active:scale-[0.98] transition-transform">Continue</button>
                    </div>
                  )}

                  {step === 'dataComplexity' && (
                    <div className="grid grid-cols-1 gap-1 border-t border-black/[0.05] pt-5">
                      {['None', 'Moderate data structure', 'Complex data transformation'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setDataComplexity(opt.includes('Moderate') ? 'Moderate' : opt.includes('Complex') ? 'Complex' : 'None'); 
                            setStep(stepsOrder[stepsOrder.indexOf(step) + 1]); 
                          }}
                          className="w-full text-left px-5 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'realtime' && (
                    <div className="grid grid-cols-1 gap-1 border-t border-black/[0.05] pt-5">
                      {['None', 'Some real-time features', 'Full real-time synchronization'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => { 
                            setRealtime(opt.includes('Some') ? 'Some' : opt.includes('Full') ? 'Full' : 'None'); 
                            setStep(stepsOrder[stepsOrder.indexOf(step) + 1]); 
                          }}
                          className="w-full text-left px-5 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between text-black/30 hover:text-black hover:bg-black/[0.02] group"
                        >
                          {opt}
                          <ArrowDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 'auth' && (
                    <div className="space-y-1 border-t border-black/[0.05] pt-5">
                      {['API keys', 'OAuth 2.0', 'JWT tokens', 'Multi-factor auth'].map(auth => (
                        <button 
                          key={auth}
                          onClick={() => {
                            setAuthMethods(prev => prev.includes(auth) ? prev.filter(a => a !== auth) : [...prev, auth])
                          }}
                          className={`w-full text-left px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between ${authMethods.includes(auth) ? 'bg-black text-white shadow-md' : 'text-black/30 hover:text-black hover:bg-black/[0.02]'}`}
                        >
                          {auth}
                          {authMethods.includes(auth) && <Check size={14} />}
                        </button>
                      ))}
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full mt-4 py-3 bg-black text-white rounded-full font-bold text-[12px] uppercase tracking-widest active:scale-[0.98] transition-transform shadow-lg">
                        {authMethods.length === 0 ? 'No Auth Needed' : 'Confirm Auth'}
                      </button>
                    </div>
                  )}

                  {step === 'deliverables' && (
                    <div className="space-y-1 border-t border-black/[0.05] pt-5">
                      {['Source Code', 'Design Assets', 'Documentation', 'Hosting Setup', 'SEO Optimization'].map(item => (
                        <button 
                          key={item}
                          onClick={() => {
                            setDeliverables(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
                          }}
                          className={`w-full text-left px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between ${deliverables.includes(item) ? 'bg-black text-white shadow-md' : 'text-black/30 hover:text-black hover:bg-black/[0.02]'}`}
                        >
                          {item}
                          {deliverables.includes(item) && <Check size={14} />}
                        </button>
                      ))}
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full mt-4 py-3 bg-black text-white rounded-full font-bold text-[12px] uppercase tracking-widest active:scale-[0.98] transition-transform shadow-lg">Confirm Deliverables</button>
                    </div>
                  )}

                  {step === 'screens' && (
                    <div className="space-y-4 border-t border-black/[0.05] pt-5">
                      <div className="flex items-center justify-between px-6 py-0.5">
                        <button onClick={() => setPages(Math.max(1, pages - 1))} className="text-[28px] text-black/20 hover:text-black transition-colors">−</button>
                        <span className="text-[32px] font-bold tabular-nums text-black">{pages}</span>
                        <button onClick={() => setPages(Math.min(50, pages + 1))} className="text-[28px] text-black/20 hover:text-black transition-colors">+</button>
                      </div>
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full py-4 bg-black text-white rounded-full font-bold text-[13px] uppercase tracking-[0.3em] shadow-xl active:scale-[0.98] transition-transform">Continue</button>
                    </div>
                  )}

                  {step === 'timeline' && (
                    <div className="space-y-3 border-t border-black/[0.05] pt-5">
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/[0.03] rounded-2xl">
                        {['1 week', '2 weeks', '1 month', '2 months', 'ASAP'].map(t => (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={`py-2.5 text-[10px] font-bold rounded-xl transition-all ${timeline === t ? 'bg-white text-black shadow-md' : 'text-black/30 hover:text-black/50'} ${t === 'ASAP' ? 'col-span-2' : ''}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setStep(stepsOrder[stepsOrder.indexOf(step) + 1])} className="w-full py-4 bg-black text-white rounded-full font-bold text-[13px] uppercase tracking-[0.3em] shadow-xl active:scale-[0.98] transition-transform">Continue</button>
                    </div>
                  )}

                  {step === 'email' && (
                    <div className="space-y-3">
                      <div className="relative group">
                        <input 
                          autoFocus
                          type="email"
                          className="w-full bg-black/[0.02] border border-black/[0.05] rounded-[20px] p-3.5 pr-12 text-[14px] outline-none focus:bg-white focus:border-black/20 transition-all text-black"
                          placeholder="Your email.."
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && email && handleFinish()}
                        />
                        <button 
                          onClick={() => email && handleFinish()}
                          disabled={loading}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-black/20 hover:text-black transition-colors"
                        >
                          <MoveUpRight size={18} />
                        </button>
                      </div>
                      {error && <p className="text-red-500 text-[9px] text-center uppercase tracking-[0.15em] font-bold">{error}</p>}
                      <button 
                        disabled={!email || loading}
                        onClick={handleFinish}
                        className="w-full py-3 bg-black text-white rounded-full font-bold text-[12px] uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-transform disabled:opacity-20"
                      >
                        {loading ? 'Sending...' : 'Inquire Now'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/[0.05]">
                  <div className="flex items-center gap-2">
                    <div className="w-[50px] h-1 bg-black/[0.05] rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${currentProgress}%` }}
                        className="h-full bg-black/20"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-black/10 uppercase tracking-[0.2em]">0{stepsOrder.indexOf(step) + 1}</span>
                  </div>
                  <button 
                    onClick={() => {
                      const prevIndex = stepsOrder.indexOf(step) - 1
                      if (prevIndex >= 0) setStep(stepsOrder[prevIndex])
                      else onClose()
                    }}
                    className="text-[10px] font-bold text-black/20 hover:text-black transition-colors uppercase tracking-[0.1em]"
                  >
                    Go back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BallparkEstimator
