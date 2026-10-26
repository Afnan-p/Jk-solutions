import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, ChevronDown } from 'lucide-react';
import api from '../../api';
import { useToast } from '../components/Toast';

const ManageEnquiries = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/enquiries');
      setEnquiries(data);
    } catch (err) {
      setError('Failed to fetch enquiries. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/enquiries/${id}`, { status: newStatus });
      // Update local state to reflect change immediately
      setEnquiries(enquiries.map(enq => enq._id === id ? { ...enq, status: newStatus } : enq));
      toast.success(`Enquiry marked as ${newStatus}`);
    } catch (error) {
      toast.error('Error updating enquiry status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.delete(`/enquiries/${id}`);
        setEnquiries(enquiries.filter(enq => enq._id !== id));
        toast.success('Enquiry deleted successfully');
      } catch (error) {
        toast.error('Error deleting enquiry');
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Contacted': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Enquiries CRM</h1>
          <p className="text-sm text-gray-400">Manage client messages and service requests.</p>
        </div>
      </div>

      <div className="bg-[#050505] p-6 rounded-2xl border border-white/5">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading enquiries...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 bg-red-400/10 rounded-xl">{error}</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <div className="text-gray-400 mb-2">No enquiries found.</div>
            <p className="text-sm text-gray-500">When users submit the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {enquiries.map((enquiry) => (
              <div key={enquiry._id} className="bg-[#101010] p-5 rounded-xl border border-white/5 flex flex-col md:flex-row gap-6">
                {/* Info Section */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{enquiry.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5"><Phone size={14} className="text-accent"/> {enquiry.phone}</span>
                        {enquiry.email && <span className="flex items-center gap-1.5"><Mail size={14} className="text-accent"/> {enquiry.email}</span>}
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent"/> {new Date(enquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {enquiry.serviceInterest && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Interested In</span>
                      <p className="text-sm text-gray-300 mt-0.5">{enquiry.serviceInterest}</p>
                    </div>
                  )}

                  {enquiry.message && (
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{enquiry.message}</p>
                    </div>
                  )}
                </div>

                {/* Action Section */}
                <div className="flex md:flex-col justify-between items-end md:min-w-[150px] border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  
                  {/* Status Dropdown */}
                  <div className="relative group w-full">
                    <select 
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                      className={`w-full appearance-none outline-none cursor-pointer border rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${getStatusColor(enquiry.status)}`}
                    >
                      <option value="New" className="bg-[#101010] text-white">New</option>
                      <option value="Contacted" className="bg-[#101010] text-white">Contacted</option>
                      <option value="Completed" className="bg-[#101010] text-white">Completed</option>
                      <option value="Rejected" className="bg-[#101010] text-white">Rejected</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>

                  <button 
                    onClick={() => handleDelete(enquiry._id)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors mt-4"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEnquiries;
