import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileText, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

const DashboardHome = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Enquiries', value: statsData ? statsData.totalEnquiries : '-', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Services', value: statsData ? statsData.totalServices : '-', icon: Briefcase, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Portfolio Projects', value: statsData ? statsData.totalProjects : '-', icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl relative overflow-hidden border border-white/5"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, Admin!</h1>
        <p className="text-gray-400 max-w-xl">
          Here's what's happening with your platform today. Manage your dynamic content, review new leads, and update your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between group"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Placeholder */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Enquiries</h3>
            <Link to="/admin/enquiries" className="text-sm text-accent hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm italic">Connecting to database to fetch recent leads...</p>
            ) : statsData?.recentEnquiries?.length > 0 ? (
              statsData.recentEnquiries.map(enq => (
                <div key={enq._id} className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="text-white text-sm font-medium">{enq.name}</h4>
                    <p className="text-xs text-gray-400">{enq.serviceInterest || 'General Inquiry'}</p>
                  </div>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">New</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No recent enquiries found.</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/projects/security" className="bg-white/5 hover:bg-white/10 p-4 rounded-xl text-left transition-colors border border-white/5 block">
              <span className="block text-white font-medium mb-1">Add Project</span>
              <span className="text-xs text-gray-500">Update your portfolio</span>
            </Link>
            <Link to="/admin/services/security" className="bg-white/5 hover:bg-white/10 p-4 rounded-xl text-left transition-colors border border-white/5 block">
              <span className="block text-white font-medium mb-1">Add Service</span>
              <span className="text-xs text-gray-500">Expand your offerings</span>
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default DashboardHome;
