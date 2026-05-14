'use client'

import React from 'react'

const PartnersSection = () => {
  return (
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
  )
}

export default PartnersSection
