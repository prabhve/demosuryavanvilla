import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  Accommodation, 
  AmenityItem, 
  Attraction, 
  GalleryPhoto, 
  ReviewItem, 
  BookingFormData 
} from "../types";
import { 
  VILLA_CONTACT, 
  ACCOMMODATIONS, 
  AMENITIES, 
  ATTRACTIONS, 
  GALLERY_PHOTOS, 
  REVIEWS, 
  FAQS 
} from "../data/villaData";

export interface BookingInquiryRecord extends BookingFormData {
  id: string;
  bookingRef: string;
  createdAt: string;
  status: "pending" | "quotation_sent" | "follow_up" | "confirmed" | "checked-in" | "completed" | "cancelled";
  leadType: "inquiry" | "booking"; // Explicit distinction
  totalAmount?: number;
  advancePaid?: number;
  balanceDue?: number;
  paymentMethod?: "UPI" | "Bank Transfer" | "Cash on Arrival" | "Card";
  internalNotes?: string;
  source?: "Website Form" | "AI Concierge" | "WhatsApp Direct" | "Phone Call" | "Admin Manual";
  followUpDate?: string;
}

export interface DiningMenuItem {
  id: string;
  name: string;
  category: "Breakfast" | "Konkani Specials" | "Barbecue & Grill" | "Mains & Thali" | "Desserts & Drinks";
  isVeg: boolean;
  isChefSpecial: boolean;
  description: string;
  pricePerPerson?: number;
}

export interface VideoMediaItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
}

export interface MealPlanPricing {
  epPrice: number; // Room Only
  cpPrice: number; // Breakfast Included
  apPrice: number; // All Meals
}

export interface HeroSlideItem {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
}

export interface HeroSettings {
  badgeText: string;
  headline: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  slides: HeroSlideItem[];
}

export interface AboutStatItem {
  value: string;
  label: string;
  sub: string;
}

export interface AboutSettings {
  badge: string;
  heading: string;
  subheading: string;
  storyP1: string;
  storyP2: string;
  stats: AboutStatItem[];
}

export interface VillaSettings {
  name: string;
  legalName: string;
  tagline: string;
  location: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappUrl: string;
  email: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  checkInTime: string;
  checkOutTime: string;
  upiId: string;
  bankDetails: string;
  aiSystemPromptAddition: string;
}

export interface EstateDataContextType {
  villaSettings: VillaSettings;
  updateVillaSettings: (settings: Partial<VillaSettings>) => void;
  
  heroSettings: HeroSettings;
  updateHeroSettings: (settings: Partial<HeroSettings>) => void;

  aboutSettings: AboutSettings;
  updateAboutSettings: (settings: Partial<AboutSettings>) => void;

  accommodations: Accommodation[];
  updateAccommodation: (id: string, updated: Partial<Accommodation>) => void;
  addAccommodation: (acc: Accommodation) => void;
  deleteAccommodation: (id: string) => void;

  amenities: AmenityItem[];
  updateAmenity: (id: string, updated: Partial<AmenityItem>) => void;
  addAmenity: (amenity: AmenityItem) => void;
  deleteAmenity: (id: string) => void;

  attractions: Attraction[];
  updateAttraction: (id: string, updated: Partial<Attraction>) => void;
  addAttraction: (attraction: Attraction) => void;
  deleteAttraction: (id: string) => void;

  galleryPhotos: GalleryPhoto[];
  addGalleryPhoto: (photo: GalleryPhoto) => void;
  updateGalleryPhoto: (id: string, updated: Partial<GalleryPhoto>) => void;
  deleteGalleryPhoto: (id: string) => void;

  videoMedia: VideoMediaItem[];
  addVideoMedia: (video: VideoMediaItem) => void;
  deleteVideoMedia: (id: string) => void;

  reviews: ReviewItem[];
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  addReview: (review: ReviewItem) => void;
  deleteReview: (id: string) => void;

