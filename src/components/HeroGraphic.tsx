import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const HeroGraphic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yInner = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y: y1, opacity }}
      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 lg:translate-x-1/6 w-[600px] h-[600px] xl:w-[800px] xl:h-[800px] items-center justify-center pointer-events-none z-0"
    >
      <motion.svg 
        style={{ rotate, scale }}
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-brand-blue"
      >
        {/* Background screen/panel abstract */}
        <motion.rect 
            style={{ y: yInner }}
            x="160" y="100" width="180" height="140" rx="20" 
            stroke="currentColor" strokeWidth="8" strokeOpacity="0.1" 
        />
        
        {/* Core Lens */}
        <circle cx="160" cy="180" r="60" stroke="currentColor" strokeWidth="16" strokeOpacity="0.15" />
        <circle cx="160" cy="180" r="24" fill="currentColor" fillOpacity="0.15" />
        
        {/* Inner Ring (Broken) */}
        <path d="M 80 180 A 80 80 0 1 1 160 260" stroke="#4f46e5" strokeWidth="16" strokeLinecap="round" strokeOpacity="0.6" />
        
        {/* Tech Circuit Lines extending out */}
        <path d="M 180 200 L 260 200 L 300 160 L 320 160" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />
        <circle cx="320" cy="160" r="10" fill="#4f46e5" fillOpacity="0.4" />
        
        <motion.path 
            style={{ pathLength: useTransform(scrollYProgress, [0, 1], [1, 0.3]) }}
            d="M 170 220 L 220 220 L 240 240 L 280 240" stroke="#06b6d4" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" 
        />
        <circle cx="280" cy="240" r="10" fill="#06b6d4" fillOpacity="0.5" />
        
        <motion.path 
            style={{ y: yInner }}
            d="M 120 280 L 120 320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.1" 
        />
        <motion.path 
            style={{ y: yInner }}
            d="M 200 280 L 200 320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.1" 
        />
        <motion.path 
            style={{ y: yInner }}
            d="M 100 320 L 220 320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.1" 
        />

        {/* Decorative Grid Lines */}
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.05">
           <line x1="0" y1="80" x2="400" y2="80" />
           <line x1="0" y1="160" x2="400" y2="160" />
           <line x1="0" y1="240" x2="400" y2="240" />
           <line x1="0" y1="320" x2="400" y2="320" />
           
           <line x1="80" y1="0" x2="80" y2="400" />
           <line x1="160" y1="0" x2="160" y2="400" />
           <line x1="240" y1="0" x2="240" y2="400" />
           <line x1="320" y1="0" x2="320" y2="400" />
        </g>
      </motion.svg>
    </motion.div>
  );
};
