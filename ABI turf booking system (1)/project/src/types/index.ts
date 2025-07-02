export interface Turf {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  availableSlots: TimeSlot[];
  surface: string;
  size: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  date: string;
  timeSlot: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}