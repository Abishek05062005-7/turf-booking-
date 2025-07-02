import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/turfs?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Book Premium
            <span className="block text-green-200">Sports Turfs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-green-100 max-w-3xl mx-auto">
            Discover and book the best sports facilities in your city. Professional turfs for football, cricket, and more.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Location Search */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Time Picker */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900">
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="relative">
                  <label className="block text-sm font-medium text-transparent mb-2">Search</label>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search Turfs</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-200 mb-2">50+</div>
              <div className="text-sm md:text-base text-green-100">Premium Turfs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-200 mb-2">1000+</div>
              <div className="text-sm md:text-base text-green-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-200 mb-2">24/7</div>
              <div className="text-sm md:text-base text-green-100">Booking Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-200 mb-2">5★</div>
              <div className="text-sm md:text-base text-green-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;