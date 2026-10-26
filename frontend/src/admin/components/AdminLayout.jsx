import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Menu, X, Users, Briefcase, FileText, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './Toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = localStorage.getItem('adminInfo');
    if (!userInfo) {
      navigate('/');
    } else {
      setAdminUser(JSON.parse(userInfo));
    }
  }, [navigate]);

  // Handle responsive sidebar initial state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/jasim');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries (CRM)', path: '/admin/enquiries', icon: Users },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  ];

  const securityItems = [
    { name: 'Services', path: '/admin/services/security', icon: Briefcase },
    { name: 'Projects', path: '/admin/projects/security', icon: FileText },
  ];

  const designItems = [
    { name: 'Services', path: '/admin/services/design', icon: Briefcase },
    { name: 'Projects', path: '/admin/projects/design', icon: FileText },
  ];

  const settingsItems = [
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  if (!adminUser) return null;

  return (
    <ToastProvider>
      <div className="h-screen overflow-hidden bg-[#050505] text-white flex">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#0a0a0a] border-r border-white/5 flex flex-col flex-shrink-0 absolute md:relative z-50 h-full"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold tracking-wider">
                JK<span className="text-accent">Admin</span>
              </Link>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2" data-lenis-prevent="true">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-accent/10 text-accent font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-accent' : ''} />
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-4 mb-2 px-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Security Solutions
              </div>
              {securityItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={`security-${item.name}`}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-accent/10 text-accent font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-accent' : ''} />
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-4 mb-2 px-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Design & Printing
              </div>
              {designItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={`design-${item.name}`}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-purple-500/10 text-purple-400 font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-purple-400' : ''} />
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-4 mb-2 px-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
                System
              </div>
              {settingsItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-accent/10 text-accent font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-accent' : ''} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center font-bold">
                  {adminUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{adminUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{adminUser.role}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 rounded-lg hover:bg-red-400/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md flex items-center px-6 sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors mr-4"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-xl font-semibold">
            {navItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto" data-lenis-prevent="true">
          <Outlet />
        </div>
      </main>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;
