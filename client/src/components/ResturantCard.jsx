// src/components/RestaurantCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Navigation, Heart } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-3xl overflow-hidden floating-card"
    >
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        
        {/* Distance Ring */}
        <div className="absolute top-4 left-4">
          <div className="relative">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-700">
                {restaurant.distance_formatted || '1.2km'}
              </span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse-ring" />
          </div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        {/* Taste Score Badge */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold">
            Taste {restaurant.taste_score || '4.5'}
          </span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {restaurant.name || 'Restaurant Name'}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {restaurant.address || 'Restaurant Address'}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">
              {restaurant.rating || '4.2'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {restaurant.review_count || '50'} reviews
          </span>
        </div>

        {/* Distance & Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm text-gray-600">
              {restaurant.distance_formatted || '1.2 km'}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              {restaurant.walking_time || '15 min walk'}
            </span>
          </div>
        </div>

        {/* Get Directions Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetDirections}
          className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-3 px-6 rounded-2xl flex items-center justify-center hover:from-orange-600 hover:to-green-600 transition-all duration-300"
        >
          <Navigation className="w-5 h-5 mr-2" />
          Get Directions
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
