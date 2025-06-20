import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "CEO, TechnoSoft Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    quote: "United Overseas Couriers has been our go-to logistics partner for 3 years. Their tracking system is excellent and delivery is always on time. Highly recommended!",
    rating: 5
  },
  {
    name: "Priya Sharma",
    position: "Operations Manager, E-Commerce Plus",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    quote: "Exceptional service quality and professional handling. They've helped us expand our business reach across India with their reliable courier network.",
    rating: 5
  },
  {
    name: "Amit Patel",
    position: "Director, Global Exports",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    quote: "Their international courier service is outstanding. Complex customs procedures made simple, and packages always reach safely to our global clients.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by businesses and individuals across India and beyond
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="mb-6">
                <i className="fas fa-quote-left text-blue-500 text-3xl"></i>
              </div>
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name} 
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" 
              />
              <p className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[currentIndex].quote}"
              </p>
              <h4 className="font-bold text-gray-800">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-600">{testimonials[currentIndex].position}</p>
              <div className="flex justify-center mt-2">
                <span className="text-yellow-500">
                  {'★'.repeat(testimonials[currentIndex].rating)}
                </span>
              </div>
            </motion.div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
