import React from 'react';
import Hero from '../components/Hero';
import TurfCard from '../components/TurfCard';
import { turfs } from '../data/turfs';
import { Star, Users, Shield, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const featuredTurfs = turfs.slice(0, 3);

  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TurfBook?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make sports facility booking simple, reliable, and convenient for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the best sports facilities with professional-grade turfs and amenities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-gray-600">Book your favorite turf in seconds with our streamlined booking process.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure payment processing with multiple payment options available.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Join thousands of sports enthusiasts and find your perfect playing partners.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Turfs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Turfs</h2>
            <p className="text-xl text-gray-600">
              Discover our most popular sports facilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTurfs.map(turf => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/turfs"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200"
            >
              View All Turfs
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts who trust TurfBook for their playing needs. 
            Book your turf today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/turfs"
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Turfs
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              My Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;