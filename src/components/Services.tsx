import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ASSETS } from '../config';
import { ShieldCheck, Users, Code, ArrowRight } from 'lucide-react';
import { ServiceModal, ServiceDetail } from './ServiceModal';

export const SERVICE_ITEMS: ServiceDetail[] = [
  {
    id: 'security',
    title: 'CCTV & Surveillance Installations',
    description: 'State-of-the-art surveillance systems ensuring 24/7 endpoint security and unparalleled peace of mind for your physical assets across India.',
    icon: ShieldCheck,
    image: ASSETS.services.security,
    benefits: [
      'High-Definition AI-powered analytics (Face & License Plate Recognition)',
      '24/7 Cloud-connected monitoring and real-time mobile alerts',
      'Tamper-proof hardware designed for Indian weather conditions',
      'Plants perimeter CCTV & Sensers security solution',
      'Plant gate automation solution - VAV, Bolard, Pipord',
      'Building Access Solution - Face Reader, Card Reader, Biometric Reader',
      'Command and Control Design'
    ],
    caseStudy: {
      title: 'Securing a 20-Acre Logistics Hub in Mumbai',
      metric: '98% Reduction in Inventory Theft',
      description: 'Deployed 150+ robust HD CCTV cameras with centralized tracking for a leading logistics park in Navi Mumbai, streamlining truck entry-exit times and eliminating blind spots.'
    },
    testimonial: {
      quote: "Synovatech's security installation at our Pune facility was flawless. The clarity, reliable uptime, and rapid local support give us complete peace of mind.",
      author: 'Rajesh S.',
      role: 'Head of Operations',
      company: 'Express Logistics Pvt Ltd'
    }
  },
  {
    id: 'manpower',
    title: 'Manpower Supply',
    description: 'Vetted, highly-trained professionals ready to seamlessly integrate into your operations and scale your workforce efficiently anywhere in the country.',
    icon: Users,
    image: ASSETS.services.manpower,
    benefits: [
      'Pre-vetted technical and facility management staff',
      'Rapid deployment capabilities within 48 to 72 hours',
      'Strict adherence to Indian labor compliance and payroll',
      'Supply main power - labour, supervisor, manager, security guard, housekeeping, etc.'

    ],
    caseStudy: {
      title: 'Scaling Operations for a Delhi-NCR Tech Park',
      metric: '99.9% Operational Uptime',
      description: 'Supplied and managed a dedicated workforce of 250+ trained professionals for a sprawling commercial complex in Gurugram, bridging a critical staffing gap in under 14 days.'
    },
    testimonial: {
      quote: "Finding reliable, skilled manpower in India can be challenging at scale. Synovatech delivered vetted professionals who integrated seamlessly into our Bangalore tech campus.",
      author: 'Priya M.',
      role: 'VP Human Resources',
      company: 'Global Tech Solutions India'
    }
  },
  {
    id: 'software',
    title: 'Software Solutions',
    description: 'Custom, robust enterprise software designed to streamline complex operations, accelerate workflows, and drive business growth within local and global markets.',
    icon: Code,
    image: ASSETS.services.software,
    benefits: [
      'Software design and development for complex enterprise needs',
      'Custom ERP & CRM integrations tailored to your business logic',
      'Highly scalable cloud architectures (AWS, Azure, GCP)',
      'Localized data compliances ensuring absolute security'
    ],
    caseStudy: {
      title: 'Digital Transformation for a Chennai Manufacturer',
      metric: '40% Cut in Process Delays',
      description: 'Engineered a bespoke supply chain module that bridged legacy shop-floor systems with modern logistics data, providing real-time inventory visibility Pan-India.'
    },
    testimonial: {
      quote: "The custom software solution built by Synovatech completely transformed how we track inventory across our 12 Indian warehouses. Highly recommended for complex enterprise builds.",
      author: 'Anil D.',
      role: 'Chief Technology Officer',
      company: 'Apex Manufacturing India'
    }
  }
];

interface ServicesProps {
  onOrderClick?: () => void;
  onServiceSelect?: (service: ServiceDetail) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOrderClick = () => {}, onServiceSelect = () => {} }) => {
  return (
    <>
      <section id="services" className="py-24 bg-white relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Our Core Offerings</h2>
              <h3 className="heading-display text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Solutions that scale your enterprise.
              </h3>
              <p className="text-lg text-slate-600">
                We provide an integrated suite of services designed to protect, power, and digitize your operations from the ground up for the Indian market.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_ITEMS.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onServiceSelect(service)}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent z-10 transition-colors duration-500" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm">
                    <service.icon className="w-6 h-6 text-brand-accent group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <h4 className="heading-display text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-slate-500 flex-grow mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-brand-accent transition-colors cursor-pointer">
                    Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
