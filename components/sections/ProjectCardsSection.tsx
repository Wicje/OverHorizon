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
  mediaUrl: string
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
    // Drag to scroll functionality
    const scrollers = [scrollRef1.current, scrollRef2.current]
    
    scrollers.forEach(scroller => {
      if (!scroller) return

      let isDown = false
      let startX: number
      let scrollLeft: number

      const onMouseDown = (e: MouseEvent) => {
        isDown = true
        scroller.classList.add('active-dragging')
        startX = e.pageX - scroller.offsetLeft
        scrollLeft = scroller.scrollLeft
      }

      const onMouseLeave = () => {
        isDown = false
        scroller.classList.remove('active-dragging')
      }

      const onMouseUp = () => {
        isDown = false
        scroller.classList.remove('active-dragging')
      }

      const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - scroller.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed
        scroller.scrollLeft = scrollLeft - walk
      }

      scroller.addEventListener('mousedown', onMouseDown)
      scroller.addEventListener('mouseleave', onMouseLeave)
      scroller.addEventListener('mouseup', onMouseUp)
      scroller.addEventListener('mousemove', onMouseMove)
    })
  }, [])

  useEffect(() => {
    const scroller1 = scrollRef1.current
    const scroller2 = scrollRef2.current
    
    if (scroller1 && scroller2 && !showDetails) {
      const state = {
        isDragging1: false,
        isDragging2: false,
        speed1: { value: 0.8 },
        speed2: { value: 0.8 },
        loopPoint1: 0,
        loopPoint2: 0
      }

      const initPoints = () => {
        if (!scroller1 || !scroller2) return
        
        const scrollWidth1 = scroller1.scrollWidth
        const style1 = window.getComputedStyle(scroller1.firstElementChild as HTMLElement)
        const gap1 = parseInt(style1.columnGap || style1.gap || '16') || 16
        state.loopPoint1 = (scrollWidth1 + gap1) / 2

        const scrollWidth2 = scroller2.scrollWidth
        const style2 = window.getComputedStyle(scroller2.firstElementChild as HTMLElement)
        const gap2 = parseInt(style2.columnGap || style2.gap || '16') || 16
        state.loopPoint2 = (scrollWidth2 + gap2) / 2
        
        // Initial setup for Row 2 starting from loop point
        if (scroller2.scrollLeft === 0) {
          scroller2.scrollLeft = state.loopPoint2
        }
      }

      initPoints()

      const tick = () => {
        if (!scroller1 || !scroller2) return

        // Row 1: Moves Left (scrollLeft increases)
        if (!state.isDragging1) {
          scroller1.scrollLeft += state.speed1.value
          if (scroller1.scrollLeft >= state.loopPoint1) {
            scroller1.scrollLeft = 0
          }
        }

        // Row 2: Moves Right (scrollLeft decreases)
        if (!state.isDragging2) {
          scroller2.scrollLeft -= state.speed2.value
          if (scroller2.scrollLeft <= 0) {
            scroller2.scrollLeft = state.loopPoint2
          }
        }
      }

      gsap.ticker.add(tick)

      const handleResize = () => initPoints()
      
      const handleMouseEnter = (row: number) => {
        const speedObj = row === 1 ? state.speed1 : state.speed2
        gsap.to(speedObj, { value: 0.1, duration: 1, ease: "power2.out" })
      }
      const handleMouseLeave = (row: number) => {
        const speedObj = row === 1 ? state.speed1 : state.speed2
        gsap.to(speedObj, { value: 0.8, duration: 1, ease: "power2.inOut" })
      }

      const onMouseDown1 = () => { state.isDragging1 = true }
      const onMouseDown2 = () => { state.isDragging2 = true }
      const onMouseUpGlobal = () => {
        state.isDragging1 = false
        state.isDragging2 = false
      }

      window.addEventListener('resize', handleResize)
      scroller1.addEventListener('mouseenter', () => handleMouseEnter(1))
      scroller1.addEventListener('mouseleave', () => handleMouseLeave(1))
      scroller2.addEventListener('mouseenter', () => handleMouseEnter(2))
      scroller2.addEventListener('mouseleave', () => handleMouseLeave(2))

      scroller1.addEventListener('mousedown', onMouseDown1)
      scroller2.addEventListener('mousedown', onMouseDown2)
      window.addEventListener('mouseup', onMouseUpGlobal)

      return () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mouseup', onMouseUpGlobal)
        scroller1.removeEventListener('mousedown', onMouseDown1)
        scroller2.removeEventListener('mousedown', onMouseDown2)
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
          className="flex overflow-x-auto overflow-y-visible no-scrollbar px-6 md:px-12 h-[330px] md:h-[430px] cursor-grab active:cursor-grabbing select-none" 
          ref={scrollRef1}
        >
          <div className="flex gap-3 md:gap-4 h-full pointer-events-auto">
            {[...projects.filter((_, i) => i % 2 === 0), ...projects.filter((_, i) => i % 2 === 0)].map((project, index) => (
              <a 
                key={`r1-${project.id}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Prevent click if dragging
                  if (scrollRef1.current?.classList.contains('active-dragging')) {
                    e.preventDefault();
                  }
                }}
                className={`flex-none ${project.colSpan} ${project.rowSpan} w-[80vw] md:w-auto md:min-w-[450px] h-full group cursor-pointer project-card relative overflow-hidden ${project.bgColor} rounded-[10px] md:rounded-[14px] transition-transform duration-500 hover:scale-[0.98] animate-in fade-in duration-1000`}
              >
                {/* Background Media */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  {project.mediaUrl.endsWith('.mp4') ? (
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
                    >
                      <source src={project.mediaUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={project.mediaUrl} 
                      alt={project.name}
                      className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
                    />
                  )}
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
          className="flex overflow-x-auto overflow-y-visible no-scrollbar px-6 md:px-12 h-[330px] md:h-[430px] cursor-grab active:cursor-grabbing select-none" 
          ref={scrollRef2}
        >
          <div className="flex gap-3 md:gap-4 h-full pointer-events-auto">
            {[...projects.filter((_, i) => i % 2 !== 0), ...projects.filter((_, i) => i % 2 !== 0)].map((project, index) => (
              <a 
                key={`r2-${project.id}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Prevent click if dragging
                  if (scrollRef2.current?.classList.contains('active-dragging')) {
                    e.preventDefault();
                  }
                }}
                className={`flex-none ${project.colSpan} ${project.rowSpan} w-[80vw] md:w-auto md:min-w-[450px] h-full group cursor-pointer project-card relative overflow-hidden ${project.bgColor} rounded-[10px] md:rounded-[14px] transition-transform duration-500 hover:scale-[0.98] animate-in fade-in duration-1000`}
              >
                {/* Background Media */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
                  {project.mediaUrl.endsWith('.mp4') ? (
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
                    >
                      <source src={project.mediaUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={project.mediaUrl} 
                      alt={project.name}
                      className="max-w-full max-h-full object-contain transition-all duration-700 project-card-image group-hover:scale-105"
                    />
                  )}
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
