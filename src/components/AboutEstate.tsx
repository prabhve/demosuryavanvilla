import { 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Trees, 
  Waves, 
  ChefHat, 
  ShieldCheck, 
  ArrowRight,
  SunMedium
} from "lucide-react";
import { useEstateData } from "../context/EstateDataContext";

interface AboutEstateProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export default function AboutEstate({ onOpenBooking, onOpenConcierge }: AboutEstateProps) {
  const { aboutSettings, villaSettings } = useEstateData();

  const stats = aboutSettings.stats || [
    { value: "15,000+", label: "Sq. Ft. Private Estate", sub: "Gated green grounds" },
    { value: "40 Ft.", label: "Private Swimming Pool", sub: "Crystal clean with loungers" },
    { value: "5 BHK", label: "Luxury Suites", sub: "Spacious AC bedrooms" },
    { value: "100 Pax", label: "Celebration Lawn", sub: "For intimate events & reunions" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#faf8f5] text-stone-800 relative overflow-hidden scroll-mt-20">
      <div id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{aboutSettings.badge || "Welcome to Suryavan Villa"}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight leading-tight">
            {aboutSettings.heading || "A Haven of Exclusive Luxury in Kadav, Karjat"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {aboutSettings.subheading || "Designed as a private sanctuary away from city chaos, Suryavan Villa blends contemporary luxury with the unhurried rhythm of rural Maharashtra, surrounded by the dramatic peaks of the Sahyadri mountains."}
          </p>
        </div>

        {/* 2-Column Story & Visual Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Pure Seclusion, Bespoke Hospitality & Unmatched Comfort
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {aboutSettings.storyP1}
              </p>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {aboutSettings.storyP2}
              </p>
            </div>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "100% Sole Private Estate Buyout",
                "Private 40-ft Fresh Swimming Pool",
                "Dedicated In-House Chef & Butler",
                "Farm-to-Table Konkani & Multi-Cuisine",
                "Indoor Games: Pool, TT, Carrom",
                "100% Heavy-Duty DG Power Backup",
                "High-Speed 300 Mbps Fiber Wi-Fi",
                "Pet-Friendly Lawn with Fenced Grounds",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-sm font-medium text-stone-800">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 rounded-full bg-[#1c1917] hover:bg-stone-800 text-[#f5efe6] text-sm font-bold tracking-wide uppercase shadow-md hover:shadow-xl transition flex items-center space-x-2 cursor-pointer"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>
              <button
                onClick={onOpenConcierge}
                className="px-5 py-3 rounded-full border border-amber-600/40 text-amber-900 hover:bg-amber-50 text-sm font-semibold transition flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ask AI Concierge</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
                alt="Suryavan Villa exterior and grounds in Kadav"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Kadav, Karjat • Maharashtra
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold">
                  Suryavan Luxury Villa & Lawns
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">
                  Latitude: 18.9492° N, Longitude: 73.3754° E • Raigad District
                </p>
              </div>
            </div>

            {/* Floating Luxury Badge Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-amber-200/80 max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <SunMedium className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Scenic Sahyadri Air
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    Zero pollution, soothing hill breezes, and pristine starry night skies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md border border-stone-200/80 hover:border-amber-400/80 hover:shadow-lg transition text-center group"
            >
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c1917] group-hover:text-amber-700 transition">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-stone-800 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
