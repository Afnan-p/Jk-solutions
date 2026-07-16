import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-3.5 rounded-[18px] font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-[#E09B0D] text-black hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(253,181,21,0.5)] border border-transparent",
    secondary: "bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg",
    outline: "border border-accent text-accent hover:bg-accent hover:text-black rounded-[18px]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