  faqs: { question: string; answer: string }[];
  updateFaq: (index: number, updated: { question: string; answer: string }) => void;
  addFaq: (faq: { question: string; answer: string }) => void;
  deleteFaq: (index: number) => void;

  diningMenu: DiningMenuItem[];
  mealPricing: MealPlanPricing;
  updateMealPricing: (pricing: Partial<MealPlanPricing>) => void;
  addDiningItem: (item: DiningMenuItem) => void;
  updateDiningItem: (id: string, updated: Partial<DiningMenuItem>) => void;
  deleteDiningItem: (id: string) => void;

  // Inquiries & Bookings
  inquiries: BookingInquiryRecord[];
  addInquiry: (data: BookingFormData, source?: BookingInquiryRecord["source"]) => string;
  updateInquiryStatus: (id: string, status: BookingInquiryRecord["status"], notes?: string) => void;
  updateInquiryDetails: (id: string, updated: Partial<BookingInquiryRecord>) => void;
  deleteInquiry: (id: string) => void;
  convertInquiryToBooking: (id: string, advancePaid: number, totalAmount: number, paymentMethod?: BookingInquiryRecord["paymentMethod"]) => void;

  // AI Logs & Payload
  aiLogs: { id: string; query: string; reply: string; timestamp: string }[];
  addAiLog: (query: string, reply: string) => void;
  getLiveContextForAI: () => any;

  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonData: string) => boolean;
}

const DEFAULT_HERO_SETTINGS: HeroSettings = {
  badgeText: "Exclusive 5-BHK Luxury Private Nature Estate in Kadav, Karjat",
  headline: "Royal Seclusion & Sahyadri Serenity",
  subheadline: "Private 40-ft swimming pool, 15,000 sq. ft. celebration lawns, in-house chef, and bonfire nights nestled in Kadav's lush valley.",
  ctaPrimaryText: "Book Your Private Stay",
  ctaSecondaryText: "Ask AI Concierge",
  slides: [
    {
      id: "slide-1",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85",
      tag: "Architectural Grandeur",
      title: "Private 5-BHK Luxury Buyout",
      subtitle: "Surrounded by misty Sahyadri mountains & quiet rural landscape",
    },
    {
      id: "slide-2",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=85",
      tag: "Water Oasis",
      title: "40-Ft Crystal Swimming Pool",
      subtitle: "Submerged loungers, shallow kid's zone & poolside sundowner deck",
    },
    {
      id: "slide-3",
      image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=2000&q=85",
      tag: "Celebration Grounds",
      title: "15,000 Sq. Ft. Manicured Lawns",
      subtitle: "Ideal for birthday milestones, family reunions, and team retreats",
    },
    {
      id: "slide-4",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85",
      tag: "Farm-to-Table Gourmet",
      title: "In-House Private Chef Dining",
      subtitle: "Authentic Konkani curries, barbecue grill & traditional Maharashtrian feasting",
    },
  ],
};

const DEFAULT_ABOUT_SETTINGS: AboutSettings = {
  badge: "Welcome to Suryavan Villa",
  heading: "A Haven of Exclusive Luxury in Kadav, Karjat",
  subheading: "Designed as a private sanctuary away from city chaos, Suryavan Villa blends contemporary luxury with the unhurried rhythm of rural Maharashtra.",
  storyP1: "Whether you are seeking a restful family weekend, celebrating a milestone anniversary, hosting a creative corporate retreat, or yearning for a slow poolside holiday with friends, Suryavan Villa offers 100% exclusive privacy.",
  storyP2: "Wake up to the golden rays rising above the hills, plunge into your private pool, relish piping-hot Maharashtrian breakfast with farm-fresh herbs, and spend your evenings around a crackling bonfire with sizzling tandoori barbecue.",
  stats: [
    { value: "15,000+", label: "Sq. Ft. Private Estate", sub: "Gated green grounds" },
    { value: "40 Ft.", label: "Private Swimming Pool", sub: "Crystal clean with loungers" },
    { value: "5 BHK", label: "Luxury Suites", sub: "Spacious AC bedrooms" },
    { value: "100 Pax", label: "Celebration Lawn", sub: "For intimate events & reunions" },
  ],
};

