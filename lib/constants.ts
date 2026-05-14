// --- Types ---
export type ViewMode = 'about' | 'os-tools' | 'writing' | 'ballpark' | 'template-store'

export const projects = [
  { id: 1, name: 'better now closer', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-[#1a3d32]', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://thezinnes.vercel.app/', videoUrl: '/zinnes.mp4' },
  { id: 2, name: 'Collaboration', type: 'internal', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://thatune.vercel.app/', videoUrl: '/tatune.mp4' },
  { id: 3, name: 'Team Adaptation', type: 'client', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://askchill.vercel.app/', videoUrl: '/askchill.mp4' },
  { id: 4, name: 'Bring People Together', type: 'internal', bgColor: 'bg-[#f7f5ef]', textColor: 'text-[#e31e24]', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://peter-umeh.vercel.app/', videoUrl: '/peterumeh.mp4' },
  { id: 5, name: 'sync systems', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-[#e31e24]', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://the-m-sigma.vercel.app/', videoUrl: '/m.mp4' },
  { id: 6, name: 'I\'ll be in touch', type: 'internal', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://frontyard-nine.vercel.app/', videoUrl: '/frontyard.mp4' },
  { id: 7, name: 'Global Connect', type: 'client', bgColor: 'bg-[#1a1a1a]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://gpt-os.vercel.app/', videoUrl: '/gpt.mp4' },
  { id: 8, name: 'Momentum', type: 'internal', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://volve-studio.vercel.app/', videoUrl: '/evolve.mp4' },
  { id: 9, name: 'Pixel Perfect', type: 'client', bgColor: 'bg-[#f7f5ef]', textColor: 'text-[#1a3d32]', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://rituaaaaal-store.vercel.app/', videoUrl: '/ritual.mp4' },
  { id: 10, name: 'Interface X', type: 'client', bgColor: 'bg-[#f2f0e4]', textColor: 'text-black', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://xio-labs.vercel.app/', videoUrl: '/xiolabs.mp4' },
  { id: 11, name: 'Vector Flow', type: 'client', bgColor: 'bg-[#0a4d3c]', textColor: 'text-white', colSpan: 'md:col-span-5', rowSpan: 'row-span-1', link: 'https://airline-ashy.vercel.app/', videoUrl: '/joby.mp4' },
  { id: 12, name: 'Creative Lab', type: 'internal', bgColor: 'bg-[#e31e24]', textColor: 'text-white', colSpan: 'md:col-span-10', rowSpan: 'row-span-1', link: 'https://trigger-plum.vercel.app/', videoUrl: '/trigger.mp4' },
]

export const writings = [
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
