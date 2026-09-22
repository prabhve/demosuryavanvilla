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
  status: "pending" | "confirmed" | "checked-in" | "completed" | "cancelled";
  totalAmount?: number;
  advancePaid?: number;
  internalNotes?: string;
  source?: "Website Form" | "AI Concierge" | "WhatsApp Direct" | "Phone Call" | "Admin Manual";
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

export interface VillaSettings {
  name: string;
  legalName: string;
  tagline: string;
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

  inquiries: BookingInquiryRecord[];
  addInquiry: (data: BookingFormData, source?: BookingInquiryRecord["source"]) => string;
  updateInquiryStatus: (id: string, status: BookingInquiryRecord["status"], notes?: string) => void;
  updateInquiryDetails: (id: string, updated: Partial<BookingInquiryRecord>) => void;
  deleteInquiry: (id: string) => void;

  aiLogs: { id: string; query: string; reply: string; timestamp: string }[];
  addAiLog: (query: string, reply: string) => void;

  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonData: string) => boolean;
}

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
    totalAmount: 65998,
    advancePaid: 30000,
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
    status: "pending",
    totalAmount: 15998,
    advancePaid: 0,
    internalNotes: "Guest contacted over WhatsApp. Awaiting date confirmation.",
    source: "WhatsApp Direct",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "inq-103",
    bookingRef: "SV-774192",
    guestName: "Karan Johar Tech Solutions (Deepak Sharma)",
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
    totalAmount: 78998,
    advancePaid: 40000,
    internalNotes: "50% advance cleared. Whiteboard & projector arranged in living salon.",
    source: "AI Concierge",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

const DEFAULT_VILLA_SETTINGS: VillaSettings = {
  name: VILLA_CONTACT.name,
  legalName: VILLA_CONTACT.legalName,
  tagline: "Exclusive 5-BHK Luxury Private Nature Estate in Kadav, Karjat",
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
  aiSystemPromptAddition: "Welcome guests warmly in Marathi or English. Highlight our farm-to-table Konkani food and 40ft private pool.",
};

const STORAGE_KEY = "suryavan_villa_estate_data_v1";

const EstateDataContext = createContext<EstateDataContextType | undefined>(undefined);

export function EstateDataProvider({ children }: { children: ReactNode }) {
  // Load stored state or defaults
  const [villaSettings, setVillaSettings] = useState<VillaSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : DEFAULT_VILLA_SETTINGS;
    } catch {
      return DEFAULT_VILLA_SETTINGS;
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
        {
          id: "log-2",
          query: "Is pool heated and what are check in timings?",
          reply: "Check-in is 1:00 PM and check-out is 11:00 AM. Our 40-ft pool is treated and filtered fresh daily.",
          timestamp: new Date(Date.now() - 3600000 * 4).toLocaleTimeString(),
        }
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
      source,
    };
    setInquiries((prev) => [newRecord, ...prev]);
    return bookingRef;
  };

  const updateInquiryStatus = (id: string, status: BookingInquiryRecord["status"], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { ...inq, status, ...(notes ? { internalNotes: notes } : {}) }
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

  const addAiLog = (query: string, reply: string) => {
    const newLog = {
      id: `log-${Date.now()}`,
      query,
      reply,
      timestamp: new Date().toLocaleTimeString(),
    };
    setAiLogs((prev) => [newLog, ...prev.slice(0, 49)]); // keep last 50
  };

  const resetToDefaults = () => {
    setVillaSettings(DEFAULT_VILLA_SETTINGS);
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
      version: "1.0",
      exportedAt: new Date().toISOString(),
      villaSettings,
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
        aiLogs,
        addAiLog,
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
