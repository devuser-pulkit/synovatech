import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-slate-900 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200">      
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="flex items-center gap-6"
        >
          <div className="flex -space-x-4 shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-400 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover"/>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-brand-accent flex items-center justify-center shrink-0">
              <Quote className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-slate-400 text-sm md:text-base italic max-w-lg">
            "Synovatech transformed our operational security and scaled our workforce seamlessly in weeks. Professional and precise."
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="flex flex-col items-start md:items-end justify-center md:justify-end text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-accent/30 pl-4 md:pl-0 md:pr-6"
        >
          <div className="text-white font-bold text-lg leading-tight">Vikram R.</div>
          <div className="text-slate-400 text-sm">VP of Operations</div>
          <div className="text-brand-accent font-semibold tracking-wide text-xs uppercase mt-1">TechFlow Logistics Pvt Ltd</div>
        </motion.div>
      </div>
    </section>
  );
};
