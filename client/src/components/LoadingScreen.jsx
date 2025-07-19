// src/components/LoadingScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Improved Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl">
            <div className="text-3xl font-bold text-orange-500">🍽️</div>
          </div>
        </motion.div>

        {/* Animated Text with Better Styling */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
        >
          What are you craving for?
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/80 text-lg mb-8"
        >
          Discovering amazing food near you...
        </motion.p>

        {/* Animated Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-4 h-4 bg-white rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-8 mx-auto"
        >
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