const DEFAULT_MEAL_PRICING: MealPlanPricing = {
  epPrice: 0,
  cpPrice: 450,
  apPrice: 1500,
};

const DEFAULT_DINING_ITEMS: DiningMenuItem[] = [
  {
    id: "m-1",
    name: "Kadav Village Pohe & Misal Pav",
    category: "Breakfast",
    isVeg: true,
    isChefSpecial: true,
    description: "Traditional spicy sprouted moth bean gravy served with hot buttered pav, chopped onions, and lemon.",
  },
  {
    id: "m-2",
    name: "Konkani Surmai (Kingfish) & Prawns Rava Fry",
    category: "Konkani Specials",
    isVeg: false,
    isChefSpecial: true,
    description: "Fresh catch marinated in Konkan coastal spice paste and crisp semolina pan-fried.",
  },
  {
    id: "m-3",
    name: "Gavran Country Chicken Curry with Jowar Bhakri",
    category: "Konkani Specials",
    isVeg: false,
    isChefSpecial: true,
    description: "Slow-cooked rustic black masala village chicken curry with piping hot hand-patted jowar/rice flatbreads.",
  },
  {
    id: "m-4",
    name: "Sizzling Sunset Barbecue (Paneer Tikka & Chicken Wings)",
    category: "Barbecue & Grill",
    isVeg: false,
    isChefSpecial: true,
    description: "Smoky charcoal tandoor skewers served poolside with mint chutney and roasted onions.",
  },
  {
    id: "m-5",
    name: "Traditional Maharashtrian Puran Poli & Solkadhi",
    category: "Desserts & Drinks",
    isVeg: true,
    isChefSpecial: true,
    description: "Warm jaggery-lentil sweet flatbread topped with pure desi ghee and digestive kokum coconut milk cooler.",
  },
];

const DEFAULT_VIDEOS: VideoMediaItem[] = [
  {
    id: "vid-1",
    title: "Suryavan Villa 4K Drone Aerial Tour",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    duration: "2:45 mins",
    description: "Breathtaking bird's eye perspective of the 15,000 sq ft estate, pool, and Sahyadri mountains.",
  },
  {
    id: "vid-2",
    title: "Poolside Sunset & Bonfire Atmosphere",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80",
    duration: "1:30 mins",
    description: "Experience the warm lighting, crystal pool waters, and cozy evening bonfire setup.",
  },
];

