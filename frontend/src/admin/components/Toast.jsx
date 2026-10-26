import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', title = '') => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, title };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 3800);
  }, [removeToast]);

  const toast = {
    success: (msg, title = 'Success!') => showToast(msg, 'success', title),
    error: (msg, title = 'Error!') => showToast(msg, 'error', title),
    info: (msg, title = 'Note') => showToast(msg, 'info', title),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2.5 items-center pointer-events-none w-full max-w-md px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`pointer-events-auto w-full flex items-start gap-3.5 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
                t.type === 'success'
                  ? 'bg-[#0f1712]/95 border-emerald-500/30 text-emerald-100 shadow-[0_10px_35px_rgba(16,185,129,0.2)]'
                  : t.type === 'error'
                  ? 'bg-[#1a0f0f]/95 border-rose-500/30 text-rose-100 shadow-[0_10px_35px_rgba(244,63,94,0.2)]'
                  : 'bg-[#11161d]/95 border-amber-500/30 text-amber-100 shadow-[0_10px_35px_rgba(245,158,11,0.2)]'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'success' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={19} />
                  </div>
                )}
                {t.type === 'error' && (
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <AlertCircle size={19} />
                  </div>
                )}
                {t.type === 'info' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Info size={19} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 pr-2">
                {t.title && (
                  <h4 className="text-sm font-bold tracking-wide mb-0.5 text-white">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {t.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return fallback no-op if used outside provider
    return {
      showToast: (msg) => alert(msg),
      toast: {
        success: (msg) => alert(msg),
        error: (msg) => alert(msg),
        info: (msg) => alert(msg),
      },
    };
  }
  return context;
};

export default ToastProvider;
