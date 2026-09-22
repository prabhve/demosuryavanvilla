export interface Accommodation {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  capacity: string;
  maxGuests: number;
  bedrooms: string;
  bathrooms: string;
  sizeSqFt: number;
  pricePerNight: number;
  weekendPrice: number;
  images: string[];
  features: string[];
  amenities: string[];
  description: string;
  popularFor?: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  category: "Water & Outdoors" | "Dining & Gourmet" | "Entertainment & Games" | "Comfort & Services";
  description: string;
  iconName: string;
  highlight: string;
  image: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: "Heritage & Forts" | "Waterfalls & Nature" | "Temples & Culture" | "Entertainment";
  distance: string;
  driveTime: string;
  description: string;
  bestSeason: string;
  image: string;
  googleMapsUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  stayType: string;
  title: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "all" | "villa" | "pool" | "dining" | "lawns" | "interiors";
  imageUrl: string;
  caption: string;
}

export interface BookingFormData {
  guestName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  roomType: string;
  mealPlan: "EP (Room Only)" | "CP (With Breakfast)" | "AP (All Meals - Chef Special)";
  addons: string[];
  specialRequests: string;
}

export interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
  humidity: string;
  airQuality: string;
  bestTimeForPool: string;
  sunsetTime: string;
}