const DEFAULT_INITIAL_INQUIRIES: BookingInquiryRecord[] = [
  {
    id: "inq-101",
    bookingRef: "SV-849201",
    guestName: "Aditya Malhotra",
    phone: "+91 98202 88411",
    email: "aditya.malhotra@gmail.com",
    checkIn: "2026-10-14",
    checkOut: "2026-10-16",
    guestsCount: 16,
    roomType: "estate-buyout",
    mealPlan: "AP (All Meals - Chef Special)",
    addons: ["Evening Bonfire Experience", "Poolside Barbecue"],
    specialRequests: "Celebrating 40th birthday. Require poolside barbecue setup and vegetarian Jain options for 4 elderly members.",
    status: "confirmed",
    leadType: "booking",
    totalAmount: 65998,
    advancePaid: 30000,
    balanceDue: 35998,
    paymentMethod: "UPI",
    internalNotes: "Advance received via UPI. Chef Sachin briefed about Jain preferences. DG backup checked.",
    source: "Website Form",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "inq-102",
    bookingRef: "SV-912304",
    guestName: "Pooja & Sameer Ranade",
    phone: "+91 98199 44320",
    email: "pooja.ranade@outlook.com",
    checkIn: "2026-10-20",
    checkOut: "2026-10-22",
    guestsCount: 4,
    roomType: "sahyadri-royal-suite",
    mealPlan: "CP (With Breakfast)",
    addons: ["Scenic Terrace Breakfast Basket"],
    specialRequests: "Anniversary getaway. Need a bouquet on arrival.",
    status: "quotation_sent",
    leadType: "inquiry",
    totalAmount: 15998,
    advancePaid: 0,
    balanceDue: 15998,
    internalNotes: "Quotation sent on WhatsApp. Follow up on Friday.",
    followUpDate: "2026-10-02",
    source: "WhatsApp Direct",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "inq-103",
    bookingRef: "SV-774192",
    guestName: "Deepak Sharma (Fintech Solutions)",
    phone: "+91 97654 32109",
    email: "deepak@fintechinnovations.in",
    checkIn: "2026-11-05",
    checkOut: "2026-11-07",
    guestsCount: 22,
    roomType: "estate-buyout",
    mealPlan: "AP (All Meals - Chef Special)",
    addons: ["Projector & Sound Setup", "Evening Bonfire Experience"],
    specialRequests: "Corporate Offsite. Need high-speed Wi-Fi in the main lawn for afternoon presentation.",
    status: "confirmed",
    leadType: "booking",
    totalAmount: 78998,
    advancePaid: 40000,
    balanceDue: 38998,
    paymentMethod: "Bank Transfer",
    internalNotes: "50% advance cleared. Whiteboard & projector arranged in living salon.",
    source: "AI Concierge",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "inq-104",
    bookingRef: "SV-663120",
    guestName: "Rohit & Megha Varma",
    phone: "+91 98200 11223",
    email: "rohit.varma@gmail.com",
    checkIn: "2026-10-28",
    checkOut: "2026-10-30",
    guestsCount: 8,
    roomType: "poolside-cabana-suite",
    mealPlan: "AP (All Meals - Chef Special)",
    addons: ["Evening Bonfire Experience"],
    specialRequests: "Family with kids. Need baby crib in ground floor room.",
    status: "pending",
    leadType: "inquiry",
    totalAmount: 28998,
    advancePaid: 0,
    balanceDue: 28998,
    internalNotes: "New lead received from website form.",
    source: "Website Form",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

const DEFAULT_VILLA_SETTINGS: VillaSettings = {
  name: VILLA_CONTACT.name,
  legalName: VILLA_CONTACT.legalName,
  tagline: "Exclusive 5-BHK Luxury Private Nature Estate in Kadav, Karjat",
  location: "Tambas, Kadav, Karjat, Maharashtra 410201",
  addressLine1: VILLA_CONTACT.addressLine1,
  city: VILLA_CONTACT.city,
  state: VILLA_CONTACT.state,
  postalCode: VILLA_CONTACT.postalCode,
  country: VILLA_CONTACT.country,
  phone: VILLA_CONTACT.phone,
  phoneDisplay: VILLA_CONTACT.phoneDisplay,
  whatsappNumber: VILLA_CONTACT.whatsappNumber,
  whatsappUrl: VILLA_CONTACT.whatsappUrl,
  email: VILLA_CONTACT.email,
  googleMapsUrl: VILLA_CONTACT.googleMapsUrl,
  googleMapsEmbedUrl: VILLA_CONTACT.googleMapsEmbedUrl,
  checkInTime: VILLA_CONTACT.checkInTime,
  checkOutTime: VILLA_CONTACT.checkOutTime,
  upiId: "suryavanvilla@okhdfcbank",
  bankDetails: "HDFC Bank | A/C: 50200088912345 | IFSC: HDFC0001234 | Branch: Karjat",
  aiSystemPromptAddition: "Welcome guests warmly in Marathi or English. Highlight our farm-to-table Konkani food, 40ft private pool, and clean mountain air in Kadav.",
};

const STORAGE_KEY = "suryavan_villa_estate_data_v2";

const EstateDataContext = createContext<EstateDataContextType | undefined>(undefined);

export function EstateDataProvider({ children }: { children: ReactNode }) {
  const [villaSettings, setVillaSettings] = useState<VillaSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : DEFAULT_VILLA_SETTINGS;
    } catch {
      return DEFAULT_VILLA_SETTINGS;
    }
  });

  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SETTINGS;
    } catch {
      return DEFAULT_HERO_SETTINGS;
    }
  });

  const [aboutSettings, setAboutSettings] = useState<AboutSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_about`);
      return saved ? JSON.parse(saved) : DEFAULT_ABOUT_SETTINGS;
    } catch {
      return DEFAULT_ABOUT_SETTINGS;
    }
  });

  const [accommodations, setAccommodations] = useState<Accommodation[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_accommodations`);
      return saved ? JSON.parse(saved) : ACCOMMODATIONS;
    } catch {
      return ACCOMMODATIONS;
    }
  });

  const [amenities, setAmenities] = useState<AmenityItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_amenities`);
      return saved ? JSON.parse(saved) : AMENITIES;
    } catch {
      return AMENITIES;
    }
  });

  const [attractions, setAttractions] = useState<Attraction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_attractions`);
      return saved ? JSON.parse(saved) : ATTRACTIONS;
    } catch {
      return ATTRACTIONS;
    }
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_photos`);
      return saved ? JSON.parse(saved) : GALLERY_PHOTOS;
    } catch {
      return GALLERY_PHOTOS;
    }
  });

  const [videoMedia, setVideoMedia] = useState<VideoMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_videos`);
      return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
    } catch {
      return DEFAULT_VIDEOS;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reviews`);
      return saved ? JSON.parse(saved) : REVIEWS;
    } catch {
      return REVIEWS;
    }
  });

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_faqs`);
      return saved ? JSON.parse(saved) : FAQS;
    } catch {
      return FAQS;
    }
  });

  const [diningMenu, setDiningMenu] = useState<DiningMenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_dining`);
      return saved ? JSON.parse(saved) : DEFAULT_DINING_ITEMS;
    } catch {
      return DEFAULT_DINING_ITEMS;
    }
  });

  const [mealPricing, setMealPricing] = useState<MealPlanPricing>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_meal_pricing`);
      return saved ? JSON.parse(saved) : DEFAULT_MEAL_PRICING;
    } catch {
      return DEFAULT_MEAL_PRICING;
    }
  });

  const [inquiries, setInquiries] = useState<BookingInquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
      return saved ? JSON.parse(saved) : DEFAULT_INITIAL_INQUIRIES;
    } catch {
      return DEFAULT_INITIAL_INQUIRIES;
    }
  });

  const [aiLogs, setAiLogs] = useState<{ id: string; query: string; reply: string; timestamp: string }[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ai_logs`);
      return saved ? JSON.parse(saved) : [
        {
          id: "log-1",
          query: "What is the driving route from Mumbai and how long does it take?",
          reply: "Take the Mumbai-Pune Expressway to Shedung/Chowk exit, then drive through Karjat to Kadav (~80 km, approx 1.5-2 hours).",
          timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString(),
        },
      ];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(villaSettings));
  }, [villaSettings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroSettings));
  }, [heroSettings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_about`, JSON.stringify(aboutSettings));
  }, [aboutSettings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_accommodations`, JSON.stringify(accommodations));
  }, [accommodations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_amenities`, JSON.stringify(amenities));
  }, [amenities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_attractions`, JSON.stringify(attractions));
  }, [attractions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_photos`, JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_videos`, JSON.stringify(videoMedia));
  }, [videoMedia]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reviews`, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_faqs`, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_dining`, JSON.stringify(diningMenu));
  }, [diningMenu]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_meal_pricing`, JSON.stringify(mealPricing));
  }, [mealPricing]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ai_logs`, JSON.stringify(aiLogs));
  }, [aiLogs]);

  // Methods
  const updateVillaSettings = (newSettings: Partial<VillaSettings>) => {
    setVillaSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateHeroSettings = (newSettings: Partial<HeroSettings>) => {
    setHeroSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateAboutSettings = (newSettings: Partial<AboutSettings>) => {
    setAboutSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateAccommodation = (id: string, updated: Partial<Accommodation>) => {
    setAccommodations((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, ...updated } : acc))
    );
  };

  const addAccommodation = (acc: Accommodation) => {
    setAccommodations((prev) => [...prev, acc]);
  };

  const deleteAccommodation = (id: string) => {
    setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
  };

  const updateAmenity = (id: string, updated: Partial<AmenityItem>) => {
    setAmenities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const addAmenity = (amenity: AmenityItem) => {
    setAmenities((prev) => [...prev, amenity]);
  };

  const deleteAmenity = (id: string) => {
    setAmenities((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAttraction = (id: string, updated: Partial<Attraction>) => {
    setAttractions((prev) =>
      prev.map((att) => (att.id === id ? { ...att, ...updated } : att))
    );
  };

  const addAttraction = (attraction: Attraction) => {
    setAttractions((prev) => [...prev, attraction]);
  };

  const deleteAttraction = (id: string) => {
    setAttractions((prev) => prev.filter((att) => att.id !== id));
  };

  const addGalleryPhoto = (photo: GalleryPhoto) => {
    setGalleryPhotos((prev) => [photo, ...prev]);
  };

  const updateGalleryPhoto = (id: string, updated: Partial<GalleryPhoto>) => {
    setGalleryPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const addVideoMedia = (video: VideoMediaItem) => {
    setVideoMedia((prev) => [video, ...prev]);
  };

  const deleteVideoMedia = (id: string) => {
    setVideoMedia((prev) => prev.filter((v) => v.id !== id));
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const addReview = (review: ReviewItem) => {
    setReviews((prev) => [review, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const updateFaq = (index: number, updated: { question: string; answer: string }) => {
    setFaqs((prev) => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  };

  const addFaq = (faq: { question: string; answer: string }) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const deleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMealPricing = (pricing: Partial<MealPlanPricing>) => {
    setMealPricing((prev) => ({ ...prev, ...pricing }));
  };

  const addDiningItem = (item: DiningMenuItem) => {
    setDiningMenu((prev) => [...prev, item]);
  };

  const updateDiningItem = (id: string, updated: Partial<DiningMenuItem>) => {
    setDiningMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteDiningItem = (id: string) => {
    setDiningMenu((prev) => prev.filter((item) => item.id !== id));
  };

  const addInquiry = (data: BookingFormData, source: BookingInquiryRecord["source"] = "Website Form"): string => {
    const bookingRef = `SV-${Date.now().toString().slice(-6)}`;
    const newRecord: BookingInquiryRecord = {
      ...data,
      id: `inq-${Date.now()}`,
      bookingRef,
      createdAt: new Date().toISOString(),
      status: "pending",
      leadType: "inquiry",
      source,
    };
    setInquiries((prev) => [newRecord, ...prev]);
    return bookingRef;
  };

  const updateInquiryStatus = (id: string, status: BookingInquiryRecord["status"], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { 
              ...inq, 
              status, 
              leadType: (status === "confirmed" || status === "checked-in" || status === "completed") ? "booking" : inq.leadType,
              ...(notes ? { internalNotes: notes } : {}) 
            }
          : inq
      )
    );
  };

  const updateInquiryDetails = (id: string, updated: Partial<BookingInquiryRecord>) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, ...updated } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const convertInquiryToBooking = (
    id: string, 
    advancePaid: number, 
    totalAmount: number, 
    paymentMethod: BookingInquiryRecord["paymentMethod"] = "UPI"
  ) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const balance = Math.max(0, totalAmount - advancePaid);
          return {
            ...inq,
            status: "confirmed",
            leadType: "booking",
            totalAmount,
            advancePaid,
            balanceDue: balance,
            paymentMethod,
            internalNotes: `${inq.internalNotes || ""}\n[${new Date().toLocaleDateString()}] Converted to confirmed reservation with ₹${advancePaid} advance.`.trim(),
          };
        }
        return inq;
      })
    );
  };

  const addAiLog = (query: string, reply: string) => {
    const newLog = {
      id: `log-${Date.now()}`,
      query,
      reply,
      timestamp: new Date().toLocaleTimeString(),
    };
    setAiLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const getLiveContextForAI = () => {
    return {
      villaSettings,
      accommodations,
      diningMenu,
      mealPricing,
      amenities,
      attractions,
      faqs,
    };
  };

  const resetToDefaults = () => {
    setVillaSettings(DEFAULT_VILLA_SETTINGS);
    setHeroSettings(DEFAULT_HERO_SETTINGS);
    setAboutSettings(DEFAULT_ABOUT_SETTINGS);
    setAccommodations(ACCOMMODATIONS);
    setAmenities(AMENITIES);
    setAttractions(ATTRACTIONS);
    setGalleryPhotos(GALLERY_PHOTOS);
    setVideoMedia(DEFAULT_VIDEOS);
    setReviews(REVIEWS);
    setFaqs(FAQS);
    setDiningMenu(DEFAULT_DINING_ITEMS);
    setMealPricing(DEFAULT_MEAL_PRICING);
    setInquiries(DEFAULT_INITIAL_INQUIRIES);
  };

  const exportBackupJson = (): string => {
    const backupObj = {
      version: "2.0",
      exportedAt: new Date().toISOString(),
      villaSettings,
      heroSettings,
      aboutSettings,
      accommodations,
      amenities,
      attractions,
      galleryPhotos,
      videoMedia,
      reviews,
      faqs,
      diningMenu,
      mealPricing,
      inquiries,
    };
    return JSON.stringify(backupObj, null, 2);
  };

  const importBackupJson = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.villaSettings) setVillaSettings(data.villaSettings);
      if (data.heroSettings) setHeroSettings(data.heroSettings);
      if (data.aboutSettings) setAboutSettings(data.aboutSettings);
      if (data.accommodations) setAccommodations(data.accommodations);
      if (data.amenities) setAmenities(data.amenities);
      if (data.attractions) setAttractions(data.attractions);
      if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
      if (data.videoMedia) setVideoMedia(data.videoMedia);
      if (data.reviews) setReviews(data.reviews);
      if (data.faqs) setFaqs(data.faqs);
      if (data.diningMenu) setDiningMenu(data.diningMenu);
      if (data.mealPricing) setMealPricing(data.mealPricing);
      if (data.inquiries) setInquiries(data.inquiries);
      return true;
    } catch (e) {
      console.error("Failed to import JSON data:", e);
      return false;
    }
  };

  return (
    <EstateDataContext.Provider
      value={{
        villaSettings,
        updateVillaSettings,
        heroSettings,
        updateHeroSettings,
        aboutSettings,
        updateAboutSettings,
        accommodations,
        updateAccommodation,
        addAccommodation,
        deleteAccommodation,
        amenities,
        updateAmenity,
        addAmenity,
        deleteAmenity,
        attractions,
        updateAttraction,
        addAttraction,
        deleteAttraction,
        galleryPhotos,
        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,
        videoMedia,
        addVideoMedia,
        deleteVideoMedia,
        reviews,
        updateReview,
        addReview,
        deleteReview,
        faqs,
        updateFaq,
        addFaq,
        deleteFaq,
        diningMenu,
        mealPricing,
        updateMealPricing,
        addDiningItem,
        updateDiningItem,
        deleteDiningItem,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        updateInquiryDetails,
        deleteInquiry,
        convertInquiryToBooking,
        aiLogs,
        addAiLog,
        getLiveContextForAI,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
      }}
    >
      {children}
    </EstateDataContext.Provider>
  );
}

export function useEstateData() {
  const context = useContext(EstateDataContext);
  if (!context) {
    throw new Error("useEstateData must be used within an EstateDataProvider");
  }
  return context;
}
