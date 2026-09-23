import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Navigation, 
  Heart, 
  ShieldCheck, 
  Waves, 
  Flame, 
  Sun,
  Clock,
  LayoutDashboard,
  Shield,
  ChevronUp
} from "lucide-react";
import { VILLA_CONTACT } from "../data/villaData";

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
  onOpenAdmin: () => void;
}

export default function FooterSection({ onOpenBooking, onOpenConcierge, onOpenAdmin }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0f0d0b] text-stone-300 border-t border-stone-800/80 relative overflow-hidden">
      {/* Top Gold Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-[#d4af37] to-amber-500 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800/80">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-[#d4af37] to-amber-700 p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#181614] rounded-2xl flex items-center justify-center">
                  <span className="font-serif font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200">
                    S
                  </span>
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                  SURYAVAN VILLA
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  Luxury Private Estate • Kadav, Karjat
                </div>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              An exclusive 5-BHK luxury nature villa nestled in the Sahyadri foothills of Kadav, Karjat. Featuring private swimming pools, landscaped celebration lawns, home-cooked Konkani feasts, and tranquil mountain vistas.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center space-x-1 bg-stone-900 border border-stone-800 text-[11px] text-amber-300 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>100% DG Power Backup</span>
              </span>
              <span className="inline-flex items-center space-x-1 bg-stone-900 border border-stone-800 text-[11px] text-amber-300 px-3 py-1 rounded-full">
                <Waves className="w-3.5 h-3.5 text-amber-400" />
                <span>Private Filtered Pool</span>
              </span>
              <span className="inline-flex items-center space-x-1 bg-stone-900 border border-stone-800 text-[11px] text-amber-300 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Bonfire & BBQ Nights</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-white font-bold text-sm tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#about" className="hover:text-amber-300 transition">About the Estate</a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-300 transition">Suites & Bedrooms</a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-300 transition">Pool & Amenities</a>
              </li>
              <li>
                <a href="#dining" className="hover:text-amber-300 transition">Konkani Dining</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition">Photo Gallery</a>
              </li>
              <li>
                <a href="#attractions" className="hover:text-amber-300 transition">Nearby Sightseeing</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-300 transition">Guest FAQs</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-white font-bold text-sm tracking-wider uppercase">
              Reservations & Desk
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  32/2B/3, Tambas, Kadav, Karjat, Maharashtra 410201
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${VILLA_CONTACT.phone}`} className="hover:text-amber-300 font-mono">
                  {VILLA_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${VILLA_CONTACT.email}`} className="hover:text-amber-300">
                  {VILLA_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Check-in: 1:00 PM | Check-out: 11:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action CTA (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-white font-bold text-sm tracking-wider uppercase">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] text-[#1c1917] font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
              >
                Reserve Stay
              </button>
              <button
                onClick={onOpenConcierge}
                className="w-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Concierge</span>
              </button>
              <a
                href={VILLA_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Maps</span>
              </a>
              <button
                onClick={onOpenAdmin}
                className="w-full bg-stone-900/90 hover:bg-stone-800 border border-amber-500/30 text-amber-300 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer hover:border-amber-400"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Panel Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {currentYear} Suryavan Villa, Kadav, Karjat. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Direct Booking Privilege</span>
            <span>•</span>
            <span>Authentic Maharashtrian Hospitality</span>
            <span>•</span>
            <span className="text-amber-400/80">Maharashtra Tourism Approved</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-amber-300 transition flex items-center space-x-1 cursor-pointer font-medium"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Admin Login</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="text-amber-400 hover:text-amber-300 transition flex items-center space-x-1 cursor-pointer font-medium"
              title="Smooth Scroll to Top"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
