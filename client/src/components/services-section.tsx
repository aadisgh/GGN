import { motion } from "framer-motion";

const services = [
  {
    icon: "fas fa-truck",
    title: "Domestic Courier",
    description: "Fast and reliable delivery across India with real-time tracking and secure handling."
  },
  {
    icon: "fas fa-globe",
    title: "International Courier",
    description: "Worldwide shipping with customs clearance and door-to-door delivery services."
  },
  {
    icon: "fas fa-plane",
    title: "Air Cargo",
    description: "Express air freight services for time-sensitive and high-value shipments."
  },
  {
    icon: "fas fa-warehouse",
    title: "Warehousing",
    description: "Secure storage solutions with inventory management and distribution services."
  },
  {
    icon: "fas fa-boxes",
    title: "Bulk Logistics",
    description: "Cost-effective solutions for large volume shipments and business logistics."
  },
  {
    icon: "fas fa-shield-alt",
    title: "Secure Delivery",
    description: "Enhanced security for valuable items with insurance and signature confirmation."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 gradient-bg relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your delivery needs
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl p-8 service-card cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-blue-100">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
