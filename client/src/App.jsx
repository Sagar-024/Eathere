import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import HomePage from './components/HomePage.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userLocation, setUserLocation] = useState('Detecting location...');
  const [coordinates, setCoordinates] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // 1. Get User Location
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      setCoordinates({ latitude, longitude });
      console.log('📍 User coordinates:', { latitude, longitude });

      // 2. Fetch food data from backend
      const foodResponse = await fetchFoodData(latitude, longitude);
      setFoodData(foodResponse);

      // ✅ 3. Use backend-detected location
      const locationFromBackend = foodResponse.current_location
        || foodResponse.location_details?.precise_address
        || 'Current Location';
      setUserLocation(locationFromBackend);

      // 4. Show HomePage
      setTimeout(() => {
        setCurrentPage('home');
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('❌ Error initializing app:', error);

      // ❌ Location fetch failed — use fallback
      const fallbackCoords = { latitude: 28.6139, longitude: 77.2090 }; // Delhi center
      setCoordinates(fallbackCoords);
      setUserLocation('Delhi, India');

      // Try to fetch food data for fallback location
      try {
        const foodResponse = await fetchFoodData(fallbackCoords.latitude, fallbackCoords.longitude);
        setFoodData(foodResponse);
      } catch (apiError) {
        console.error('❌ Fallback Data Fetch Failed:', apiError);
        setFoodData(null);
      }

      setTimeout(() => {
        setCurrentPage('home');
        setLoading(false);
      }, 3000);
    }
  };

  // 🔍 Get browser coordinates
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      console.log('🔍 Requesting location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Location permission granted');
          resolve(position);
        },
        (error) => {
          console.error('❌ Location permission denied:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10 * 60 * 1000 // 10 mins
        }
      );
    });
  };

  // 🥘 Fetch food data from our backend API
  const fetchFoodData = async (latitude, longitude) => {
    try {
      console.log('📡 Fetching food data from backend');

      const response = await axios.post('http://localhost:2000/api/v1/foodspots', {
        latitude,
        longitude
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      });

      const data = response.data;
      console.log('✅ Food data received:', data);

      // 🧭 Log categories and counts
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          console.log(`🍱 ${key}: ${value.length} places`);
        }
      });

      return data;
    } catch (error) {
      console.error('❌ Food data fetch failed:', error);

      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response from server.');
      } else {
        console.error('Request error:', error.message);
      }

      throw error;
    }
  };

  // When user selects a category from homepage
  const handleCategorySelect = (category) => {
    console.log('🎯 Selected category:', category);
    setSelectedCategory(category);
    setCurrentPage('category');
  };

  // Go back from category to home
  const handleBackToHome = () => {
    console.log('🔙 Going back to home');
    setSelectedCategory(null);
    setCurrentPage('home');
  };

  // User taps "refresh location"
  const handleLocationRefresh = async () => {
    setLoading(true);
    await initializeApp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <AnimatePresence mode="wait">
        {currentPage === 'loading' && <LoadingScreen key="loading" />}
        {currentPage === 'home' && (
          <HomePage 
            key="home"
            userLocation={userLocation}             // ✅ Mahipalpur or "Gali No 16"
            coordinates={coordinates}
            foodData={foodData}
            onCategorySelect={handleCategorySelect}
            onLocationRefresh={handleLocationRefresh}
            loading={loading}
          />
        )}
        {currentPage === 'category' && (
          <CategoryPage
            key="category"
            category={selectedCategory}
            userLocation={userLocation}             // ✅ Pass to show per category page too
            coordinates={coordinates}
            foodData={foodData}
            onBack={handleBackToHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
