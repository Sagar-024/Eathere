// src/components/FoodCategoryCard.jsx

import React from "react";
import { motion } from "framer-motion";

const FoodCategoryCard = ({ category, restaurantCount, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-3xl bg-white shadow-xl overflow-hidden cursor-pointer group border border-orange-100"
    >
      {/* Image Reveal Effect */}
      <div className="relative w-full h-40 overflow-hidden">
        <motion.img
          src={category.photo}
          alt={category.name}
          className="w-full h-[200px] object-cover"
          initial={{ y: 0 }}
          whileHover={{ y: -40 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // smooth cubic
          }}
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pt-5 pb-6 text-center bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {category.name}
        </h3>

        {restaurantCount > 0 && (
          <div className="text-sm text-gray-600 mb-2">
            {restaurantCount} places found
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full" />
        </div>
      </div>

      {/* Hover Overlay Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex items-end justify-center bg-black/20 backdrop-blur-md rounded-3xl opacity-0 group-hover:opacity-100 transition"
      >
        <div className="text-white font-semibold mb-4">
          Explore {restaurantCount} {category.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FoodCategoryCard;
