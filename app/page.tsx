'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowUp, MoveUpRight, Check, Globe } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Types ---
type ViewMode = 'about' | 'os-tools' | 'writing' | 'ballpark'

// --- Components ---

const DetailColumn = ({ title, items, className = "", innerRef, onAction, isCopied }: { title: string, items: (string | { text: string, icon?: React.ReactNode, href?: string, onClick?: () => void })[], className?: string, innerRef?: React.RefObject<HTMLDivElement | null>, onAction?: (text: string) => void, isCopied?: boolean }) => (
  <div className={`flex flex-col space-y-1 ${className}`} ref={innerRef}>
    <h4 className="text-[11px] font-medium text-black/40 uppercase mb-3 detail-title">{title}</h4>
    <ul className="space-y-1">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text;
        const href = typeof item === 'string' ? (text === "X (Twitter)" ? "https://x.com" : undefined) : item.href;
        const onClick = typeof item === 'object' ? item.onClick : undefined;
        const isEmail = text.includes("@");
        const isX = text.includes("X (Twitter)") || text.includes("- X");
        
        return (
          <li key={i} className="text-[13px] text-black font-normal flex items-center gap-2 detail-item">
            {typeof item !== 'string' && item.icon}
            {onClick ? (
              <button 
                onClick={onClick} 
                className="cursor-pointer text-left hover:underline"
              >
                {text}
              </button>
            ) : isEmail ? (
              <button 
                onClick={() => onAction?.(text)} 
                className="cursor-pointer text-left"
              >
                {isCopied ? "Email copied" : text}
              </button>
            ) : isX ? (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cursor-pointer"
              >
                {text.replace("X (Twitter)", "archJosephan").replace("- X", "- archJosephan")}
              </a>
            ) : href ? (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline cursor-pointer"
              >
                {text}
              </a>
            ) : (
              <span>{text}</span>
            )}
          </li>
        );
      })}
    </ul>
  </div>
)

const ClientIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

const InternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
    <path d="M12 2v20M2 12h20" />
    <path d="m4.93 4.93 14.14 14.14M4.93 19.07 19.07 4.93" />
  </svg>
)

// --- Helper Components for Intro ---

const SlantedMarquee = () => {
  const items = [
    "OverHorizon",
    "Limitless Possibilities",
    "Creative",
    "Architect",
    "product strategy",
    "taste checks",
    "deep debugging",
    "code audits",
    "design engineering"
  ]

  return (
    <div className="fixed top-[15%] left-[-10%] w-[120%] z-[9999] pointer-events-none">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-33.33%" }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="bg-[#fcfcfc] border-y border-black/10 py-1.5 md:py-2 flex whitespace-nowrap rotate-[-30deg] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center px-6 md:px-10">
            <span className="text-black/80 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em]">{item}</span>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black/20 rounded-full mx-4 md:mx-6 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const snippets = [
  '01011010101100101011',
  'RENDER_PIXELS_VAL=0.98',
  'NPM_INIT_COMPLETE',
  'CALCULATING_VIBE...',
  'OVER_HORIZON_SHARPEN',
  'SCROLL_INTENSITY_100',
  'UI_ENGINE_STABLE',
  'DESIGN_REFINEMENT_02',
  'TASTE_DETECTION_ACTIVE'
]

const FastCodeStream = () => {
  const [code, setCode] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)]
      setCode(randomSnippet)
    }, 80) // Very fast flicker
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-black/30 font-mono text-[11px] md:text-[13px] tracking-[0.2em] pointer-events-none">
      {code}
    </div>
  )
}

const LogoIcon = () => (
  <div className="w-6 h-6 flex flex-wrap gap-0.5 items-center justify-center">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="w-1 h-1 bg-black rounded-full" />
    ))}
  </div>
)

const BallparkEstimator = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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

