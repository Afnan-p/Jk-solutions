import { Helmet } from 'react-helmet-async';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import ServicesSection from '../components/ServicesSection';
import DesignSection from '../components/DesignSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Counters from '../components/Counters';
import ProjectsSection from '../components/ProjectsSection';
import HowItWorks from '../components/HowItWorks';
import ServicesShowcase from '../components/ServicesShowcase';
import TestimonialsSection from '../components/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';
import ConsultationSection from '../components/ConsultationSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>JK Solutions — Premium Intelligent Security & Automation</title>
        <meta name="description" content="Kerala's leading security technology company providing 24/7 CCTV surveillance, smart home automation, gate automation, solar systems, access control, and corporate printing." />
      </Helmet>
      
      {/* 2px Champagne Gold Scroll Progress Bar */}
      <ScrollProgress />

      <Navbar />
      
      <main className="bg-[#101312]">
        {/* 1. HERO SECTION (Dark Architectural Luxury) */}
        <Hero />

        {/* 2. TRUSTED TECHNOLOGY PARTNERS (Warm Ivory Bar) */}
        <TrustLogos />

        
        {/* 4. CREATIVE DESIGN & PRINTING (Soft Warm Ivory) */}
        <DesignSection />

        {/* 3. SECURITY SOLUTIONS (Warm Ivory Section) */}
        <ServicesSection />


        {/* 5. WHY JK SOLUTIONS (Warm Light Section) */}
        <WhyChooseUs />

        {/* 6. STATISTICS (Deep Dark Section) */}
        <Counters />

        {/* 7. FEATURED PROJECTS (Warm Ivory Section) */}
        <ProjectsSection />

        {/* 8. HOW WE SECURE YOUR SPACE (Warm Ivory Section) */}
        <HowItWorks />

        {/* 9. COMPLETE SOLUTIONS / EDITORIAL SHOWCASE (Dark Charcoal Section) */}
        <ServicesShowcase />

        {/* 10. TESTIMONIALS (Deep Dark Section) */}
        <TestimonialsSection />

        {/* 11. FINAL CTA (Cinematic Visual Section) */}
        <FinalCTA />

        {/* 12. FAQ + CONTACT FORM (Warm Ivory 2-Column Section) */}
        <ConsultationSection />
      </main>

      {/* 13. FOOTER (Deep Dark Footer) */}
      <Footer />
    </>
  );
};

export default HomePage;
