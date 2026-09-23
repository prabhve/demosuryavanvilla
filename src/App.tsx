import { useState, lazy, Suspense } from "react";
import HeaderNavbar from "./components/HeaderNavbar";
import HeroSection from "./components/HeroSection";
import FadeInSection from "./components/FadeInSection";
import SmoothScroll from "./components/SmoothScroll";
import { Sparkles } from "lucide-react";

// Lazy-loaded major sections for optimal initial bundle size & faster page load
const AboutEstate = lazy(() => import("./components/AboutEstate"));
const AccommodationsSection = lazy(() => import("./components/AccommodationsSection"));
const EstateAmenities = lazy(() => import("./components/EstateAmenities"));
const CulinaryExperience = lazy(() => import("./components/CulinaryExperience"));
const InteractiveGallery = lazy(() => import("./components/InteractiveGallery"));
const DirectBookingEngine = lazy(() => import("./components/DirectBookingEngine"));
const NearbyAttractions = lazy(() => import("./components/NearbyAttractions"));
const LiveLocationDirections = lazy(() => import("./components/LiveLocationDirections"));
const GuestReviews = lazy(() => import("./components/GuestReviews"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const FooterSection = lazy(() => import("./components/FooterSection"));

// Lazy-loaded modals (CMS Admin Panel, AI Concierge, Booking Desk)
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const AIConciergeModal = lazy(() => import("./components/AIConciergeModal"));
const BookingModal = lazy(() => import("./components/BookingModal"));

function SectionSkeleton({ height = "min-h-[360px]" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center bg-[#141210] py-16`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="w-7 h-7 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
        <span className="text-stone-500 text-[11px] tracking-widest uppercase font-serif">
          Loading Estate Experience...
        </span>
      </div>
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-[#141210] text-stone-100 selection:bg-amber-500 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Butter-Smooth Inertia Scroll Engine */}
      <SmoothScroll />

      {/* 1. Top Luxury Header - Eagerly loaded for instant interactivity */}
      <HeaderNavbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => handleOpenConcierge()}
      />

      {/* 2. Hero Section - Eagerly loaded for fastest LCP & visual feedback */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* 3. About the Estate & Heritage */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <AboutEstate
            onOpenBooking={() => handleOpenBooking()}
            onOpenConcierge={() => handleOpenConcierge()}
          />
        </Suspense>
      </FadeInSection>

      {/* 4. Accommodations / 5-BHK Buyout & Suites */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <AccommodationsSection onOpenBooking={(room) => handleOpenBooking(room)} />
        </Suspense>
      </FadeInSection>

      {/* 5. Estate Amenities & Experiences */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[450px]" />}>
          <EstateAmenities
            onOpenBooking={() => handleOpenBooking()}
            onOpenConcierge={() => handleOpenConcierge()}
          />
        </Suspense>
      </FadeInSection>

      {/* 6. Farm-to-table Culinary Experience & Barbecue */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[450px]" />}>
          <CulinaryExperience
            onOpenBooking={() => handleOpenBooking()}
            onOpenConcierge={handleOpenConcierge}
          />
        </Suspense>
      </FadeInSection>

      {/* 7. Interactive Photo Gallery & Lightbox */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <InteractiveGallery />
        </Suspense>
      </FadeInSection>

      {/* 8. Direct Booking Engine & Rate Calculator */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <DirectBookingEngine
            initialRoomType={preselectedRoom}
            initialDates={customDates}
          />
        </Suspense>
      </FadeInSection>

      {/* 9. Nearby Attractions & Karjat Sightseeing */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <NearbyAttractions onOpenConcierge={handleOpenConcierge} />
        </Suspense>
      </FadeInSection>

      {/* 10. Live Location, Driving Route & Transit */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[350px]" />}>
          <LiveLocationDirections />
        </Suspense>
      </FadeInSection>

      {/* 11. Guest Reviews & Testimonials */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[350px]" />}>
          <GuestReviews />
        </Suspense>
      </FadeInSection>

      {/* 12. Frequently Asked Questions */}
      <FadeInSection>
        <Suspense fallback={<SectionSkeleton height="min-h-[350px]" />}>
          <FAQSection onOpenConcierge={handleOpenConcierge} />
        </Suspense>
      </FadeInSection>

      {/* 13. Luxury Footer */}
      <FadeInSection direction="none">
        <Suspense fallback={<SectionSkeleton height="min-h-[200px]" />}>
          <FooterSection
            onOpenBooking={() => handleOpenBooking()}
            onOpenConcierge={() => handleOpenConcierge()}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        </Suspense>
      </FadeInSection>

      {/* Floating AI Concierge FAB - Pure AI Floating Icon */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center group">
        <button
          onClick={() => handleOpenConcierge()}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#2a241b] via-[#1c1917] to-[#12100e] border-2 border-[#d4af37] text-amber-300 shadow-[0_8px_30px_rgb(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgb(212,175,55,0.7)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Ask Sahyadri AI Concierge"
          title="Sahyadri AI Concierge"
        >
          {/* Subtle breathing glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-amber-600/40 blur-md group-hover:blur-lg transition-all duration-300 animate-pulse -z-10" />
          
          <Sparkles className="w-6 h-6 text-amber-300 group-hover:text-yellow-200 transition-colors animate-pulse" />

          {/* Active online status indicator */}
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#1c1917] rounded-full animate-ping" />
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#1c1917] rounded-full" />
        </button>
      </div>

      {/* Lazy-Loaded Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />
        )}

        {isConciergeOpen && (
          <AIConciergeModal
            isOpen={isConciergeOpen}
            onClose={() => setIsConciergeOpen(false)}
            initialPrompt={conciergePrompt}
          />
        )}

        {isBookingModalOpen && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            preselectedRoom={preselectedRoom}
            customDates={customDates}
          />
        )}
      </Suspense>
    </div>
  );
}

