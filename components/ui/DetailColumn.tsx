import React from 'react'

export const ClientIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

export const InternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
    <path d="M12 2v20M2 12h20" />
    <path d="m4.93 4.93 14.14 14.14M4.93 19.07 19.07 4.93" />
  </svg>
)

export const DetailColumn = ({ title, items, className = "", innerRef, onAction, isCopied }: { title: string, items: (string | { text: string, icon?: React.ReactNode, href?: string, onClick?: () => void })[], className?: string, innerRef?: React.RefObject<HTMLDivElement | null>, onAction?: (text: string) => void, isCopied?: boolean }) => (
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
