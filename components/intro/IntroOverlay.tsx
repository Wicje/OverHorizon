'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SlantedMarquee, FastCodeStream } from './IntroHelpers'

interface IntroOverlayProps {
  isReady: boolean
  setIsReady: (ready: boolean) => void
}

const IntroOverlay = ({ isReady, setIsReady }: IntroOverlayProps) => {
  return (
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
                className="mt-4 text-[14px] uppercase tracking-[0.5em] font-black text-black"
              >
                OverHorizon &copy; 2026
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroOverlay
