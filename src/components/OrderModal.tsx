import React, { useRef, useState, useEffect } from 'react';
import { Send, User, Phone, Mail, MapPin, AlertTriangle, CheckCircle, X, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../config';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset form state on close after a delay
      setTimeout(() => setStatus("idle"), 500);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    const formData = new FormData(formRef.current);

    // FormSubmit Configuration
    formData.append("_captcha", "false"); 
    formData.append("_template", "table");
    formData.append("_subject", `New Order/Inquiry from ${formData.get('name')}`);

    try {
        const response = await fetch(`https://formsubmit.co/${CONTACT_INFO.email}`, {
            method: "POST",
            body: formData,
            headers: { 
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            setStatus("success");
            formRef.current.reset();
            setTimeout(() => {
              onClose();
            }, 3000);
        } else {
            setStatus("error");
        }
    } catch (err) {
        setStatus("error");
    }
  };

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
            className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto border border-slate-200"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50/50">
                <div>
                  <h3 className="heading-display text-2xl font-bold text-slate-900">Place an Order</h3>
                  <p className="text-slate-500 text-sm mt-1">Fill out the details below and our team will contact you.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="heading-display text-xl font-bold text-gray-900 mb-2">Request Received</h4>
                    <p className="text-gray-600">Thank you for your interest. We will be in touch shortly.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot */}
                    <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                    <div className="space-y-4">
                      <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                          <input type="text" name="name" placeholder="Full Name *" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" required />
                      </div>

                      <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                          <input type="email" name="email" placeholder="Email Address *" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" required />
                      </div>

                      <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                          <input type="text" name="phone" placeholder="Contact Number *" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all" required />
                      </div>

                      <div className="relative group">
                          <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                          <select name="service" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all appearance-none cursor-pointer" required defaultValue="">
                            <option value="" disabled>Select a Service...</option>
                            <option value="CCTV & Surveillance">CCTV & Surveillance</option>
                            <option value="Manpower Supply">Manpower Supply</option>
                            <option value="Software Solutions">Software Solutions</option>
                            <option value="General Inquiry">General Inquiry / Multiple</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                      </div>

                      <div className="relative group">
                          <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                          <textarea 
                              name="address"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all resize-none h-24" 
                              placeholder="Delivery Address / Location details *"
                              required
                          />
                      </div>
                    </div>

                    {status === "error" && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            Transmission failed. Please check your connection and try again.
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full mt-2 py-3.5 bg-brand-accent text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {status === "sending" ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </span>
                        ) : (
                            <>
                                Complete Order <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
