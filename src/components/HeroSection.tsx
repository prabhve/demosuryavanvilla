import { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ACCOMMODATIONS } from "../data/villaData";

interface HeroSectionProps {
  onOpenBooking: (preselectedRoom?: string, customDates?: { checkIn: string; checkOut: string; guests: number }) => void;
  onOpenConcierge: (initialPrompt?: string) => void;
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=85",
    tagline: "Exclusive Private Estate & Swimming Pool",
    title: "Where Luxury Meets Sahyadri Nature",
    subtitle: "A serene 5-BHK private luxury villa nestled amidst the lush hills and fresh breeze of Kadav, Karjat.",
    panDirection: { scale: [1.02, 1.14], x: [0, -18], y: [0, -10] }
  },
  {
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85",
    tagline: "Private 40-Ft Crystal Clear Pool",
    title: "Unwind in Total Seclusion",
    subtitle: "Dip into refreshing waters, relax on sun loungers, and sip handcrafted sundowners by the palm deck.",
    panDirection: { scale: [1.03, 1.15], x: [0, 15], y: [0, -12] }
  },
  {
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1920&q=85",
    tagline: "15,000 Sq. Ft. Celebration Lawns & Bonfire",
    title: "Unforgettable Moments & Gatherings",
    subtitle: "The ultimate destination for family reunions, milestone birthdays, corporate offsites, and cozy star-gazing nights.",
    panDirection: { scale: [1.02, 1.14], x: [0, -12], y: [0, 10] }
  },
];

export default function HeroSection({ onOpenBooking, onOpenConcierge }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Quick booking state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(6);
  const [selectedSuite, setSelectedSuite] = useState("estate-buyout");

  // Set default dates (tomorrow and day after)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 3);

    setCheckIn(tomorrow.toISOString().split("T")[0]);
    setCheckOut(dayAfter.toISOString().split("T")[0]);
  }, []);

  // Slide autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedSuite, { checkIn, checkOut, guests });
  };

  return (
    <section id="home" className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-stone-950">
      {/* Background Slides with subtle Ken Burns zoom and pan effect */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].title}
              initial={{ scale: 1.02, x: 0, y: 0 }}
              animate={{
                scale: HERO_SLIDES[currentSlide].panDirection.scale,
                x: HERO_SLIDES[currentSlide].panDirection.x,
                y: HERO_SLIDES[currentSlide].panDirection.y,
              }}
              transition={{
                duration: 7.8,
                ease: "linear",
              }}
              className="w-full h-full object-cover object-center brightness-[0.44] will-change-transform"
            />
            {/* Gradient Overlays for optimal readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/50 to-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#141210]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Nav Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-amber-400 border border-white/10 flex items-center justify-center transition backdrop-blur-sm hidden md:flex cursor-pointer hover:border-amber-400/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-amber-400 border border-white/10 flex items-center justify-center transition backdrop-blur-sm hidden md:flex cursor-pointer hover:border-amber-400/40"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4 sm:mt-6">
        {/* Top Badges */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5"
        >
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kadav, Karjat • Maharashtra</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 text-xs sm:text-sm font-medium backdrop-blur-md">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5 Google Rating (180+ Stays)</span>
          </span>
        </motion.div>

        {/* Dynamic Heading & Tagline with Smooth Text Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-text-${currentSlide}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <p className="text-[#d4af37] text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
              {HERO_SLIDES[currentSlide].tagline}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <p className="text-stone-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feature Highlights Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs sm:text-sm text-stone-300"
        >
          <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>100% Sole Private Estate</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>1.5h Drive from Mumbai & Pune</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>In-House Chef & Bonfire Deck</span>
          </span>
        </motion.div>

        {/* Interactive Quick Booking / Availability Engine Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
          className="mt-8 sm:mt-10 max-w-5xl mx-auto"
        >
          <form
            onSubmit={handleQuickCheck}
            className="bg-[#1c1917]/95 border border-[#4a3f2c] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left text-stone-200"
          >
            {/* Check-In */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-In</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-sm text-white font-medium focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-Out</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-sm text-white font-medium focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Guests Count */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5" />
                <span>Guests Count</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-sm text-white font-medium focus:border-amber-400 focus:outline-none"
              >
                <option value={2}>2 Guests (Couple / Suite)</option>
                <option value={4}>4 Guests (Family Suite)</option>
                <option value={8}>6 - 8 Guests (Group Stay)</option>
                <option value={12}>10 - 15 Guests (Estate Buyout)</option>
                <option value={20}>16 - 25 Guests (Full Celebration)</option>
              </select>
            </div>

            {/* Suite / Buyout Choice */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Suite or Buyout</span>
              </label>
              <select
                value={selectedSuite}
                onChange={(e) => setSelectedSuite(e.target.value)}
                className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-sm text-white font-medium focus:border-amber-400 focus:outline-none"
              >
                {ACCOMMODATIONS.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name.split("(")[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="hero-quick-check-btn"
                className="w-full bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] hover:from-[#c89b3f] hover:to-[#ffd768] text-[#1c1917] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-950/40 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Check Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick AI Concierge Prompts */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Have questions?</span>
            <button
              onClick={() => onOpenConcierge("Plan a 2-day relaxing weekend itinerary for a family of 8 with pool and BBQ at Suryavan Villa.")}
              className="bg-stone-900/80 hover:bg-stone-800 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 transition flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Plan 2-Day Itinerary</span>
            </button>
            <button
              onClick={() => onOpenConcierge("How do I reach Suryavan Villa in Kadav from Mumbai and Pune by car?")}
              className="bg-stone-900/80 hover:bg-stone-800 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 transition flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Driving Route & Distance</span>
            </button>
            <button
              onClick={() => onOpenConcierge("What authentic Maharashtrian and Konkani dishes can the chef prepare for our stay?")}
              className="bg-stone-900/80 hover:bg-stone-800 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 transition flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Chef's Menu & Food Plans</span>
            </button>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "w-8 bg-[#d4af37]" : "w-2 bg-stone-600 hover:bg-stone-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
