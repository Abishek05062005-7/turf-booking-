import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Wifi, Car, Users } from 'lucide-react';
import { Turf } from '../types';

interface TurfCardProps {
  turf: Turf;
}

const TurfCard: React.FC<TurfCardProps> = ({ turf }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'changing rooms':
      case 'basic facilities':
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-green-600">₹{turf.price}/hr</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{turf.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{turf.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 ml-1">{turf.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{turf.reviews} reviews</span>
          </div>
        </div>

        {/* Surface & Size */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span><strong>Surface:</strong> {turf.surface}</span>
            <span><strong>Size:</strong> {turf.size}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {turf.amenities.slice(0, 3).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg text-xs text-gray-600"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {turf.amenities.length > 3 && (
              <div className="bg-green-50 px-2 py-1 rounded-lg text-xs text-green-600">
                +{turf.amenities.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/turf/${turf.id}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition-colors duration-200"
        >
          View Details & Book
        </Link>
      </div>
    </div>
  );
};

export default TurfCard;