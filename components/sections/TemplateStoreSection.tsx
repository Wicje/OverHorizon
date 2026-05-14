'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'

interface TemplateStoreSectionProps {
  projects: any[]
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
}

const TemplateStoreSection = ({ projects, isOpen, onClose, isMobile }: TemplateStoreSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // High density grid items
  const allProjects = [...projects, ...projects, ...projects, ...projects].slice(0, 48)

  useEffect(() => {
    if (!isOpen) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 12 
      const yPos = (clientY / window.innerHeight - 0.5) * -12
      
      gsap.to(gridRef.current, {
        rotateY: xPos,
        rotateX: yPos,
        duration: 2,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center p-0"
        >
          {/* Vignette Overlay for focus */}
          <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />

          {/* Minimalist Close button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 z-[120] text-white/30 hover:text-white transition-all duration-500 flex items-center gap-2 group p-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Return to Studio</span>
            <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-colors" />
            <ArrowDown className="rotate-180" size={16} />
          </button>

          {/* Center Branding - Pixel Perfect Editorial Font */}
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="text-white text-[32px] md:text-[62px] font-medium tracking-tight whitespace-nowrap" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                Made with
              </h2>
              <h2 className="text-white text-[32px] md:text-[62px] font-medium tracking-tight mt-[-10px]" style={{ fontFamily: 'Georgia, serif' }}>
                OverHorizon
              </h2>
            </motion.div>
          </div>

          {/* Immersive 3D Space */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ perspective: '2000px' }}>
            <div 
              ref={gridRef}
              className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 p-4 md:p-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {allProjects.map((project, i) => {
                const cols = isMobile ? 4 : 8
                const rows = 6
                const row = Math.floor(i / cols)
                const col = i % cols
                
                const relX = col - (cols - 1) / 2
                const relY = row - (rows - 1) / 2
                
                const rotY = relX * -15
                const rotX = relY * 12
                const distOffset = Math.sqrt(relX * relX + relY * relY)
                const transZ = -450 + (distOffset * 95)

                return (
                  <motion.a
                    key={`${project.id}-${i}`}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.6, z: -2000 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      z: transZ,
                      rotateY: rotY,
                      rotateX: rotX,
                      transition: { delay: i * 0.012, duration: 1.6, ease: [0.22, 1, 0.36, 1] }
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      z: transZ + 120, 
                      transition: { duration: 0.35 } 
                    }}
                    className="block aspect-[4/3] bg-white/5 overflow-hidden rounded-[2px] md:rounded-[6px] relative group border border-white/5 w-[22vw] md:w-[220px] shadow-2xl"
                  >
                    <Image 
                      src={`https://picsum.photos/seed/${project.id + (i % 12)}/800/600`} 
                      alt={project.name}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-30 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest translate-y-1 group-hover:translate-y-0 transition-transform duration-300">{project.name}</span>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TemplateStoreSection
