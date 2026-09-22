import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Compass, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ATTRACTIONS, VILLA_CONTACT } from "../data/villaData";
import { Attraction } from "../types";

interface NearbyAttractionsProps {
  onOpenConcierge: (prompt?: string) => void;
}

export default function NearbyAttractions({ onOpenConcierge }: NearbyAttractionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Attractions" },
    { id: "Heritage & Forts", label: "Forts & Treks" },
    { id: "Waterfalls & Nature", label: "Waterfalls & Lakes" },
    { id: "Temples & Culture", label: "Temples & Culture" },
    { id: "Entertainment", label: "Theme Parks" },
  ];

  const filteredAttractions = selectedCategory === "all"
    ? ATTRACTIONS
    : ATTRACTIONS.filter((a) => a.category === selectedCategory);

  return (
    <section id="attractions" className="py-20 lg:py-28 bg-[#faf8f5] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Explore Kadav & Karjat</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight">
            Sightseeing & Nature Excursions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Suryavan Villa is perfectly positioned near Maharashtra’s most famous forts, historic temples, waterfalls, and cinematic studios.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-md scale-105"
                  : "bg-white text-stone-700 hover:bg-amber-50 border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200/90 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-52 overflow-hidden bg-stone-900">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Distance Badge */}
                <div className="absolute top-3 left-3 bg-[#1c1917]/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{place.distance} from Villa</span>
                </div>

                {/* Drive Time Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-stone-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{place.driveTime}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                    {place.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Description & Best Season */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {place.description}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    Best Season: <strong className="text-stone-800">{place.bestSeason}</strong>
                  </span>
                  <button
                    onClick={() => onOpenConcierge(`Tell me about visiting ${place.name} from Suryavan Villa in Kadav, including best time, directions and what to carry.`)}
                    className="text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 transition cursor-pointer"
                  >
                    <span>Ask Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Itinerary Generator Trigger */}
        <div className="mt-14 text-center bg-amber-50 rounded-2xl p-6 border border-amber-200/80 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-amber-900 font-serif font-bold text-lg mb-1">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Need a custom 2-day Karjat sightseeing schedule?</span>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm mb-4">
            Our Sahyadri AI Concierge can generate personalized timings for treks, temple visits, and poolside downtime.
          </p>
          <button
            onClick={() => onOpenConcierge("Generate a complete 2-day weekend sightseeing and relaxing itinerary starting from Suryavan Villa in Kadav, Karjat.")}
            className="px-6 py-2.5 rounded-full bg-[#1c1917] hover:bg-stone-800 text-[#f5efe6] font-bold text-xs sm:text-sm tracking-wide uppercase transition shadow-md cursor-pointer"
          >
            Generate Custom Itinerary
          </button>
        </div>
      </div>
    </section>
  );
}
