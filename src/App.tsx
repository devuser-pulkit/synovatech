import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ASSETS, CONTACT_INFO } from './config';
import { OrderModal } from './components/OrderModal';
import { ServiceModal, ServiceDetail } from './components/ServiceModal';
import { Services, SERVICE_ITEMS } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { HeroGraphic } from './components/HeroGraphic';
import { PolicyModal } from './components/PolicyModal';
import { ArrowRight, Menu, X, Mail, Phone, MapPin } from 'lucide-react';

const LogoSvg = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1 border-2 border-brand-accent rounded-lg bg-slate-50 text-brand-blue">
    {/* Screen/Monitor back */}
    <rect x="15" y="25" width="70" height="50" rx="8" stroke="currentColor" strokeWidth="6" strokeOpacity="0.4" />
    <path d="M 35 75 L 35 85 L 65 85 L 65 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
    <path d="M 25 85 L 75 85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
    
    {/* Core Lens */}
    <circle cx="40" cy="40" r="22" fill="white" stroke="#4f46e5" strokeWidth="6" />
    <circle cx="40" cy="40" r="10" fill="#4f46e5" />
    <circle cx="43" cy="37" r="3" fill="white" />
    
    {/* Circuit lines */}
    <path d="M 62 40 L 75 40 L 80 45" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="80" cy="45" r="4" fill="#4f46e5" />
    <path d="M 55 55 L 65 65 L 75 65" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="75" cy="65" r="4" fill="#06b6d4" />
  </svg>
);

const Logo = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError || !ASSETS.logo) {
    return <LogoSvg />;
  }
  
  return (
    <img 
      src={ASSETS.logo} 
      alt="Synovatech Logo" 
      className="w-full h-full object-cover" 
      onError={() => setHasError(true)} 
    />
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [policyType, setPolicyType] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.05], [-20, 0]);

  const openForm = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-accent selection:text-white">
      {/* Dynamic sticky header */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
               <Logo />
            </div>
            <span className="heading-display font-extrabold text-2xl tracking-tight text-brand-blue">SYNOVA<span className="text-brand-accent">TECH</span></span>
          </div>
          <nav className="flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-brand-accent transition-colors">Impact</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
            <button 
              onClick={openForm}
              className="bg-brand-accent text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-200"
            >
              Place Order
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white fixed top-0 w-full z-40 border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
               <Logo />
            </div>
            <span className="heading-display font-extrabold text-lg text-brand-blue tracking-tight">SYNOVA<span className="text-brand-accent">TECH</span></span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-blue p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-30 p-6 flex flex-col gap-6 font-medium text-lg border-t border-slate-200">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-900 border-b border-slate-200 pb-4">Services</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-900 border-b border-slate-200 pb-4">Impact</a>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openForm(); }}
              className="bg-brand-accent text-white py-4 rounded-xl mt-4 flex justify-center w-full shadow-lg shadow-indigo-200 font-bold"
            >
              Place Order
            </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-gradient-to-b from-white to-brand-light">
        <div className="absolute inset-0 z-0">
          <img src={ASSETS.heroImage} alt="Modern Office" className="w-full h-full object-cover opacity-[0.03] grayscale" />
        </div>
        <HeroGraphic />
        <div className="fixed bottom-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -mb-32 -mr-32 blur-3xl pointer-events-none z-0"></div>
        <div className="fixed top-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full -mt-32 -ml-32 blur-3xl pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-[1fr_0.8fr] gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1"
          >
            {/* Top mobile logo only shown if no sticky nav yet */}
            <div className="hidden md:flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                <Logo />
              </div>
              <span className="heading-display font-extrabold text-2xl tracking-tighter text-brand-blue">SYNOVA<span className="text-brand-accent">TECH</span></span>
            </div>

            <span className="px-4 py-1.5 rounded-full bg-brand-accent/5 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6 border border-brand-accent/20 inline-block">Future-Ready Infrastructure</span>
            <h1 className="heading-display text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-brand-blue mb-8">
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-cyan-500 relative inline-block">
                Business Operations
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
              Comprehensive CCTV Surveillance, Reliable Manpower, and Advanced Software Solutions tailored for modern, forward-thinking enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openForm}
                className="bg-brand-accent text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
              >
                PLACE ORDER NOW <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
              <a 
                href="#services"
                className="bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 hover:text-brand-accent transition-colors flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <main>
        <Services onOrderClick={openForm} onServiceSelect={setSelectedService} />
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white text-slate-900 pt-24 pb-12 mt-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                 <Logo />
              </div>
              <span className="heading-display font-extrabold text-2xl tracking-tighter text-slate-900">SYNOVA<span className="text-brand-accent">TECH</span></span>
            </div>
            <p className="text-slate-600 max-w-sm mb-8 leading-relaxed">
              Delivering specialized, integrated solutions to secure, scale, and software-enable businesses globally.
            </p>
            <button 
              onClick={openForm}
              className="bg-brand-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter block mb-6">Contact Us</span>
            <div className="space-y-4">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-sm font-semibold text-slate-900 hover:text-brand-accent transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0 text-slate-400" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <Phone className="w-4 h-4 flex-shrink-0 text-slate-400" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-slate-400" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter block mb-6">Services</span>
            <ul className="space-y-3 font-semibold text-sm text-slate-600">
              <li><button onClick={() => setSelectedService(SERVICE_ITEMS[0])} className="hover:text-brand-accent transition-colors cursor-pointer text-left">CCTV & Surveillance</button></li>
              <li><button onClick={() => setSelectedService(SERVICE_ITEMS[1])} className="hover:text-brand-accent transition-colors cursor-pointer text-left">Manpower Supply</button></li>
              <li><button onClick={() => setSelectedService(SERVICE_ITEMS[2])} className="hover:text-brand-accent transition-colors cursor-pointer text-left">Software Solutions</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Synovatech. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={() => setPolicyType('Privacy Policy')} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button onClick={() => setPolicyType('Terms of Service')} className="hover:text-slate-900 transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} title={policyType || ''} />
      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService}
        onOrderClick={openForm}
      />
    </div>
  );
}
