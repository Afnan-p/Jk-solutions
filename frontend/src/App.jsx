import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'

// Lazy load components for performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const FloatingButtons = lazy(() => import('./components/FloatingButtons'))
import ScrollToTop from './components/ScrollToTop'

// Admin lazy load
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'))
const DashboardHome = lazy(() => import('./admin/pages/DashboardHome'))
const ManageServices = lazy(() => import('./admin/pages/ManageServices'))
const ManageProjects = lazy(() => import('./admin/pages/ManageProjects'))
const ManageEnquiries = lazy(() => import('./admin/pages/ManageEnquiries'))
const ManageTestimonials = lazy(() => import('./admin/pages/ManageTestimonials'))
const ManageSettings = lazy(() => import('./admin/pages/ManageSettings'))

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Dynamic Services & Projects Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/security" element={<ServicesPage division="security" />} />
            <Route path="/services/design" element={<ServicesPage division="design" />} />
            <Route path="/services/:division/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/security" element={<ProjectsPage division="security" />} />
            <Route path="/projects/design" element={<ProjectsPage division="design" />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="services/:division" element={<ManageServices />} />
              <Route path="projects/:division" element={<ManageProjects />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="settings" element={<ManageSettings />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <FloatingButtons />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
