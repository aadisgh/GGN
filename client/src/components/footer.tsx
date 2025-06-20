import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-shipping-fast text-2xl text-blue-400"></i>
              <span className="text-xl font-bold">United Overseas Couriers GGN</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted logistics partner delivering excellence across borders with secure, 
              fast, and reliable courier services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tracking')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Track Shipment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('quote')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Get Quote
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Domestic Courier</li>
              <li className="text-gray-300">International Courier</li>
              <li className="text-gray-300">Air Cargo</li>
              <li className="text-gray-300">Warehousing</li>
              <li className="text-gray-300">Bulk Logistics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p><i className="fas fa-map-marker-alt mr-2"></i>Gurgaon - 122016</p>
              <p><i className="fas fa-phone mr-2"></i>0124-2439847</p>
              <p><i className="fas fa-envelope mr-2"></i>uocgurgaon@gmail.com</p>
            </div>
          </div>
        </motion.div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 United Overseas Couriers GGN. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
