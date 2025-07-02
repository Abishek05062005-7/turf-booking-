import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import TurfCard from './TurfCard';
import { turfs } from '../data/turfs';

const TurfList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [surfaceFilter, setSurfaceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredTurfs = useMemo(() => {
    return turfs.filter(turf => {
      const matchesSearch = turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           turf.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'budget' && turf.price <= 800) ||
                          (priceFilter === 'mid' && turf.price > 800 && turf.price <= 1200) ||
                          (priceFilter === 'premium' && turf.price > 1200);
      
      const matchesSurface = surfaceFilter === 'all' || 
                            turf.surface.toLowerCase().includes(surfaceFilter.toLowerCase());

      return matchesSearch && matchesPrice && matchesSurface;
    });
  }, [searchQuery, priceFilter, surfaceFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Turfs</h1>
        <p className="text-gray-600">Find the perfect sports facility for your game</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search turfs by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredTurfs.length} turfs found
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (≤₹800)</option>
                  <option value="mid">Mid Range (₹800-1200)</option>
                  <option value="premium">Premium ({'>'} ₹1200)</option>
                </select>
              </div>

              {/* Surface Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Surface Type</label>
                <select
                  value={surfaceFilter}
                  onChange={(e) => setSurfaceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Surfaces</option>
                  <option value="artificial">Artificial Grass</option>
                  <option value="natural">Natural Grass</option>
                  <option value="hybrid">Hybrid Grass</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceFilter('all');
                    setSurfaceFilter('all');
                  }}
                  className="w-full px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Turfs Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
        : 'space-y-6'
      }>
        {filteredTurfs.map(turf => (
          <TurfCard key={turf.id} turf={turf} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTurfs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No turfs found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setPriceFilter('all');
              setSurfaceFilter('all');
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TurfList;