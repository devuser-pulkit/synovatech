import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title }) => {
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto pointer-events-auto border border-slate-200"
        >
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center z-10">
            <h3 className="heading-display text-2xl font-bold text-slate-900">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-8 prose prose-slate max-w-none text-slate-600">
            {title === "Privacy Policy" ? (
              <>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">1. Introduction</h4>
                <p>Welcome to Synovatech India. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">2. The data we collect about you</h4>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Technical Data, Profile Data, and Usage Data.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">3. How we use your personal data</h4>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests; Where we need to comply with a legal obligation.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">4. Data security</h4>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>
              </>
            ) : (
              <>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">1. Agreement to Terms</h4>
                <p>By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">2. Use License</h4>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on Synovatech's website for personal, non-commercial transitory viewing only.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">3. Disclaimer</h4>
                <p>The materials on Synovatech's website are provided on an 'as is' basis. Synovatech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                <h4 className="font-bold text-slate-900 mt-6 mb-2">4. Limitations</h4>
                <p>In no event shall Synovatech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Synovatech's website.</p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