export default function OverStimulatedApp() {
  const isMobile = useIsMobile()
  const [isReady, setIsReady] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Auto transition
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  const [viewMode, setViewMode] = useState<ViewMode>('about')
  const [time, setTime] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleContactClick = () => {
    setViewMode('about')
    navigator.clipboard.writeText('anichisom4top@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const resetApp = () => {
    setViewMode('about')
    setIsEstimatorOpen(false)
    setShowDetails(false)
    setShowMobileMenu(false)
    setSelectedWritingId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [selectedWritingId, setSelectedWritingId] = useState<number | null>(null)

  const writings = [
    { 
      id: 1, 
      title: 'Designing for Scale', 
      date: 'May 2026', 
      category: 'Design',
      content: 'Scaling a design system is not about multiplying components, but about distilling principles. When we built the framework for moment, the challenge wasn\'t the volume of UI, but the consistency of the "feel" across a thousand different touchpoints. True scale is silent; it is the invisible hand that guides the user without them ever noticing the system exists.' 
    },
    { 
      id: 2, 
      title: 'The Future of Interface', 
      date: 'April 2025', 
      category: 'Engineering',
      content: 'We are moving towards a world of zero-UI. Interfaces are no longer destinations, but transitions. The future doesn\'t belong to the loudest visual designs, but to the most intuitive logic. At OverHorizon, we believe the best interface is the one that knows exactly when to disappear.'
    },
    { 
      id: 3, 
      title: 'Why Feel Matters', 
      date: 'March 2024', 
      category: 'Editorial',
      content: 'In the rush for efficiency, we often lose the soul of the product. "Feel" is the emotional response to a digital interaction. It\'s the friction in a scroll, the snap of a button, the timing of a transition. It is the difference between a tool and a companion.'
    },
    { 
      id: 4, 
      title: 'Engineering Taste', 
      date: 'Feb 2024', 
      category: 'Design',
      content: 'Taste is often seen as a subjective gift, but in design engineering, it is a deliberate practice. It is the ability to recognize balance, rhythm, and restraint. Engineering taste means translating a visceral feeling into a mathematical reality.'
    },
    { 
      id: 5, 
      title: 'Minimalist R&D', 
      date: 'Jan 2024', 
      category: 'Product',
      content: 'The R&D lab is where we strip everything away. We build tools that handle the noise so you can focus on the signal. Ballpark was born from this: why spend hours on a proposal when the data already knows the answer? Minimalist R&D is about building less, but building better.'
    },
    { 
      id: 6, 
      title: 'The Studio Ethos', 
      date: 'Dec 2023', 
      category: 'Studio',
      content: 'We don\'t follow external vendors; we are extensions of the teams we partner with. Our ethos is built on four pillars: Care obsessively, Build to elevate, Win in the details, and remain intensely curious.'
    },
    { 
      id: 7, 
      title: 'Building with AI', 
      date: 'Nov 2023', 
      category: 'AI',
      content: 'AI is the new clay. It allows us to shape experiences that wrap around the user in real-time. But AI without design is just a engine without a steering wheel. We provide the direction, the taste, and the human touch that makes AI feel natural.'
    }
  ]

  const selectedWriting = writings.find(w => w.id === selectedWritingId)

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!isReady) return

    // Initial Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })
    
    tl.from('.header-logo', { y: 30, opacity: 0, delay: 0.2 })
      .from('.header-index > *', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.9')
      .from('.header-about > *', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.9')
      .from('.header-email', { x: 30, opacity: 0 }, '-=0.9')

    // Project Cards Entrance
    gsap.from('.project-card', {
      opacity: 0,
      y: 100,
      stagger: 0.1,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.5
    })

    // Infinite Auto Scroll Logic
    const scroller = scrollRef.current
    if (scroller && !showDetails) {
      let loopAnimation: gsap.core.Tween;
      
      const initScroll = () => {
        if (loopAnimation) loopAnimation.kill();
        
        const scrollWidth = scroller.scrollWidth;
        const style = window.getComputedStyle(scroller.firstElementChild as HTMLElement);
        const gap = parseInt(style.columnGap || style.gap || '16') || (window.innerWidth < 768 ? 12 : 16);
        const loopPoint = (scrollWidth + gap) / 2;

        loopAnimation = gsap.to(scroller, {
          scrollLeft: loopPoint,
          duration: 50,
          ease: 'none',
          repeat: -1,
          onRepeat: () => {
            scroller.scrollLeft = 0;
          }
        });
      };

      initScroll();
      
      const handleResize = () => {
        initScroll();
      };
      
      const handleMouseEnter = () => {
        if (loopAnimation) gsap.to(loopAnimation, { timeScale: 0.1, duration: 0.8, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        if (loopAnimation) gsap.to(loopAnimation, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
      };

      window.addEventListener('resize', handleResize);
      scroller.addEventListener('mouseenter', handleMouseEnter);
      scroller.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (loopAnimation) loopAnimation.kill();
        window.removeEventListener('resize', handleResize);
        scroller.removeEventListener('mouseenter', handleMouseEnter);
        scroller.removeEventListener('mouseleave', handleMouseLeave);
      }
    }

    // Hover interaction for project cards using GSAP
    const cards = gsap.utils.toArray('.project-card') as HTMLElement[]
    cards.forEach(card => {
      const image = card.querySelector('.project-card-image')
      const dot = card.querySelector('.rounded-full div')
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.05, duration: 0.8, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.8, ease: 'power2.out' })
        gsap.to(dot, { scale: 0, duration: 0.4, ease: 'power2.in' })
      })
    })

  }, { scope: containerRef, dependencies: [isReady] })

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

  const projects = [
    { id: 1, name: 'better now closer', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-[#1a3d32]', colSpan: 'col-span-2', rowSpan: 'row-span-1', link: 'https://thezinnes.vercel.app/', videoUrl: '/zinnes.mp4' },
    { id: 2, name: 'Collaboration', type: 'internal', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://thatune.vercel.app/', videoUrl: '/tatune.mp4' },
    { id: 3, name: 'Team Adaptation', type: 'client', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://askchill.vercel.app/', videoUrl: '/askchill.mp4' },
    { id: 4, name: 'Bring People Together', type: 'internal', bgColor: 'bg-[#f7f5ef]', textColor: 'text-[#e31e24]', colSpan: 'col-span-1', rowSpan: 'row-span-2', link: 'https://peter-umeh.vercel.app/', videoUrl: '/peterumeh.mp4' },
    { id: 5, name: 'sync systems', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-[#e31e24]', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://the-m-sigma.vercel.app/', videoUrl: '/m.mp4' },
    { id: 6, name: 'I\'ll be in touch', type: 'internal', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://frontyard-nine.vercel.app/', videoUrl: '/frontyard.mp4' },
    { id: 7, name: 'Global Connect', type: 'client', bgColor: 'bg-[#1a1a1a]', textColor: 'text-white', colSpan: 'col-span-2', rowSpan: 'row-span-1', link: 'https://gpt-os.vercel.app/', videoUrl: '/gpt.mp4' },
    { id: 8, name: 'Momentum', type: 'internal', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://volve-studio.vercel.app/', videoUrl: '/evolve.mp4' },
    { id: 9, name: 'Pixel Perfect', type: 'client', bgColor: 'bg-[#f7f5ef]', textColor: 'text-[#1a3d32]', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://rituaaaaal-store.vercel.app/', videoUrl: '/ritual.mp4' },
    { id: 10, name: 'Interface X', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-black', colSpan: 'col-span-1', rowSpan: 'row-span-2', link: 'https://xio-labs.vercel.app/', videoUrl: '/xiolabs.mp4' },
    { id: 11, name: 'Vector Flow', type: 'client', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://airline-ashy.vercel.app/', videoUrl: '/joby.mp4' },
    { id: 12, name: 'Creative Lab', type: 'internal', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'col-span-2', rowSpan: 'row-span-1', link: 'https://trigger-plum.vercel.app/', videoUrl: '/trigger.mp4' },
    { id: 13, name: 'Team Adaptation', type: 'client', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://askchill.vercel.app/', videoUrl: '/askchill.mp4' },
    { id: 14, name: 'Bring People Together', type: 'internal', bgColor: 'bg-[#f7f5ef]', textColor: 'text-[#e31e24]', colSpan: 'col-span-1', rowSpan: 'row-span-2', link: 'https://peter-umeh.vercel.app/', videoUrl: '/peterumeh.mp4' },
    { id: 15, name: 'sync systems', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-[#e31e24]', colSpan: 'col-span-1', rowSpan: 'row-span-1', link: 'https://the-m-sigma.vercel.app/', videoUrl: '/m.mp4' },

  ]

  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white" ref={containerRef}>
      <BallparkEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
      {/* Entry Reveal Overlay */}
      <AnimatePresence onExitComplete={() => setIsReady(true)}>
        {!isReady && (
          <motion.div 
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: 1.2 }}
          >
            {/* Blinds / Panels Container */}
            <div className="absolute inset-0 flex overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-white h-full border-r border-black/5"
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.65, 0, 0.35, 1],
                    delay: i * 0.05 
                  }}
                />
              ))}
            </div>

            <SlantedMarquee />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="text-black text-center"
              >
                <FastCodeStream />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1 }}
                  className="mt-4 text-[11px] uppercase tracking-[0.5em] font-light text-black"
                >
                  OverHorizon &copy; 2026
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Container */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-opacity duration-300 ${!isReady ? 'opacity-0' : 'opacity-100'}`} ref={headerRef}>
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
                       <h4 className="text-[12px] font-bold mb-1">Ballpark</h4>
                       <p className="text-[11px] text-black/50 mb-3">Instant project estimates for service-based businesses.</p>
                       <button onClick={() => setIsEstimatorOpen(true)} className="text-[11px] font-bold border-b border-black/20 pb-0.5">Launch Tool &rarr;</button>
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
                    
                    <div className="mt-6 md:mt-8">
                      <h4 className="text-[13px] md:text-[13px] font-medium mb-1.5">Ballpark</h4>
                      <p className="text-[12px] md:text-[13px] leading-relaxed text-black/50 max-w-full md:max-w-[340px] mb-3">
                        Hours are wasted on calls, emails, and proposals that were never going to work. Ballpark is an embeddable that sends instants estimates on your services. Clients qualify themselves, giving you time back for the work that matters.
                      </p>
                      <button 
                        onClick={() => setIsEstimatorOpen(true)}
                        className="text-[12px] font-medium border-b border-black/20 pb-0.5 hover:border-black/100 transition-colors uppercase tracking-widest"
                      >
                        Launch Ballpark Tool &rarr;
                      </button>
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

        {/* Expandable Details Section */}
        <AnimatePresence>
          {showDetails && !isMobile && (
            <motion.div
              ref={detailsRef}
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

      {/* Background Overlay for Expand state */}
      <div 
        className={`fixed inset-0 z-40 bg-white/20 backdrop-blur-3xl transition-opacity duration-700 pointer-events-none ${showDetails ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* Main Content / Projects Section */}
      <section className={`${isMobile ? 'pt-[200px]' : 'pt-[340px] md:pt-[240px]'} pb-10 transition-all duration-700 relative z-10 ${showDetails && !isMobile ? 'scale-[0.96] opacity-30 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
        <div 
          className="flex overflow-x-auto overflow-y-visible no-scrollbar px-6 md:px-12 items-center h-[660px] md:h-[860px] py-20 md:py-32" 
          ref={scrollRef}
        >
          <div className="grid grid-rows-3 grid-flow-col gap-3 md:gap-4 h-full">
            {[...projects, ...projects].map((project, index) => (
              <a 
                key={`${project.id}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-none ${project.colSpan} ${project.rowSpan} w-[42vw] md:w-auto md:min-w-[130px] h-full group cursor-pointer project-card relative overflow-hidden ${project.bgColor} rounded-[10px] md:rounded-[14px] transition-transform duration-500 hover:scale-[0.98] animate-in fade-in duration-1000`}
              >
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                       <div className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center bg-white/20 backdrop-blur-sm">
                          {project.type === 'client' ? <ClientIcon /> : <InternalIcon />}
                       </div>
                    </div>
                  </div>

                  <h3 className={`text-[11px] md:text-[13px] font-medium leading-[1.1] tracking-tight max-w-[140px] md:max-w-[180px] ${project.textColor} transition-transform duration-500 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100`}>
                    {project.name}
                  </h3>
                </div>

                {/* Hover "See More" Overlay */}
                <div className="absolute inset-0 bg-black/60 md:bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-black">
                    <MoveUpRight size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-white text-[11px] md:text-[12px] font-medium tracking-tight">Expand {project.name}...</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-28 md:py-40 px-6 md:px-10 relative z-20">
        <div className="max-w-[850px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-20 md:gap-y-32 items-center justify-items-center">
            {/* Logo 1: Dribbble */}
            <a 
              href="https://dribbble.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <span className="text-black text-[24px] md:text-[28px] font-bold italic tracking-tight select-none" style={{ fontFamily: 'Georgia, serif' }}>Dribbble</span>
            </a>
            {/* Logo 2: ElevenLabs */}
            <a 
              href="https://elevenlabs.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <div className="flex items-center gap-2 text-black">
                 <div className="flex gap-0.5">
                   <div className="w-1.5 h-5 md:h-6 bg-black"></div>
                   <div className="w-1.5 h-5 md:h-6 bg-black"></div>
                 </div>
                 <span className="text-[19px] md:text-[23px] font-bold tracking-tight select-none font-sans">ElevenLabs</span>
               </div>
            </a>
            {/* Logo 3: Zapier */}
            <a 
              href="https://zapier.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <div className="flex items-center gap-1.5 text-black">
                 <div className="w-5 md:w-6 h-2 bg-black mt-1.5 rounded-sm"></div>
                 <span className="text-[21px] md:text-[25px] font-bold tracking-tighter select-none font-sans">zapier</span>
               </div>
            </a>
            {/* Logo 4: Perplexity */}
            <a 
              href="https://perplexity.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <div className="flex items-center gap-2 text-black">
                  <div className="relative w-6 h-6 md:w-7 md:h-7 shrink-0">
                    <div className="absolute inset-0 border border-black/40 rotate-45"></div>
                    <div className="absolute inset-0 border border-black rotate-0"></div>
                    <div className="absolute inset-[35%] bg-black"></div>
                  </div>
                  <span className="text-[19px] md:text-[23px] font-medium tracking-tighter select-none font-sans">perplexity</span>
               </div>
            </a>
            {/* Logo 5: Cal.com */}
            <a 
              href="https://cal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <span className="text-black text-[22px] md:text-[26px] font-extrabold tracking-tight select-none font-sans">Cal.com</span>
            </a>
            {/* Logo 6: Mixpanel */}
            <a 
              href="https://mixpanel.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <span className="text-black text-[22px] md:text-[26px] font-normal italic select-none" style={{ fontFamily: 'Georgia, serif' }}>mixpanel</span>
            </a>
            {/* Logo 7: Miro */}
            <a 
              href="https://miro.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <div className="flex items-center gap-2.5 text-black">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-[6px] relative flex flex-col justify-center items-center gap-0.5 px-1.5">
                    <div className="w-full h-[2.5px] bg-white rotate-[-10deg]"></div>
                    <div className="w-full h-[2.5px] bg-white rotate-[-10deg]"></div>
                    <div className="w-full h-[2.5px] bg-white rotate-[-10deg]"></div>
                  </div>
                  <span className="text-[22px] md:text-[26px] font-bold select-none tracking-tight font-sans">miro</span>
               </div>
            </a>
            {/* Logo 8: DoorDash */}
            <a 
              href="https://doordash.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
            >
               <div className="flex items-center gap-2.5 text-black">
                  <div className="w-8 h-4 md:w-9 md:h-5 bg-black rounded-tr-full rounded-bl-full shrink-0 rotate-[-5deg]"></div>
                  <span className="text-[18px] md:text-[22px] font-black uppercase tracking-tight select-none font-sans">DOORDASH</span>
               </div>
            </a>
          </div>
        </div>
      </section>


      {/* Custom Styles */}
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


