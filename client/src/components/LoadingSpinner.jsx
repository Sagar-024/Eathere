// src/components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs">🍽️</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
