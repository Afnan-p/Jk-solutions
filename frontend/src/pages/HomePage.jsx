import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import ServicesSection from '../components/ServicesSection';
import DesignSection from '../components/DesignSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Counters from '../components/Counters';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ConsultationSection from '../components/ConsultationSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>JK Security Solutions | Premium Automation & Security</title>
        <meta name="description" content="Kerala's leading premium Security, Automation, and Solar solutions provider. Experience technology that protects what matters most." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        <TrustLogos />
        <ServicesSection />
        <DesignSection />
        <WhyChooseUs />
        <Counters />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <ConsultationSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
