import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, RefreshCw } from "lucide-react";

// Food categories setup remains unchanged
// Food categories
const foodCategories = [
  { id: "momos", name: "Momos", photo: "https://cdn.pixabay.com/photo/2020/09/21/14/07/meal-5590186_1280.jpg" },
  { id: "dosa", name: "Dosa", photo: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg" },
  { id: "biryani", name: "Biryani", photo: "https://cdn.pixabay.com/photo/2024/02/10/00/53/biryani-8563961_1280.jpg" },
  { id: "pizza", name: "Pizza", photo: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg" },
  { id: "burger", name: "Burger", photo: "https://images.pexels.com/photos/1199956/pexels-photo-1199956.jpeg" },
  { id: "chaat", name: "Chaat", photo: "https://images.pexels.com/photos/32894826/pexels-photo-32894826.jpeg" },
  { id: "thali", name: "Thali", photo: "https://images.pexels.com/photos/8148149/pexels-photo-8148149.jpeg" },
  { id: "ice_cream", name: "Ice Cream", photo: "https://images.pexels.com/photos/1309583/pexels-photo-1309583.jpeg" },
];


const glassBlur = "backdrop-blur-lg bg-white/80 shadow-xl ring-1 ring-black/5 border border-white/70";

const HomePage = ({
  userLocation,
  coordinates,
  foodData,
  onCategorySelect,
  onLocationRefresh,
  loading
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getAvailableCategories = () => {
    if (!foodData) return [];
    return foodCategories.filter(cat => {
      const key = cat.id.replace("_", "_");
      return foodData[key] && foodData[key].length > 0;
    });
  };

  const getRecommended = () =>
    foodCategories
      .filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .slice(0, 3);

  const availableCategories = getAvailableCategories();
  const recommended = searchQuery.length > 0 ? getRecommended() : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen max-w-md mx-auto px-0 pb-8 pt-6"
      style={{
        background: " linear-gradient(135deg,#fdf6e3 0%,#ffe3c7 72%,#ddeecb 100%)",
      }}
    >
      {/* Header: EatHere and Location in one row, spaced */}
      <div className="flex   items-baseline-last justify-between px-4 mb-6 w-full gap-4 mt-1 pb-2 " >
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap"
          style={{ fontFamily: "Borel, cursive", filter: "brightness(110%)" }}
        >
          EatHere
        </motion.h1>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl drop-shadow-lg ${glassBlur} min-w-[145px] max-w-xs`}
          style={{ justifyContent: "flex-end", width: "auto" }}
        >
          <MapPin className="w-5 h-5 text-orange-500" />
          <span
            className="text-base font-medium text-gray-700 truncate max-w-[90px] sm:max-w-[150px]"
            title={userLocation}
          >
            {userLocation}
          </span>
          <button
            onClick={onLocationRefresh}
            className="p-1 ml-1 hover:bg-orange-100 rounded-full transition-colors"
            disabled={loading}
            aria-label="Refresh location"
          >
            <RefreshCw
              className={`w-4 h-4 text-black/60 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </motion.div>
      </div>

      {/* Main Heading CENTERED */}
      <motion.div
        className="mb-8 w-full flex flex-col items-center text-center px-4 "
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.29 }}
      >
        <h2
          className="text-5xl sm:text-4xl font-black  text-gray-900 mb-1 leading-tight w-full tracking-wide"
          style={{ fontFamily: "Playfair Display,serif" }}
        >
          <span>Discover, GO</span>
          <br />
          <span>Enjoy.</span>
        </h2>
        <p className="text-base sm:text-lg font-medium text-gray-600">
          {availableCategories.length
            ? `🍲 ${availableCategories.length} authentic dishes near you`
            : "Moments of taste, tailor-made"}
        </p>
      </motion.div>

      {/* Search Input */}
      <form
        className={`mb-4 flex flex-row items-center justify-center shadow-lg mx-4 rounded-full max-w-full border ${glassBlur}`}
        style={{ borderWidth: 2 }}
        onSubmit={e => e.preventDefault()}
      >
        <Search className="w-5 h-5 text-gray-400 mx-3" />
        <input
          type="text"
          placeholder=' Search Category like Momos...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 py-3 bg-transparent outline-none text-lg placeholder-gray-400"
          style={{
            letterSpacing: "-.01em",
            fontWeight: 500,
            fontFamily: "Manrope, sans-serif",
          }}
          autoComplete="off"
        />
      </form>

      {/* Recommended category tags */}
      {recommended.length > 0 && (
        <motion.div
          className="flex justify-center gap-3 mb-7 flex-wrap px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {recommended.map((item) => (
            <motion.button
              type="button"
              key={item.id}
              className="px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition"
              onClick={() => onCategorySelect(item)}
            >
              {item.name}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Category Cards with increased height */}
      <motion.div
        className="flex flex-col gap-y-7 mt-2 mb-10 w-full"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {availableCategories.map((cat, i) => {
          const key = cat.id.replace("_", "_");
          const count = foodData[key]?.length || 0;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.36 + i * 0.05 }}
              className="w-full px-4"
              style={{ cursor: "pointer" }}
              onClick={() => onCategorySelect(cat)}
            >
              <div
                className="relative w-full mx-auto overflow-hidden"
                style={{
                  borderRadius: 24,
                  boxShadow: "0 2px 30px 4px rgba(255,175,79,0.11)",
                  background: "#fff",
                  maxWidth: 420,
                 
                
                  margin: "0 auto",
                }}
              >
                <img
                  src={cat.photo}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: 290, // Increased height!
                    objectFit: "cover",
                    borderRadius: 22,
                  }}
                  loading="lazy"
                />
                <div
                  className="absolute w-full left-0 bottom-0 px-5 py-3 flex flex-col items-start"
                  style={{
                    background:
                      "linear-gradient(0deg,rgba(30,28,15,0.79) 25%,transparent 90%)",
                  }}
                >
                  <span className="text-white font-black text-xl mb-0.5">
                    {cat.name}
                  </span>
                  <span className="text-xs font-bold text-orange-200 mb-0.5">
                    {count} places
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      <AnimatePresence>
        {!loading && availableCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div
              className="text-7xl mb-4"
              style={{
                background:
                  "linear-gradient(120deg, #ffdc79 40%, #ffa94d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🍽️
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow">
              No restaurants found
            </h3>
            <p className="text-base text-gray-500 mb-5">
              Try refreshing or check your location.
            </p>
            <button
              onClick={onLocationRefresh}
              className="px-7 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition"
            >
              Refresh Location
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-16">
          <div className="animate-spin w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-4" />
          <p className="text-lg text-orange-800/70 font-semibold">
            Loading restaurants...
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default HomePage;
