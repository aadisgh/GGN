import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TrackingSection from "@/components/tracking-section";
import QuoteSection from "@/components/quote-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import PickupSection from "@/components/pickup-section";
import Footer from "@/components/footer";
import WhatsAppWidget from "@/components/whatsapp-widget";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrackingSection />
      <QuoteSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <PickupSection />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
