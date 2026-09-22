import { useState } from "react";
import { 
  Waves, 
  UtensilsCrossed, 
  Flame, 
  Trees, 
  Gamepad2, 
  Wifi, 
  HeartHandshake, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { useEstateData } from "../context/EstateDataContext";

interface EstateAmenitiesProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export default function EstateAmenities({ onOpenBooking, onOpenConcierge }: EstateAmenitiesProps) {
  const { amenities } = useEstateData();
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Amenities" },
    { id: "Water & Outdoors", label: "Pool & Outdoors" },
    { id: "Dining & Gourmet", label: "Dining & Barbecue" },
    { id: "Entertainment & Games", label: "Games & Recreation" },
    { id: "Comfort & Services", label: "Comfort & Services" },
  ];

  const filteredAmenities = activeTab === "all"
    ? amenities
    : amenities.filter((a) => a.category === activeTab);

  // Helper for icon
  const renderIcon = (name: string) => {
    switch (name) {
      case "Waves": return <Waves className="w-6 h-6 text-amber-500" />;
      case "UtensilsCrossed": return <UtensilsCrossed className="w-6 h-6 text-amber-500" />;
      case "Flame": return <Flame className="w-6 h-6 text-amber-500" />;
      case "Trees": return <Trees className="w-6 h-6 text-amber-500" />;
      case "Gamepad2": return <Gamepad2 className="w-6 h-6 text-amber-500" />;
      case "Wifi": return <Wifi className="w-6 h-6 text-amber-500" />;
      case "HeartHandshake": return <HeartHandshake className="w-6 h-6 text-amber-500" />;
      default: return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="amenities" className="py-20 lg:py-28 bg-[#181614] text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Unmatched Luxury Facilities</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Curated Experiences for Every Guest
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-300 text-base sm:text-lg">
            From sunrise yoga on the expansive lawn to afternoon poolside mocktails and midnight bonfires under star-filled skies, every moment at Suryavan is tailored to delight.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] text-[#1c1917] shadow-lg shadow-amber-950/50 font-bold scale-105"
                  : "bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-[#201c18] border border-stone-800/90 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201c18] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md p-2 rounded-xl border border-stone-700">
                  {renderIcon(amenity.iconName)}
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                    {amenity.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition">
                    {amenity.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 text-xs text-amber-300 font-medium">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug text-amber-300 text-xs">{amenity.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with AI Concierge Integration */}
        <div className="mt-14 bg-gradient-to-r from-[#241f1a] to-[#2c241c] rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
              Customized Hospitality
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Planning a Birthday, Corporate Retreat or Family Celebration?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
              We provide tailored lawn decorations, custom live barbecue menus, sound systems, and dedicated event coordinators at Suryavan Villa.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenConcierge}
              className="px-5 py-3 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 hover:bg-stone-800 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Discuss with AI Assistant</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] text-[#1c1917] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center space-x-2 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book Entire Estate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
