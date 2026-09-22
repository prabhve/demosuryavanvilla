import { useState } from "react";
import { 
  Users, 
  Maximize2, 
  Bed, 
  Bath, 
  Check, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { ACCOMMODATIONS, VILLA_CONTACT } from "../data/villaData";
import { Accommodation } from "../types";

interface AccommodationsSectionProps {
  onOpenBooking: (roomType?: string) => void;
}

export default function AccommodationsSection({ onOpenBooking }: AccommodationsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>("estate-buyout");

  const categories = [
    { id: "all", label: "All Accommodations" },
    { id: "estate-buyout", label: "5-BHK Full Estate Buyout" },
    { id: "sahyadri-royal-suite", label: "Royal Mountain Suite" },
    { id: "poolside-cabana-suite", label: "Poolside Cabana Suite" },
    { id: "garden-horizon-room", label: "Garden Horizon Deluxe" },
  ];

  const filteredSuites = activeCategory === "all" 
    ? ACCOMMODATIONS 
    : ACCOMMODATIONS.filter((item) => item.id === activeCategory);

  const handleWhatsAppSuite = (suite: Accommodation) => {
    const text = `Hello Suryavan Villa! I am interested in booking the *${suite.name}* at Kadav, Karjat. Please share availability and best package offers.`;
    window.open(`https://wa.me/${VILLA_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="suites" className="py-20 lg:py-28 bg-[#f5f1eb] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Luxury Accommodations</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight">
            Curated Suites & Private Estate Buyout
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Every room at Suryavan Villa is crafted with opulent aesthetics, ergonomic luxury mattresses, serene nature viewpoints, and complete air-conditioning.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-lg shadow-stone-900/20 scale-105"
                  : "bg-white text-stone-700 hover:bg-amber-50 border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Suites Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Carousel / Hero Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden bg-stone-900">
                <img
                  src={suite.images[0]}
                  alt={suite.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Popular For Badge */}
                {suite.popularFor && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-[#1c1917] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {suite.popularFor}
                  </div>
                )}

                {/* Price Tag in Image */}
                <div className="absolute bottom-4 right-4 bg-[#1c1917]/90 backdrop-blur-md border border-amber-400/40 text-white px-4 py-2 rounded-2xl text-right">
                  <div className="text-[10px] text-amber-300 uppercase font-semibold">Starting From</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-white">
                    ₹{suite.pricePerNight.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-stone-300"> / night</span>
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Weekend: ₹{suite.weekendPrice.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Title Over Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                        {suite.type}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold">
                        {suite.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {suite.description}
                  </p>

                  {/* Room Specs Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-stone-100 text-xs text-stone-700">
                    <div className="flex items-center space-x-1.5 bg-stone-50 p-2 rounded-xl">
                      <Users className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium whitespace-nowrap">{suite.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-stone-50 p-2 rounded-xl">
                      <Bed className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium whitespace-nowrap">{suite.bedrooms.split(" ")[0]} Bed</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-stone-50 p-2 rounded-xl">
                      <Bath className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium whitespace-nowrap">{suite.bathrooms.split(" ")[0]} Bath</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-stone-50 p-2 rounded-xl">
                      <Maximize2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium whitespace-nowrap">{suite.sizeSqFt} sq ft</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Signature Inclusions:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                      {suite.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {suite.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenBooking(suite.id)}
                    className="w-full bg-[#1c1917] hover:bg-stone-800 text-[#f5efe6] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>Reserve Suite</span>
                  </button>
                  <button
                    onClick={() => handleWhatsAppSuite(suite)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm tracking-wide flex items-center justify-center space-x-2 shadow-md transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
