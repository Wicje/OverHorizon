import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

export const SlantedMarquee = () => {
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

export const FastCodeStream = () => {
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

export const LogoIcon = () => (
  <div className="w-6 h-6 flex flex-wrap gap-0.5 items-center justify-center">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="w-1 h-1 bg-black rounded-full" />
    ))}
  </div>
)
