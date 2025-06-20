import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [counters, setCounters] = useState({ packages: 0, clients: 0, countries: 0 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const animateCounters = () => {
      const targets = { packages: 10000, clients: 500, countries: 25 };
      const duration = 2000;
      const steps = 60;
      const increment = {
        packages: targets.packages / steps,
        clients: targets.clients / steps,
        countries: targets.countries / steps
      };

      let current = { packages: 0, clients: 0, countries: 0 };
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = {
          packages: Math.min(Math.floor(current.packages + increment.packages), targets.packages),
          clients: Math.min(Math.floor(current.clients + increment.clients), targets.clients),
          countries: Math.min(Math.floor(current.countries + increment.countries), targets.countries)
        };
        setCounters(current);

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    const heroElement = document.getElementById('home');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
            alt="Cargo ship" 
            className="w-full h-full object-cover animate-float" 
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Delivering Trust <br />
            <span className="text-blue-300">Across Borders</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100 mb-8"
          >
            Your reliable partner for domestic and international courier services. 
            Fast, secure, and tracked delivery solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => scrollToSection('tracking')} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all hover:scale-105 animate-glow"
            >
              <i className="fas fa-search"></i>
              <span>Track Shipment</span>
            </button>
            <button 
              onClick={() => scrollToSection('quote')} 
              className="glass text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all hover:scale-105"
            >
              <i className="fas fa-calculator"></i>
              <span>Get Quote</span>
            </button>
          </motion.div>
          
          {/* Stats Counter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{counters.packages.toLocaleString()}</div>
              <div className="text-blue-200">Packages Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{counters.clients}</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{counters.countries}</div>
              <div className="text-blue-200">Countries Covered</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
