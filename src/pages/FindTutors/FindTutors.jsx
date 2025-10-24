import React, { useEffect, useState } from "react";
import FindTutor from "./FindTutor";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    language: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sortBy: "name"
  });

  useEffect(() => {
    fetch(`http://localhost:3000/tutorials`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setFilteredTutors(data);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tutors, filters]);

  const applyFilters = () => {
    let filtered = [...tutors];

    // Search by tutor name or language
    if (filters.searchText) {
      filtered = filtered.filter((tutor) =>
        tutor.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        tutor.language.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        tutor.description.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }

    // Filter by language
    if (filters.language) {
      filtered = filtered.filter((tutor) =>
        tutor.language.toLowerCase() === filters.language.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter((tutor) => tutor.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((tutor) => tutor.price <= parseInt(filters.maxPrice));
    }

    // Filter by minimum rating
    if (filters.minRating) {
      filtered = filtered.filter((tutor) => (tutor.review || 0) >= parseInt(filters.minRating));
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.review || 0) - (a.review || 0);
        default:
          return 0;
      }
    });

    setFilteredTutors(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchText: "",
      language: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sortBy: "name"
    });
  };

  // Get unique languages for filter dropdown
  const uniqueLanguages = [...new Set(tutors.map(tutor => tutor.language))];

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      {/* Advanced Search & Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Advanced Search & Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Tutors
            </label>
            <input
              type="text"
              placeholder="Search by name, language, or description"
              value={filters.searchText}
              onChange={(e) => handleFilterChange("searchText", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Languages</option>
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Rating
            </label>
            <select
              value={filters.minRating}
              onChange={(e) => handleFilterChange("minRating", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Rating</option>
              <option value="1">1+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredTutors.length} of {tutors.length} tutors
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredTutors.length > 0 ? (
        <FindTutor tutors={filteredTutors} />
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No tutors found matching your criteria</div>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FindTutors;
