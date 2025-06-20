import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I track my shipment?",
    answer: "You can track your shipment using our online tracking system by entering your tracking number on our website or by calling our customer service at 0124-2439847."
  },
  {
    question: "What are your delivery timeframes?",
    answer: "Domestic deliveries typically take 2-5 business days, express deliveries take 1-2 days, and international deliveries vary by destination (5-15 business days)."
  },
  {
    question: "Do you provide insurance for packages?",
    answer: "Yes, we offer comprehensive insurance coverage for your valuable packages. Insurance rates vary based on the declared value of your shipment."
  },
  {
    question: "What items are prohibited for shipping?",
    answer: "We cannot ship hazardous materials, liquids, perishables, weapons, illegal substances, and fragile items without proper packaging. Contact us for a complete list."
  },
  {
    question: "How do I schedule a pickup?",
    answer: "You can schedule a pickup by calling us at 0124-2439847, visiting our office, or using our online pickup request form. We offer same-day pickup in most areas."
  }
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers to help you with your shipping needs
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass rounded-xl overflow-hidden border-none">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 transition-colors font-semibold text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
