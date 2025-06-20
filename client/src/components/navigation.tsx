import { useState } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 glass border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-shipping-fast text-2xl text-blue-400"></i>
            <span className="text-xl font-bold text-white">United Overseas Couriers GGN</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('tracking')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              Track
            </button>
            <button 
              onClick={() => scrollToSection('quote')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              Quote
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-blue-300 transition-colors"
            >
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-2 glass rounded-lg p-4">
              <button onClick={() => scrollToSection('home')} className="text-white py-2 text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-white py-2 text-left">About</button>
              <button onClick={() => scrollToSection('services')} className="text-white py-2 text-left">Services</button>
              <button onClick={() => scrollToSection('tracking')} className="text-white py-2 text-left">Track</button>
              <button onClick={() => scrollToSection('quote')} className="text-white py-2 text-left">Quote</button>
              <button onClick={() => scrollToSection('contact')} className="text-white py-2 text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
