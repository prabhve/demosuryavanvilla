import { useState, useMemo } from "react";
import { 
  LayoutDashboard, 
  CalendarCheck2, 
  BedDouble, 
  Image as ImageIcon, 
  UtensilsCrossed, 
  Sparkles, 
  MapPin, 
  Star, 
  HelpCircle, 
  Settings, 
  Bot, 
  Database, 
  X, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  DollarSign, 
  Users, 
  Menu, 
  Eye, 
  Save, 
  Video, 
  Send,
  AlertCircle
} from "lucide-react";
import { useEstateData, BookingInquiryRecord, DiningMenuItem, VideoMediaItem } from "../context/EstateDataContext";
import { Accommodation, AmenityItem, Attraction, GalleryPhoto, ReviewItem } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 
  | "dashboard"
  | "bookings"
  | "accommodations"
  | "gallery"
  | "dining"
  | "amenities"
  | "attractions"
  | "reviews"
  | "faqs"
  | "settings"
  | "ai-concierge"
  | "backup";

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
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
  } = useEstateData();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search filter across list
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-modal states for adding/editing items
  const [editingBooking, setEditingBooking] = useState<BookingInquiryRecord | null>(null);
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  
  const [editingAcc, setEditingAcc] = useState<Accommodation | null>(null);
  const [isAddingAcc, setIsAddingAcc] = useState(false);

  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const [editingDining, setEditingDining] = useState<DiningMenuItem | null>(null);
  const [isAddingDining, setIsAddingDining] = useState(false);

  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // AI Concierge tester inside admin
  const [testAiQuery, setTestAiQuery] = useState("");
  const [testAiLoading, setTestAiLoading] = useState(false);
  const [testAiResponse, setTestAiResponse] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isOpen) return null;

  // Key KPI stats
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === "pending").length;
  const confirmedBookings = inquiries.filter((i) => i.status === "confirmed" || i.status === "checked-in").length;
  const totalRevenue = inquiries
    .filter((i) => i.status === "confirmed" || i.status === "checked-in" || i.status === "completed")
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex bg-[#0c0a09] text-stone-100 font-sans antialiased overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[60] bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#141210] border-r border-stone-800/90 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header / Logo */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-[#d4af37] to-amber-700 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#1c1917] rounded-[10px] flex items-center justify-center font-serif font-black text-amber-300 text-lg">
                S
              </div>
            </div>
            <div>
              <div className="font-serif font-bold text-base text-white tracking-wide">
                SURYAVAN ADMIN
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Management CMS</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs font-medium">
          <div className="px-3 pt-2 pb-1 text-[10px] uppercase font-bold tracking-widest text-stone-500">
            Core Operations
          </div>

          <button
            onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "dashboard"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Executive Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab("bookings"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "bookings"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <CalendarCheck2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Inquiries & Bookings</span>
            </div>
            {pendingInquiries > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-stone-950 rounded-full">
                {pendingInquiries}
              </span>
            )}
          </button>

          <div className="px-3 pt-4 pb-1 text-[10px] uppercase font-bold tracking-widest text-stone-500">
            Website Content & CMS
          </div>

          <button
            onClick={() => { setActiveTab("accommodations"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "accommodations"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <BedDouble className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Suites & Room Rates</span>
          </button>

          <button
            onClick={() => { setActiveTab("gallery"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "gallery"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Photos & Video Media</span>
          </button>

          <button
            onClick={() => { setActiveTab("dining"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "dining"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Chef's Dining & Menus</span>
          </button>

          <button
            onClick={() => { setActiveTab("amenities"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "amenities"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Estate Amenities</span>
          </button>

          <button
            onClick={() => { setActiveTab("attractions"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "attractions"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Nearby Sightseeing</span>
          </button>

          <button
            onClick={() => { setActiveTab("reviews"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "reviews"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Guest Reviews</span>
          </button>

          <button
            onClick={() => { setActiveTab("faqs"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "faqs"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Frequently Asked FAQs</span>
          </button>

          <div className="px-3 pt-4 pb-1 text-[10px] uppercase font-bold tracking-widest text-stone-500">
            Intelligence & System
          </div>

          <button
            onClick={() => { setActiveTab("ai-concierge"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "ai-concierge"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4 text-amber-400 shrink-0" />
            <span>AI Concierge Monitor</span>
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "settings"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Villa Contacts & UPI</span>
          </button>

          <button
            onClick={() => { setActiveTab("backup"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
              activeTab === "backup"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-stone-300 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Data Backup & Reset</span>
          </button>
        </nav>

        {/* Sidebar Footer: Quick Exit to Live Site */}
        <div className="p-4 border-t border-stone-800/80 bg-[#12100e]">
          <button
            onClick={onClose}
            className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>View Live Website</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0c0a09] overflow-hidden">
        {/* Top Executive Header */}
        <header className="h-16 border-b border-stone-800/90 bg-[#141210]/95 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-stone-800 text-stone-200 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-serif text-base sm:text-lg font-bold text-white capitalize flex items-center space-x-2">
              <span>
                {activeTab === "dashboard" && "Executive Management Dashboard"}
                {activeTab === "bookings" && "Inquiries & Reservations CRM"}
                {activeTab === "accommodations" && "Accommodations & Nightly Pricing"}
                {activeTab === "gallery" && "Photo & Video Gallery Media"}
                {activeTab === "dining" && "In-House Dining & Chef Menus"}
                {activeTab === "amenities" && "Estate Amenities & Services"}
                {activeTab === "attractions" && "Nearby Tourist Attractions"}
                {activeTab === "reviews" && "Guest Reviews & Testimonials"}
                {activeTab === "faqs" && "Frequently Asked Questions"}
                {activeTab === "ai-concierge" && "AI Concierge Logs & Customization"}
                {activeTab === "settings" && "Villa Contact Information & Payment Setup"}
                {activeTab === "backup" && "System Backup & Factory Reset"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Live Preview Exit Button */}
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] text-[#1c1917] font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow hover:brightness-110 transition cursor-pointer"
            >
              <span>Back to Website</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Main Body View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#181614] border border-stone-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-stone-400 text-xs uppercase font-semibold">
                    <span>Pending Inquiries</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{pendingInquiries}</div>
                  <div className="text-[11px] text-amber-400 font-medium">Require manager response</div>
                </div>

                <div className="bg-[#181614] border border-stone-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-stone-400 text-xs uppercase font-semibold">
                    <span>Confirmed Stays</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{confirmedBookings}</div>
                  <div className="text-[11px] text-stone-400">Total active & upcoming bookings</div>
                </div>

                <div className="bg-[#181614] border border-stone-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-stone-400 text-xs uppercase font-semibold">
                    <span>Est. Booking Revenue</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#d4af37]">₹{totalRevenue.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-emerald-400">From confirmed stays</div>
                </div>

                <div className="bg-[#181614] border border-stone-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-stone-400 text-xs uppercase font-semibold">
                    <span>AI Concierge Chats</span>
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{aiLogs.length}</div>
                  <div className="text-[11px] text-stone-400">Guest questions answered</div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-gradient-to-r from-[#201d18] to-[#181614] border border-[#4a3f2c] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Estate Quick Controls</h3>
                  <p className="text-xs text-stone-400">Instantly update rates, add a walk-in booking or upload a new villa photo.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => { setIsAddingBooking(true); setActiveTab("bookings"); }}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Reservation</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("accommodations"); }}
                    className="bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <BedDouble className="w-4 h-4" />
                    <span>Edit Room Rates</span>
                  </button>
                  <button
                    onClick={() => { setIsAddingPhoto(true); setActiveTab("gallery"); }}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Upload Gallery Photo</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-[#181614] border border-stone-800 rounded-2xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-white">Recent Guest Inquiries</h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    View All ({inquiries.length})
                  </button>
                </div>
                <div className="divide-y divide-stone-800">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-900/50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-white">{inq.guestName}</span>
                          <span className="text-xs font-mono text-stone-400">({inq.bookingRef})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === "confirmed" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                            inq.status === "pending" ? "bg-amber-950 text-amber-300 border border-amber-800" :
                            inq.status === "checked-in" ? "bg-blue-950 text-blue-300 border border-blue-800" :
                            "bg-stone-800 text-stone-400"
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-400 flex flex-wrap gap-x-4 gap-y-1">
                          <span>Dates: <strong className="text-stone-200">{inq.checkIn} to {inq.checkOut}</strong></span>
                          <span>Guests: <strong className="text-stone-200">{inq.guestsCount}</strong></span>
                          <span>Phone: <strong className="text-stone-200">{inq.phone}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${inq.guestName}, regarding your booking inquiry ${inq.bookingRef} at Suryavan Villa Kadav...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          onClick={() => { setEditingBooking(inq); setActiveTab("bookings"); }}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-medium"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INQUIRIES & BOOKINGS CRM */}
          {/* ========================================================================= */}
          {activeTab === "bookings" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, ref number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#181614] border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        "Reference,Name,Phone,Email,CheckIn,CheckOut,Guests,Status,TotalAmount,AdvancePaid\n" +
                        inquiries.map(e => `"${e.bookingRef}","${e.guestName}","${e.phone}","${e.email}","${e.checkIn}","${e.checkOut}","${e.guestsCount}","${e.status}","${e.totalAmount || 0}","${e.advancePaid || 0}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `suryavan_inquiries_${Date.now()}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast("Exported Inquiries to CSV!");
                    }}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setIsAddingBooking(true)}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Manual Booking</span>
                  </button>
                </div>
              </div>

              {/* Inquiries Table / Cards */}
              <div className="bg-[#181614] border border-stone-800 rounded-2xl overflow-hidden">
                <div className="divide-y divide-stone-800">
                  {inquiries
                    .filter((inq) => 
                      inq.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      inq.phone.includes(searchQuery) ||
                      inq.bookingRef.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((inq) => (
                      <div key={inq.id} className="p-4 sm:p-5 space-y-3 hover:bg-stone-900/40 transition">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-serif font-bold text-base text-white">{inq.guestName}</span>
                            <span className="font-mono text-xs text-amber-400 font-semibold">{inq.bookingRef}</span>
                            <span className="text-[10px] text-stone-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={inq.status}
                              onChange={(e) => {
                                updateInquiryStatus(inq.id, e.target.value as any);
                                showToast(`Updated status to ${e.target.value}`);
                              }}
                              className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
                                inq.status === "confirmed" ? "bg-emerald-950/80 text-emerald-300 border-emerald-700" :
                                inq.status === "pending" ? "bg-amber-950/80 text-amber-300 border-amber-700" :
                                inq.status === "checked-in" ? "bg-blue-950/80 text-blue-300 border-blue-700" :
                                inq.status === "completed" ? "bg-purple-950/80 text-purple-300 border-purple-700" :
                                "bg-stone-900 text-stone-400 border-stone-700"
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="checked-in">Checked In</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => setEditingBooking(inq)}
                              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs"
                              title="Edit Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete inquiry for ${inq.guestName}?`)) {
                                  deleteInquiry(inq.id);
                                  showToast("Inquiry deleted");
                                }
                              }}
                              className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg text-xs"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#12100e] p-3 rounded-xl border border-stone-800/80 text-stone-300">
                          <div>
                            <span className="text-stone-500 block text-[10px] uppercase">Stay Dates</span>
                            <span className="font-semibold text-white">{inq.checkIn} to {inq.checkOut}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px] uppercase">Room / Suite</span>
                            <span className="font-semibold text-white truncate block">{inq.roomType}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px] uppercase">Guests & Plan</span>
                            <span className="font-semibold text-white">{inq.guestsCount} Guests • {inq.mealPlan.split(" ")[0]}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px] uppercase">Advance / Total</span>
                            <span className="font-semibold text-amber-300">₹{inq.advancePaid || 0} / ₹{inq.totalAmount || "TBD"}</span>
                          </div>
                        </div>

                        {/* Special Requests & Notes */}
                        {(inq.specialRequests || inq.internalNotes) && (
                          <div className="text-xs space-y-1 text-stone-400 bg-stone-900/40 p-2.5 rounded-lg">
                            {inq.specialRequests && (
                              <div><strong className="text-stone-300">Guest Request:</strong> {inq.specialRequests}</div>
                            )}
                            {inq.internalNotes && (
                              <div><strong className="text-amber-400">Internal Manager Note:</strong> {inq.internalNotes}</div>
                            )}
                          </div>
                        )}

                        {/* Direct Contact Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaste ${inq.guestName}! This is the manager from Suryavan Villa, Kadav. Regarding your booking inquiry ${inq.bookingRef}...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Guest</span>
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>Call ({inq.phone})</span>
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Modal: Edit Inquiry / Add Manual Booking */}
              {(editingBooking || isAddingBooking) && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-lg p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">
                        {editingBooking ? "Edit Reservation Details" : "Create Manual Reservation"}
                      </h3>
                      <button
                        onClick={() => { setEditingBooking(null); setIsAddingBooking(false); }}
                        className="p-1 text-stone-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data: any = {
                          guestName: formData.get("guestName") as string,
                          phone: formData.get("phone") as string,
                          email: formData.get("email") as string,
                          checkIn: formData.get("checkIn") as string,
                          checkOut: formData.get("checkOut") as string,
                          guestsCount: Number(formData.get("guestsCount")),
                          roomType: formData.get("roomType") as string,
                          mealPlan: formData.get("mealPlan") as any,
                          totalAmount: Number(formData.get("totalAmount")),
                          advancePaid: Number(formData.get("advancePaid")),
                          internalNotes: formData.get("internalNotes") as string,
                          specialRequests: formData.get("specialRequests") as string,
                          status: formData.get("status") as any,
                        };

                        if (editingBooking) {
                          updateInquiryDetails(editingBooking.id, data);
                          showToast("Reservation updated successfully!");
                          setEditingBooking(null);
                        } else {
                          addInquiry(data, "Admin Manual");
                          showToast("Manual reservation created!");
                          setIsAddingBooking(false);
                        }
                      }}
                      className="space-y-3.5 text-xs text-stone-300"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Guest Name</label>
                          <input
                            name="guestName"
                            defaultValue={editingBooking?.guestName || ""}
                            required
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Phone Number</label>
                          <input
                            name="phone"
                            defaultValue={editingBooking?.phone || "+91 "}
                            required
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Check In Date</label>
                          <input
                            type="date"
                            name="checkIn"
                            defaultValue={editingBooking?.checkIn || ""}
                            required
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Check Out Date</label>
                          <input
                            type="date"
                            name="checkOut"
                            defaultValue={editingBooking?.checkOut || ""}
                            required
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Guests</label>
                          <input
                            type="number"
                            name="guestsCount"
                            defaultValue={editingBooking?.guestsCount || 6}
                            min={1}
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Total Amount (₹)</label>
                          <input
                            type="number"
                            name="totalAmount"
                            defaultValue={editingBooking?.totalAmount || 24999}
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Advance Paid (₹)</label>
                          <input
                            type="number"
                            name="advancePaid"
                            defaultValue={editingBooking?.advancePaid || 0}
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Suite / Buyout</label>
                          <select
                            name="roomType"
                            defaultValue={editingBooking?.roomType || "estate-buyout"}
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          >
                            {accommodations.map((a) => (
                              <option key={a.id} value={a.id}>{a.name.split("(")[0]}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Status</label>
                          <select
                            name="status"
                            defaultValue={editingBooking?.status || "pending"}
                            className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="checked-in">Checked In</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Internal Manager Notes</label>
                        <textarea
                          name="internalNotes"
                          rows={2}
                          defaultValue={editingBooking?.internalNotes || ""}
                          placeholder="e.g. Advance paid via GPay, extra cot arranged..."
                          className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => { setEditingBooking(null); setIsAddingBooking(false); }}
                          className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl"
                        >
                          Save Reservation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ACCOMMODATIONS & ROOM RATES CMS */}
          {/* ========================================================================= */}
          {activeTab === "accommodations" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Suites & Villa Buyout CMS</h3>
                  <p className="text-xs text-stone-400">Manage weekday/weekend nightly tariffs, capacity, and room amenities.</p>
                </div>
                <button
                  onClick={() => setIsAddingAcc(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room Type</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accommodations.map((acc) => (
                  <div key={acc.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                          {acc.type}
                        </span>
                        <h4 className="font-serif font-bold text-base text-white mt-1">{acc.name}</h4>
                        <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{acc.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setEditingAcc(acc)}
                          className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete accommodation ${acc.name}?`)) {
                              deleteAccommodation(acc.id);
                              showToast("Room removed");
                            }
                          }}
                          className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Pricing Badges */}
                    <div className="grid grid-cols-2 gap-2 bg-[#12100e] p-3 rounded-xl border border-stone-800 text-xs">
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase">Weekday Rate</span>
                        <span className="font-bold text-emerald-400 text-sm">₹{acc.pricePerNight.toLocaleString("en-IN")} / night</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase">Weekend Rate</span>
                        <span className="font-bold text-amber-400 text-sm">₹{acc.weekendPrice.toLocaleString("en-IN")} / night</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-400 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Capacity: <strong className="text-stone-200">{acc.capacity}</strong></span>
                      <span>Bedrooms: <strong className="text-stone-200">{acc.bedrooms}</strong></span>
                      <span>Size: <strong className="text-stone-200">{acc.sizeSqFt} sq ft</strong></span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-stone-500">Key Highlights:</span>
                      <ul className="text-xs text-stone-300 space-y-0.5 list-disc list-inside">
                        {acc.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="truncate">{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Accommodation Modal */}
              {(editingAcc || isAddingAcc) && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">
                        {editingAcc ? `Edit ${editingAcc.name}` : "Add New Accommodation"}
                      </h3>
                      <button onClick={() => { setEditingAcc(null); setIsAddingAcc(false); }} className="p-1 text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const accData: any = {
                          id: editingAcc ? editingAcc.id : `acc-${Date.now()}`,
                          name: formData.get("name") as string,
                          subtitle: formData.get("subtitle") as string,
                          type: formData.get("type") as string,
                          capacity: formData.get("capacity") as string,
                          maxGuests: Number(formData.get("maxGuests")),
                          bedrooms: formData.get("bedrooms") as string,
                          bathrooms: formData.get("bathrooms") as string,
                          sizeSqFt: Number(formData.get("sizeSqFt")),
                          pricePerNight: Number(formData.get("pricePerNight")),
                          weekendPrice: Number(formData.get("weekendPrice")),
                          description: formData.get("description") as string,
                          images: editingAcc ? editingAcc.images : ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"],
                          features: (formData.get("features") as string).split("\n").filter(Boolean),
                          amenities: (formData.get("amenities") as string).split(",").map(s => s.trim()).filter(Boolean),
                        };

                        if (editingAcc) {
                          updateAccommodation(editingAcc.id, accData);
                          showToast("Accommodation updated!");
                          setEditingAcc(null);
                        } else {
                          addAccommodation(accData);
                          showToast("New accommodation created!");
                          setIsAddingAcc(false);
                        }
                      }}
                      className="space-y-3.5 text-xs text-stone-300"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Suite Name</label>
                          <input name="name" defaultValue={editingAcc?.name || ""} required className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Type Category</label>
                          <input name="type" defaultValue={editingAcc?.type || "Master Suite"} required className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Subtitle Tagline</label>
                        <input name="subtitle" defaultValue={editingAcc?.subtitle || ""} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Weekday Price (₹/Night)</label>
                          <input type="number" name="pricePerNight" defaultValue={editingAcc?.pricePerNight || 6499} required className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Weekend Price (₹/Night)</label>
                          <input type="number" name="weekendPrice" defaultValue={editingAcc?.weekendPrice || 7999} required className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Capacity Text</label>
                          <input name="capacity" defaultValue={editingAcc?.capacity || "Up to 4 Guests"} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Max Guests Count</label>
                          <input type="number" name="maxGuests" defaultValue={editingAcc?.maxGuests || 4} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Size (Sq Ft)</label>
                          <input type="number" name="sizeSqFt" defaultValue={editingAcc?.sizeSqFt || 600} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Bedrooms</label>
                          <input name="bedrooms" defaultValue={editingAcc?.bedrooms || "1 King Bedroom"} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Bathrooms</label>
                          <input name="bathrooms" defaultValue={editingAcc?.bathrooms || "1 En-suite Bathroom"} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Description</label>
                        <textarea name="description" rows={2} defaultValue={editingAcc?.description || ""} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Key Features (One per line)</label>
                        <textarea name="features" rows={3} defaultValue={editingAcc?.features.join("\n") || ""} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Amenities (Comma separated)</label>
                        <input name="amenities" defaultValue={editingAcc?.amenities.join(", ") || ""} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => { setEditingAcc(null); setIsAddingAcc(false); }} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: PHOTOS & VIDEO MEDIA CMS */}
          {/* ========================================================================= */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              {/* Photo Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">Gallery Photos CMS</h3>
                    <p className="text-xs text-stone-400">Add, categorize, and update photo showcases across the estate.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingPhoto(true)}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div key={photo.id} className="bg-[#181614] border border-stone-800 rounded-2xl overflow-hidden group">
                      <div className="relative h-44 overflow-hidden">
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-[10px] text-amber-300 font-bold uppercase rounded-md">
                          {photo.category}
                        </span>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button
                            onClick={() => {
                              if (confirm(`Delete photo ${photo.title}?`)) {
                                deleteGalleryPhoto(photo.id);
                                showToast("Photo removed");
                              }
                            }}
                            className="p-1.5 bg-red-950/80 hover:bg-red-800 text-red-300 rounded-lg backdrop-blur-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <h4 className="font-serif font-bold text-sm text-white">{photo.title}</h4>
                        <p className="text-xs text-stone-400 leading-snug">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Media Section */}
              <div className="space-y-4 pt-6 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">Video Tours & Drone Footage</h3>
                    <p className="text-xs text-stone-400">Embed 4K drone walks, poolside reels, and video tours.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingVideo(true)}
                    className="bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Add Video Link</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoMedia.map((vid) => (
                    <div key={vid.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 flex gap-4 items-center">
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900">
                        <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/80 px-1 text-[9px] font-mono text-white rounded">
                          {vid.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-bold text-sm text-white truncate">{vid.title}</h4>
                        <p className="text-xs text-stone-400 line-clamp-1">{vid.description}</p>
                        <a href={vid.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-amber-400 flex items-center space-x-1 hover:underline">
                          <span>Watch Video</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete video ${vid.title}?`)) {
                            deleteVideoMedia(vid.id);
                            showToast("Video removed");
                          }
                        }}
                        className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Photo Modal */}
              {isAddingPhoto && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-md p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">Add New Photo to Gallery</h3>
                      <button onClick={() => setIsAddingPhoto(false)} className="p-1 text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        addGalleryPhoto({
                          id: `g-${Date.now()}`,
                          title: formData.get("title") as string,
                          category: formData.get("category") as any,
                          imageUrl: formData.get("imageUrl") as string,
                          caption: formData.get("caption") as string,
                        });
                        showToast("Photo added to gallery!");
                        setIsAddingPhoto(false);
                      }}
                      className="space-y-3 text-xs text-stone-300"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Photo Title</label>
                        <input name="title" required placeholder="e.g. Sunset Poolside Reflection" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Category</label>
                        <select name="category" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white">
                          <option value="villa">Villa Exterior & Architecture</option>
                          <option value="pool">Swimming Pool & Deck</option>
                          <option value="interiors">Suites & Bedrooms</option>
                          <option value="lawns">Celebration Lawns & Bonfire</option>
                          <option value="dining">Dining & Chef Kitchen</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Image URL</label>
                        <input name="imageUrl" required placeholder="https://..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Caption</label>
                        <textarea name="caption" rows={2} placeholder="Brief description for guests..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setIsAddingPhoto(false)} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl">Add Photo</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Add Video Modal */}
              {isAddingVideo && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-md p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">Add Video Showcase</h3>
                      <button onClick={() => setIsAddingVideo(false)} className="p-1 text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        addVideoMedia({
                          id: `vid-${Date.now()}`,
                          title: formData.get("title") as string,
                          videoUrl: formData.get("videoUrl") as string,
                          thumbnailUrl: formData.get("thumbnailUrl") as string,
                          duration: formData.get("duration") as string || "2:00 mins",
                          description: formData.get("description") as string,
                        });
                        showToast("Video link added!");
                        setIsAddingVideo(false);
                      }}
                      className="space-y-3 text-xs text-stone-300"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Video Title</label>
                        <input name="title" required placeholder="e.g. 4K Drone Tour of Estate" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">YouTube / Vimeo / MP4 Link</label>
                        <input name="videoUrl" required placeholder="https://youtube.com/..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Thumbnail Image URL</label>
                        <input name="thumbnailUrl" required placeholder="https://..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Duration (e.g. 2:30 mins)</label>
                        <input name="duration" defaultValue="2:15 mins" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Description</label>
                        <textarea name="description" rows={2} className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setIsAddingVideo(false)} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl">Add Video</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: DINING & CHEF MENUS CMS */}
          {/* ========================================================================= */}
          {activeTab === "dining" && (
            <div className="space-y-6">
              {/* Meal Package Pricing Controls */}
              <div className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-4">
                <h3 className="font-serif font-bold text-base text-white">Meal Plan Pricing Rates (Per Person / Day)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1 bg-[#12100e] p-3.5 rounded-xl border border-stone-800">
                    <span className="text-[11px] font-bold text-stone-400 uppercase">EP Plan (Room Only)</span>
                    <div className="text-xl font-bold text-white">₹{mealPricing.epPrice}</div>
                    <span className="text-[10px] text-stone-500">Self-catered or à la carte</span>
                  </div>

                  <div className="space-y-1 bg-[#12100e] p-3.5 rounded-xl border border-stone-800">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">CP Plan (With Breakfast)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-amber-300">₹</span>
                      <input
                        type="number"
                        value={mealPricing.cpPrice}
                        onChange={(e) => updateMealPricing({ cpPrice: Number(e.target.value) })}
                        className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-sm font-bold text-amber-300 w-24"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500">Fresh breakfast spread + hot beverages</span>
                  </div>

                  <div className="space-y-1 bg-[#12100e] p-3.5 rounded-xl border border-stone-800">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase">AP Plan (All Meals - Chef Special)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-emerald-300">₹</span>
                      <input
                        type="number"
                        value={mealPricing.apPrice}
                        onChange={(e) => updateMealPricing({ apPrice: Number(e.target.value) })}
                        className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-sm font-bold text-emerald-300 w-24"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500">Breakfast, Lunch, High Tea & Dinner</span>
                  </div>
                </div>
              </div>

              {/* Dish Menu Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">Chef's Signature Dishes & Menu Items</h3>
                    <p className="text-xs text-stone-400">Manage Konkani dishes, barbecue specials, and desserts.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingDining(true)}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Dish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {diningMenu.map((item) => (
                    <div key={item.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? "bg-emerald-400" : "bg-red-500"}`} />
                            <h4 className="font-serif font-bold text-sm text-white">{item.name}</h4>
                            {item.isChefSpecial && (
                              <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                                Chef Special
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Delete dish ${item.name}?`)) {
                              deleteDiningItem(item.id);
                              showToast("Dish removed from menu");
                            }
                          }}
                          className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Dish Modal */}
              {isAddingDining && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-md p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">Add New Menu Dish</h3>
                      <button onClick={() => setIsAddingDining(false)} className="p-1 text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        addDiningItem({
                          id: `m-${Date.now()}`,
                          name: formData.get("name") as string,
                          category: formData.get("category") as any,
                          isVeg: formData.get("isVeg") === "true",
                          isChefSpecial: formData.get("isChefSpecial") === "true",
                          description: formData.get("description") as string,
                        });
                        showToast("Dish added to menu!");
                        setIsAddingDining(false);
                      }}
                      className="space-y-3 text-xs text-stone-300"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Dish Name</label>
                        <input name="name" required placeholder="e.g. Fresh Kadav Prawns Masala" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Category</label>
                          <select name="category" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white">
                            <option value="Breakfast">Breakfast</option>
                            <option value="Konkani Specials">Konkani Specials</option>
                            <option value="Barbecue & Grill">Barbecue & Grill</option>
                            <option value="Mains & Thali">Mains & Thali</option>
                            <option value="Desserts & Drinks">Desserts & Drinks</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Diet Type</label>
                          <select name="isVeg" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white">
                            <option value="true">Pure Vegetarian (Veg)</option>
                            <option value="false">Non-Vegetarian (Non-Veg)</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Chef Special Badge</label>
                        <select name="isChefSpecial" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white">
                          <option value="true">Yes (Feature on Website)</option>
                          <option value="false">Standard Item</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Description</label>
                        <textarea name="description" rows={2} placeholder="Ingredients and preparation method..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setIsAddingDining(false)} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl">Save Dish</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: AMENITIES CMS */}
          {/* ========================================================================= */}
          {activeTab === "amenities" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Estate Amenities & Experiences</h3>
                  <p className="text-xs text-stone-400">Edit pool details, bonfire, caretaker services, and lawn setups.</p>
                </div>
                <button
                  onClick={() => {
                    const title = prompt("Enter Amenity Title (e.g. Lawn Pickleball Court):");
                    if (title) {
                      addAmenity({
                        id: `am-${Date.now()}`,
                        title,
                        category: "Water & Outdoors",
                        description: "New amenity offered at Suryavan Villa.",
                        iconName: "Sparkles",
                        highlight: "Available exclusively for guests",
                        image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
                      });
                      showToast("Amenity added!");
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Amenity</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((am) => (
                  <div key={am.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase">{am.category}</span>
                        <h4 className="font-serif font-bold text-sm text-white">{am.title}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete amenity ${am.title}?`)) {
                            deleteAmenity(am.id);
                            showToast("Amenity deleted");
                          }
                        }}
                        className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-400">{am.description}</p>
                    <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-300 font-medium">
                      ★ Highlight: {am.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: NEARBY ATTRACTIONS CMS */}
          {/* ========================================================================= */}
          {activeTab === "attractions" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Nearby Sightseeing CMS</h3>
                  <p className="text-xs text-stone-400">Manage tourist attractions in Kadav and Karjat.</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Enter Attraction Name (e.g. Sondai Fort):");
                    if (name) {
                      addAttraction({
                        id: `att-${Date.now()}`,
                        name,
                        category: "Heritage & Forts",
                        distance: "16 km",
                        driveTime: "30 mins",
                        description: "Scenic hill fort near Karjat with majestic views.",
                        bestSeason: "July to February",
                        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                      });
                      showToast("Attraction added!");
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Sight</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attractions.map((att) => (
                  <div key={att.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase">{att.category}</span>
                        <h4 className="font-serif font-bold text-sm text-white">{att.name}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete attraction ${att.name}?`)) {
                            deleteAttraction(att.id);
                            showToast("Attraction deleted");
                          }
                        }}
                        className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-stone-300 font-medium">
                      📍 {att.distance} ({att.driveTime}) • Best: {att.bestSeason}
                    </div>
                    <p className="text-xs text-stone-400">{att.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: GUEST REVIEWS CMS */}
          {/* ========================================================================= */}
          {activeTab === "reviews" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Guest Reviews & Testimonials</h3>
                  <p className="text-xs text-stone-400">Moderate guest feedback and add verified reviews.</p>
                </div>
                <button
                  onClick={() => setIsAddingReview(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Guest Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-1 text-amber-400 mb-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-white">{rev.title}</h4>
                        <span className="text-xs text-stone-400">{rev.author} ({rev.location}) • {rev.stayType}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review from ${rev.author}?`)) {
                            deleteReview(rev.id);
                            showToast("Review deleted");
                          }
                        }}
                        className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-300 italic bg-[#12100e] p-3 rounded-xl border border-stone-800/60">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Review Modal */}
              {isAddingReview && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-[#181614] border border-stone-700 rounded-2xl w-full max-w-md p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h3 className="font-serif font-bold text-lg text-white">Add Verified Guest Review</h3>
                      <button onClick={() => setIsAddingReview(false)} className="p-1 text-stone-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        addReview({
                          id: `rev-${Date.now()}`,
                          author: formData.get("author") as string,
                          location: formData.get("location") as string,
                          rating: Number(formData.get("rating")),
                          date: "Recent Stay",
                          stayType: formData.get("stayType") as string,
                          title: formData.get("title") as string,
                          comment: formData.get("comment") as string,
                          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                          verified: true,
                        });
                        showToast("Review added to website!");
                        setIsAddingReview(false);
                      }}
                      className="space-y-3 text-xs text-stone-300"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Author Name</label>
                          <input name="author" required placeholder="e.g. Vikramaditya S." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Location</label>
                          <input name="location" required placeholder="e.g. Mumbai" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Stay Type</label>
                          <input name="stayType" defaultValue="Family & Friends (12 Guests)" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold uppercase text-stone-400">Rating (1 to 5)</label>
                          <select name="rating" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white">
                            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value="4">⭐⭐⭐⭐ (4/5)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Review Title</label>
                        <input name="title" required placeholder="e.g. Best weekend in Karjat!" className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase text-stone-400">Review Comment</label>
                        <textarea name="comment" rows={3} required placeholder="Guest feedback..." className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2 text-white" />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setIsAddingReview(false)} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl">Save Review</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: FAQS CMS */}
          {/* ========================================================================= */}
          {activeTab === "faqs" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Frequently Asked Questions (FAQs)</h3>
                  <p className="text-xs text-stone-400">Add or edit answers to guest queries on the live site.</p>
                </div>
                <button
                  onClick={() => {
                    const question = prompt("Enter Question:");
                    if (question) {
                      const answer = prompt("Enter Answer:") || "";
                      addFaq({ question, answer });
                      showToast("FAQ added!");
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-[#181614] border border-stone-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-serif font-bold text-sm text-white flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{faq.question}</span>
                      </h4>
                      <button
                        onClick={() => {
                          if (confirm(`Delete FAQ: "${faq.question}"?`)) {
                            deleteFaq(index);
                            showToast("FAQ deleted");
                          }
                        }}
                        className="p-1.5 bg-stone-800 hover:bg-red-950 text-red-400 rounded-lg shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 10: AI CONCIERGE LOGS & PROMPT TUNING */}
          {/* ========================================================================= */}
          {activeTab === "ai-concierge" && (
            <div className="space-y-6">
              <div className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-amber-400" />
                      <span>AI Concierge Knowledge Base & Custom Prompt Rules</span>
                    </h3>
                    <p className="text-xs text-stone-400">Add custom instructions, seasonal discounts, or house rules that the AI will enforce.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase text-amber-400">Custom House Instructions for AI Concierge</label>
                  <textarea
                    rows={3}
                    value={villaSettings.aiSystemPromptAddition}
                    onChange={(e) => updateVillaSettings({ aiSystemPromptAddition: e.target.value })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Offer 10% discount for weekday stays longer than 2 nights. Mention that bonfire setup is complimentary..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => showToast("AI Knowledge Base Updated!")}
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Prompt</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Test AI Concierge Sandbox */}
              <div className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-serif font-bold text-base text-white">Live AI Concierge Sandbox Test</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a test guest question (e.g. Can we bring our pet dog and what is the pool depth?)..."
                    value={testAiQuery}
                    onChange={(e) => setTestAiQuery(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && testAiQuery.trim()) {
                        setTestAiLoading(true);
                        try {
                          const res = await fetch("/api/concierge", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ prompt: testAiQuery }),
                          });
                          const data = await res.json();
                          setTestAiResponse(data.reply);
                          addAiLog(testAiQuery, data.reply);
                        } catch (err) {
                          setTestAiResponse("Error contacting AI server.");
                        } finally {
                          setTestAiLoading(false);
                        }
                      }
                    }}
                    className="flex-1 bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    disabled={testAiLoading || !testAiQuery.trim()}
                    onClick={async () => {
                      setTestAiLoading(true);
                      try {
                        const res = await fetch("/api/concierge", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ prompt: testAiQuery }),
                        });
                        const data = await res.json();
                        setTestAiResponse(data.reply);
                        addAiLog(testAiQuery, data.reply);
                      } catch (err) {
                        setTestAiResponse("Error contacting AI server.");
                      } finally {
                        setTestAiLoading(false);
                      }
                    }}
                    className="bg-amber-500 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{testAiLoading ? "Thinking..." : "Test"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {testAiResponse && (
                  <div className="bg-[#12100e] p-3.5 rounded-xl border border-stone-800 text-xs text-stone-200 whitespace-pre-line">
                    <strong className="text-amber-400 block mb-1">AI Output:</strong>
                    {testAiResponse}
                  </div>
                )}
              </div>

              {/* AI Query Logs */}
              <div className="bg-[#181614] border border-stone-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-stone-800 font-serif font-bold text-sm text-white">
                  Recent Guest AI Chat Logs ({aiLogs.length})
                </div>
                <div className="divide-y divide-stone-800 max-h-80 overflow-y-auto">
                  {aiLogs.map((log) => (
                    <div key={log.id} className="p-3.5 text-xs space-y-1 hover:bg-stone-900/40">
                      <div className="flex items-center justify-between text-stone-400 text-[10px]">
                        <span className="font-bold text-amber-300">Guest Question</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="font-medium text-white">{log.query}</div>
                      <div className="text-stone-400 text-[11px] line-clamp-2 bg-[#12100e] p-2 rounded-lg border border-stone-800">
                        {log.reply}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 11: VILLA CONTACT & UPI SETTINGS */}
          {/* ========================================================================= */}
          {activeTab === "settings" && (
            <div className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-5">
              <div>
                <h3 className="font-serif font-bold text-base text-white">Villa Contact Information & Payment Setup</h3>
                <p className="text-xs text-stone-400">Update phone, WhatsApp, Google Maps link, and direct UPI account details.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Villa Profile & Contact details saved!");
                }}
                className="space-y-4 text-xs text-stone-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Villa Display Name</label>
                    <input
                      value={villaSettings.name}
                      onChange={(e) => updateVillaSettings({ name: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Tagline</label>
                    <input
                      value={villaSettings.tagline}
                      onChange={(e) => updateVillaSettings({ tagline: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Reservations Phone</label>
                    <input
                      value={villaSettings.phone}
                      onChange={(e) => updateVillaSettings({ phone: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">WhatsApp Number</label>
                    <input
                      value={villaSettings.whatsappNumber}
                      onChange={(e) => updateVillaSettings({ whatsappNumber: e.target.value, whatsappUrl: `https://wa.me/${e.target.value}` })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Reservations Email</label>
                    <input
                      value={villaSettings.email}
                      onChange={(e) => updateVillaSettings({ email: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Check-In Time</label>
                    <input
                      value={villaSettings.checkInTime}
                      onChange={(e) => updateVillaSettings({ checkInTime: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Check-Out Time</label>
                    <input
                      value={villaSettings.checkOutTime}
                      onChange={(e) => updateVillaSettings({ checkOutTime: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">UPI ID for Direct Advance</label>
                    <input
                      value={villaSettings.upiId}
                      onChange={(e) => updateVillaSettings({ upiId: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase text-stone-400">Bank Account Details</label>
                    <input
                      value={villaSettings.bankDetails}
                      onChange={(e) => updateVillaSettings({ bankDetails: e.target.value })}
                      className="w-full bg-[#12100e] border border-stone-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 12: DATA BACKUP & RESET */}
          {/* ========================================================================= */}
          {activeTab === "backup" && (
            <div className="space-y-5">
              <div className="bg-[#181614] border border-stone-800 rounded-2xl p-5 space-y-4">
                <h3 className="font-serif font-bold text-base text-white">Full CMS Backup & Export</h3>
                <p className="text-xs text-stone-400">Download a complete JSON snapshot of all bookings, custom suites, photos, dining items, reviews, and settings.</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const json = exportBackupJson();
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `suryavan_villa_backup_${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast("Backup downloaded successfully!");
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer border border-stone-700">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Restore From JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result as string;
                            if (content && importBackupJson(content)) {
                              showToast("Restored CMS state from backup!");
                            } else {
                              alert("Invalid backup file format.");
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5 space-y-3">
                <h3 className="font-serif font-bold text-base text-red-300 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span>Restore Factory Defaults</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Reset all accommodations, photos, reviews, dining menus, and contact info back to the original Suryavan Villa launch configuration.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to reset all data to default? This will clear custom inquiries and edits.")) {
                      resetToDefaults();
                      showToast("Reset to default configuration!");
                    }
                  }}
                  className="bg-red-900/80 hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Factory Reset Data</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
