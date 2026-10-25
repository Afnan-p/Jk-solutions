import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-[#C6A15B] text-[#101312] hover:bg-[#D9BD82] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(198,161,91,0.25)] border border-transparent font-bold",
    secondary: "bg-white/5 backdrop-blur-md border border-[#C6A15B]/30 text-[#FAF9F5] hover:bg-white/10 hover:border-[#C6A15B] hover:-translate-y-0.5",
    outline: "border border-[#C6A15B]/40 text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#101312] rounded-lg font-semibold"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
