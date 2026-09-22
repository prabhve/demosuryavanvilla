import { useState } from "react";
import HeaderNavbar from "./components/HeaderNavbar";
import HeroSection from "./components/HeroSection";
import AboutEstate from "./components/AboutEstate";
import AccommodationsSection from "./components/AccommodationsSection";
import EstateAmenities from "./components/EstateAmenities";
import CulinaryExperience from "./components/CulinaryExperience";
import InteractiveGallery from "./components/InteractiveGallery";
import NearbyAttractions from "./components/NearbyAttractions";
import LiveLocationDirections from "./components/LiveLocationDirections";
import GuestReviews from "./components/GuestReviews";
import DirectBookingEngine from "./components/DirectBookingEngine";
import FAQSection from "./components/FAQSection";
import FooterSection from "./components/FooterSection";
import AIConciergeModal from "./components/AIConciergeModal";
import BookingModal from "./components/BookingModal";
import AdminPanel from "./components/AdminPanel";
import FadeInSection from "./components/FadeInSection";
import { Sparkles } from "lucide-react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergePrompt, setConciergePrompt] = useState<string | undefined>(undefined);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedRoom, setPreselectedRoom] = useState<string | undefined>(undefined);
  const [customDates, setCustomDates] = useState<
    { checkIn: string; checkOut: string; guests: number } | undefined
  >(undefined);

  const handleOpenConcierge = (prompt?: string) => {
    setConciergePrompt(prompt);
    setIsConciergeOpen(true);
  };

  const handleOpenBooking = (roomType?: string, dates?: { checkIn: string; checkOut: string; guests: number }) => {
    setPreselectedRoom(roomType);
    setCustomDates(dates);
    setIsBookingModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#141210] text-stone-100 selection:bg-amber-500 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* 1. Top Luxury Header */}
      <HeaderNavbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => handleOpenConcierge()}
      />

      {/* 2. Hero Section with Live Availability Bar & Subtle Ken Burns Effect */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* 3. About the Estate & Heritage with Viewport Fade In */}
      <FadeInSection>
        <AboutEstate
          onOpenBooking={() => handleOpenBooking()}
          onOpenConcierge={() => handleOpenConcierge()}
        />
      </FadeInSection>

      {/* 4. Accommodations / 5-BHK Buyout & Suites */}
      <FadeInSection>
        <AccommodationsSection onOpenBooking={(room) => handleOpenBooking(room)} />
      </FadeInSection>

      {/* 5. Estate Amenities & Experiences */}
      <FadeInSection>
        <EstateAmenities
          onOpenBooking={() => handleOpenBooking()}
          onOpenConcierge={() => handleOpenConcierge()}
        />
      </FadeInSection>

      {/* 6. Farm-to-table Culinary Experience & Barbecue */}
      <FadeInSection>
        <CulinaryExperience
          onOpenBooking={() => handleOpenBooking()}
          onOpenConcierge={handleOpenConcierge}
        />
      </FadeInSection>

      {/* 7. Interactive Photo Gallery & Lightbox */}
      <FadeInSection>
        <InteractiveGallery />
      </FadeInSection>

      {/* 8. Direct Booking Engine & Rate Calculator */}
      <FadeInSection>
        <DirectBookingEngine
          initialRoomType={preselectedRoom}
          initialDates={customDates}
        />
      </FadeInSection>

      {/* 9. Nearby Attractions & Karjat Sightseeing */}
      <FadeInSection>
        <NearbyAttractions onOpenConcierge={handleOpenConcierge} />
      </FadeInSection>

      {/* 10. Live Location, Driving Route & Transit */}
      <FadeInSection>
        <LiveLocationDirections />
      </FadeInSection>

      {/* 11. Guest Reviews & Testimonials */}
      <FadeInSection>
        <GuestReviews />
      </FadeInSection>

      {/* 12. Frequently Asked Questions */}
      <FadeInSection>
        <FAQSection onOpenConcierge={handleOpenConcierge} />
      </FadeInSection>

      {/* 13. Luxury Footer */}
      <FadeInSection direction="none">
        <FooterSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenConcierge={() => handleOpenConcierge()}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </FadeInSection>

      {/* Floating AI Concierge FAB */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center group">
        <button
          onClick={() => handleOpenConcierge()}
          className="relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-gradient-to-br from-[#2a241b] via-[#1c1917] to-[#12100e] border-2 border-[#d4af37] text-amber-300 shadow-[0_8px_30px_rgb(212,175,55,0.35)] hover:shadow-[0_8px_35px_rgb(212,175,55,0.6)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Ask Sahyadri AI Concierge"
          title="Ask Sahyadri AI Concierge"
        >
          {/* Subtle breathing glow */}
          <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-amber-600/40 blur-sm group-hover:blur-md transition-all duration-300 animate-pulse -z-10" />
          
          <Sparkles className="w-6 h-6 text-amber-300 group-hover:text-yellow-200 transition-colors animate-pulse" />
          
          {/* Label for desktop */}
          <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider text-amber-200 pr-1">
            AI Concierge
          </span>

          {/* Active online status indicator */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1c1917] rounded-full animate-ping" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1c1917] rounded-full" />
        </button>
      </div>

      {/* Admin Panel Modal Overlay */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Modals */}
      <AIConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        initialPrompt={conciergePrompt}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedRoom={preselectedRoom}
        customDates={customDates}
      />
    </div>
  );
}
