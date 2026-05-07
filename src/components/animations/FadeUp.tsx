import React from 'react';
import { motion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  [key: string]: any; // Allow pass-through of data-* and other HTML attributes
}

const FadeUp: React.FC<FadeUpProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  className = "",
  amount = 0.2,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
