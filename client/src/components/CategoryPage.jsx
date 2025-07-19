
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import RestaurantCard from './ResturantCard.jsx';

const CategoryPage = ({ category, userLocation, coordinates, foodData, onBack }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foodData && category) {
      const categoryKey = category.id.replace('_', '_');
      const categoryRestaurants = foodData[categoryKey] || [];
      setRestaurants(categoryRestaurants);
    }
  }, [category, foodData]);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen p-4 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-8">
        <button
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {category.emoji} {category.name}
          </h1>
          <p className="text-gray-600 text-sm">
            {restaurants.length} restaurants found
          </p>
        </div>
        <div className="w-9 h-9" />
      </div>

      {/* Location Info */}
      <div className="flex items-center justify-center glass-card rounded-2xl p-3 mb-6">
        <MapPin className="w-4 h-4 text-orange-500 mr-2" />
        <span className="text-sm text-gray-600">{userLocation}</span>
      </div>

      {/* Restaurants List */}
      <div className="space-y-4">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.place_id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RestaurantCard restaurant={restaurant} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {restaurants.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{category.emoji}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No {category.name} restaurants found
          </h3>
          <p className="text-gray-600">
            Try a different location or category
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryPage;
