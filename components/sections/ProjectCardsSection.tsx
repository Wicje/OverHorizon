'use client'

import React, { useRef, useEffect } from 'react'
import { MoveUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ClientIcon, InternalIcon } from '../ui/DetailColumn'

interface Project {
  id: number
  name: string
  type: string
  bgColor: string
  textColor: string
  colSpan: string
  rowSpan: string
  link: string
  videoUrl: string
}

interface ProjectCardsSectionProps {
  projects: Project[]
  isMobile: boolean
  showDetails: boolean
}

const ProjectCardsSection = ({ projects, isMobile, showDetails }: ProjectCardsSectionProps) => {
  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Infinite Auto Scroll Logic
    const scroller1 = scrollRef1.current
    const scroller2 = scrollRef2.current
    
    if (scroller1 && scroller2 && !showDetails) {
      let loopAnimation1: gsap.core.Tween;
      let loopAnimation2: gsap.core.Tween;
      
      const initScroll = () => {
        if (loopAnimation1) loopAnimation1.kill();
        if (loopAnimation2) loopAnimation2.kill();
        
        // Row 1 Logic (Moves Left)
        const scrollWidth1 = scroller1.scrollWidth;
        const style1 = window.getComputedStyle(scroller1.firstElementChild as HTMLElement);
        const gap1 = parseInt(style1.columnGap || style1.gap || '16') || (window.innerWidth < 768 ? 12 : 16);
        const loopPoint1 = (scrollWidth1 + gap1) / 2;

        loopAnimation1 = gsap.to(scroller1, {
          scrollLeft: loopPoint1,
          duration: 40,
          ease: 'none',
          repeat: -1,
          onRepeat: () => {
            scroller1.scrollLeft = 0;
          }
        });

        // Row 2 Logic (Moves Right)
        const scrollWidth2 = scroller2.scrollWidth;
        const style2 = window.getComputedStyle(scroller2.firstElementChild as HTMLElement);
        const gap2 = parseInt(style2.columnGap || style2.gap || '16') || (window.innerWidth < 768 ? 12 : 16);
        const loopPoint2 = (scrollWidth2 + gap2) / 2;

        // Start from end for Row 2
        scroller2.scrollLeft = loopPoint2;

        loopAnimation2 = gsap.to(scroller2, {
          scrollLeft: 0,
          duration: 40,
          ease: 'none',
          repeat: -1,
          onRepeat: () => {
            scroller2.scrollLeft = loopPoint2;
          }
        });
      };

      initScroll();
      
      const handleResize = () => {
        initScroll();
      };
      
      const handleMouseEnter = () => {
        if (loopAnimation1) gsap.to(loopAnimation1, { timeScale: 0.1, duration: 0.8, ease: "power2.out" });
        if (loopAnimation2) gsap.to(loopAnimation2, { timeScale: 0.1, duration: 0.8, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        if (loopAnimation1) gsap.to(loopAnimation1, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
        if (loopAnimation2) gsap.to(loopAnimation2, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
      };

      window.addEventListener('resize', handleResize);
      scroller1.addEventListener('mouseenter', handleMouseEnter);
      scroller1.addEventListener('mouseleave', handleMouseLeave);
      scroller2.addEventListener('mouseenter', handleMouseEnter);
      scroller2.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (loopAnimation1) loopAnimation1.kill();
        if (loopAnimation2) loopAnimation2.kill();
        window.removeEventListener('resize', handleResize);
        scroller1.removeEventListener('mouseenter', handleMouseEnter);
        scroller1.removeEventListener('mouseleave', handleMouseLeave);
        scroller2.removeEventListener('mouseenter', handleMouseEnter);
        scroller2.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
  }, [showDetails])

  useEffect(() => {
    // Project Cards Entrance and Hover
    gsap.from('.project-card', {
      opacity: 0,
      y: 100,
      stagger: 0.1,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.5
    })

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
  }, [])

  return (
    <section className={`${isMobile ? 'pt-[200px]' : 'pt-[340px] md:pt-[240px]'} pb-10 transition-all duration-700 relative z-10 ${showDetails && !isMobile ? 'scale-[0.96] opacity-30 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
      <div className="flex flex-col gap-4 md:gap-6 py-10 md:py-20 h-auto">
        {/* Row 1: Left Moving */}
        <div 
          className="flex overflow-x-auto overflow-y-visible no-scrollbar px-6 md:px-12 items-center h-[330px] md:h-[430px]" 
          ref={scrollRef1}
        >
          <div className="flex gap-3 md:gap-4 h-full">
            {[...projects.filter((_, i) => i % 2 === 0), ...projects.filter((_, i) => i % 2 === 0)].map((project, index) => (
              <a 
                key={`r1-${project.id}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-none ${project.colSpan} ${project.rowSpan} w-[80vw] md:w-auto md:min-w-[450px] h-full group cursor-pointer project-card relative overflow-hidden ${project.bgColor} rounded-[10px] md:rounded-[14px] transition-transform duration-500 hover:scale-[0.98] animate-in fade-in duration-1000`}
              >
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
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

        {/* Row 2: Right Moving */}
        <div 
          className="flex overflow-x-auto overflow-y-visible no-scrollbar px-6 md:px-12 items-center h-[330px] md:h-[430px]" 
          ref={scrollRef2}
        >
          <div className="flex gap-3 md:gap-4 h-full">
            {[...projects.filter((_, i) => i % 2 !== 0), ...projects.filter((_, i) => i % 2 !== 0)].map((project, index) => (
              <a 
                key={`r2-${project.id}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-none ${project.colSpan} ${project.rowSpan} w-[80vw] md:w-auto md:min-w-[450px] h-full group cursor-pointer project-card relative overflow-hidden ${project.bgColor} rounded-[10px] md:rounded-[14px] transition-transform duration-500 hover:scale-[0.98] animate-in fade-in duration-1000`}
              >
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
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
      </div>
    </section>
  )
}

export default ProjectCardsSection
