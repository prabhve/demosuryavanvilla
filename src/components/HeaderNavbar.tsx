import { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Sparkles, 
  Menu, 
  X, 
  Calendar, 
  Sun,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Home,
  BedDouble,
  Sparkle,
  Utensils,
  Image as ImageIcon,
  Compass,
  Navigation,
  Star,
  HelpCircle
} from "lucide-react";
import { VILLA_CONTACT } from "../data/villaData";
import { WeatherData } from "../types";

interface HeaderNavbarProps {
  onOpenBooking: (preselectedRoom?: string) => void;
  onOpenConcierge: () => void;
}

export default function HeaderNavbar({ onOpenBooking, onOpenConcierge }: HeaderNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ["home", "suites", "amenities", "dining", "gallery", "attractions", "location", "reviews", "faqs"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fetch live weather from our server endpoint
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home", icon: Home },
    { label: "Suites", href: "#suites", id: "suites", icon: BedDouble },
    { label: "Amenities", href: "#amenities", id: "amenities", icon: Sparkle },
    { label: "Dining", href: "#dining", id: "dining", icon: Utensils },
    { label: "Gallery", href: "#gallery", id: "gallery", icon: ImageIcon },
    { label: "Sightseeing", href: "#attractions", id: "attractions", icon: Compass },
    { label: "Location", href: "#location", id: "location", icon: Navigation },
    { label: "Reviews", href: "#reviews", id: "reviews", icon: Star },
    { label: "FAQs", href: "#faqs", id: "faqs", icon: HelpCircle },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Luxury Announcement Bar (Hidden on smaller screens, sleek on desktop) */}
      <div className="bg-[#141210] text-[#f5efe6] border-b border-[#2d261e] text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left info items */}
          <div className="flex items-center space-x-5 lg:space-x-6 text-stone-300">
            <a 
              href="#location"
              className="flex items-center space-x-1.5 text-[#d4af37] hover:text-[#fae082] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#d4af37]" />
              <span className="tracking-wide">Tambas, Kadav, Karjat (410201)</span>
            </a>
            <span className="hidden lg:flex items-center space-x-1.5 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct Booking: Best Rate Guaranteed</span>
            </span>
            {weather && (
              <span className="hidden xl:flex items-center space-x-1.5 text-amber-200 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/40">
                <Sun className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Kadav: {weather.temperature} • {weather.condition}</span>
              </span>
            )}
          </div>

          {/* Right contact CTAs */}
          <div className="flex items-center space-x-4 lg:space-x-5 text-xs">
            <button
              onClick={onOpenConcierge}
              className="flex items-center space-x-1.5 text-amber-300 hover:text-amber-200 font-medium transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">AI Concierge</span>
            </button>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a
              href={`tel:${VILLA_CONTACT.phone}`}
              className="flex items-center space-x-1.5 text-stone-300 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-[#d4af37] shrink-0" />
              <span>{VILLA_CONTACT.phoneDisplay}</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#141210]/95 backdrop-blur-xl shadow-2xl py-2.5 sm:py-3 border-b border-[#382f23]/80"
            : "bg-gradient-to-b from-black/85 via-black/50 to-transparent py-3 sm:py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Emblem */}
          <a href="#home" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#9a752b] via-[#d4af37] to-[#fae082] p-0.5 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#161412] rounded-full flex flex-col items-center justify-center">
                <span className="font-serif text-[#d4af37] font-bold text-xs sm:text-sm tracking-widest leading-none">SV</span>
              </div>
            </div>
            <div>
              <div className="font-serif tracking-widest text-base sm:text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors leading-tight">
                SURYAVAN
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#d4af37] uppercase font-light leading-none mt-0.5">
                Luxury Villa • Kadav
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean, non-wrapping, refined spacing) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[13px] xl:text-[14px] font-medium text-stone-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap relative group ${
                    isActive 
                      ? "text-[#d4af37] font-semibold bg-amber-500/10" 
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-amber-400 to-[#d4af37] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            <button
              onClick={onOpenConcierge}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-amber-400/40 text-amber-200 hover:bg-amber-500/15 text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 hover:border-amber-400/80 cursor-pointer shadow-sm"
              title="Chat with AI Concierge for questions & itineraries"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">AI Guide</span>
            </button>
            <button
              id="header-book-now-btn"
              onClick={() => onOpenBooking()}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#c89b3f] hover:from-[#c89b3f] hover:to-[#e6c35c] text-[#1c1917] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-950/40 flex items-center space-x-1.5 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Book Stay</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Book Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#b38f2a] to-[#d4af37] text-[#1c1917] text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900/80 border border-stone-700/70 text-white hover:text-[#d4af37] focus:outline-none transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#141210]/98 backdrop-blur-2xl border-t border-[#382f23] px-5 py-5 text-stone-200 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-250">
            {/* Quick Navigation Grid */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-800/80">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
                      isActive 
                        ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30" 
                        : "text-stone-300 hover:text-amber-300 hover:bg-stone-900/60"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Action CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 hover:bg-amber-900/50 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Ask Sahyadri AI Concierge</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#c89b3f] text-[#1c1917] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Instant Availability & Booking</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Contact Quick Links */}
            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <a href={`tel:${VILLA_CONTACT.phone}`} className="flex items-center space-x-1.5 hover:text-white text-stone-300">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Call Estate</span>
              </a>
              <a href={VILLA_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <span className="text-stone-500 text-[11px]">Kadav, Karjat</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
