import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 relative">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern warehouse facility" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About United Overseas Couriers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established as a trusted name in logistics, we've been connecting businesses and individuals 
            across borders for over a decade.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-200 mb-6">
              To provide reliable, efficient, and cost-effective logistics solutions that exceed customer 
              expectations while maintaining the highest standards of security and tracking.
            </p>
            
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-200 mb-6">
              To become the leading courier service provider in North India, known for innovation, 
              reliability, and exceptional customer service.
            </p>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-gray-300">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-gray-300">Tracked</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional logistics team" 
              className="rounded-2xl shadow-lg w-full" 
            />
            
            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Coverage Areas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Delhi NCR</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Mumbai</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Bangalore</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Chennai</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">International</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
