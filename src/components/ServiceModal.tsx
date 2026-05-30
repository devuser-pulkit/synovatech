import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, TrendingUp, Quote } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  caseStudy: {
    title: string;
    metric: string;
    description: string;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  benefits: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onOrderClick: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, onOrderClick }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto border border-slate-200"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-4 sm:p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-brand-accent rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="heading-display text-2xl font-bold text-slate-900">{service.title}</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-10">
                {/* Left Column: Details & Benefits */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">Service Overview</h4>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Key Benefits</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                      onClick={() => { onClose(); setTimeout(onOrderClick, 300); }}
                      className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                      Request a Proposal
                  </button>
                </div>

                {/* Right Column: Case Study & Testimonial */}
                <div className="space-y-6">
                  {/* Case Study Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-brand-accent mb-4">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold text-sm uppercase tracking-wider">Indian Case Study</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-lg mb-2">{service.caseStudy.title}</h5>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {service.caseStudy.description}
                    </p>
                    <div className="inline-block bg-white border border-slate-200 px-4 py-2 rounded-lg text-brand-accent font-bold">
                      Impact: {service.caseStudy.metric}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden">
                    <Quote className="w-16 h-16 text-slate-700/50 absolute -top-2 -left-2 transform rotate-180" />
                    <div className="relative z-10">
                      <p className="text-slate-300 italic mb-6 text-sm leading-relaxed">
                        "{service.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm">
                          {service.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{service.testimonial.author}</p>
                          <p className="text-slate-400 text-xs">{service.testimonial.role}, {service.testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
