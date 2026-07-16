import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | JK Security Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

      <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-10">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link to="/">
              <Button className="mx-auto">
                Return to Homepage
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFoundPage;
