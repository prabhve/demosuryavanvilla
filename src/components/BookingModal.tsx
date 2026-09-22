import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  UtensilsCrossed 
} from "lucide-react";
import { ACCOMMODATIONS, VILLA_CONTACT } from "../data/villaData";
import { BookingFormData } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string;
  customDates?: { checkIn: string; checkOut: string; guests: number };
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedRoom,
  customDates,
}: BookingModalProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const [formData, setFormData] = useState<BookingFormData>({
    guestName: "",
    phone: "",
    email: "",
    checkIn: customDates?.checkIn || tomorrow.toISOString().split("T")[0],
    checkOut: customDates?.checkOut || dayAfter.toISOString().split("T")[0],
    guestsCount: customDates?.guests || 6,
    roomType: preselectedRoom || "estate-buyout",
    mealPlan: "AP (All Meals - Chef Special)",
    addons: ["Evening Bonfire Experience"],
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    bookingRef: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedRoom) {
      setFormData((prev) => ({ ...prev, roomType: preselectedRoom }));
    }
    if (customDates) {
      setFormData((prev) => ({
        ...prev,
        checkIn: customDates.checkIn,
        checkOut: customDates.checkOut,
        guestsCount: customDates.guests,
      }));
    }
  }, [preselectedRoom, customDates]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessData({
          bookingRef: data.bookingRef,
          whatsappUrl: data.whatsappUrl,
        });
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAccommodation = ACCOMMODATIONS.find((a) => a.id === formData.roomType) || ACCOMMODATIONS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#1c1917] border border-amber-500/40 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto text-stone-200 shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white bg-stone-800 p-2 rounded-full transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          /* Confirmation Message */
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Inquiry Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                We Have Received Your Stay Request!
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm">
                Reference ID: <strong className="text-amber-400 font-mono">{successData.bookingRef}</strong>
              </p>
            </div>

            <div className="bg-[#141210] p-4 rounded-2xl border border-stone-800 text-xs text-left text-stone-300 space-y-1.5">
              <div><strong>Guest:</strong> {formData.guestName} ({formData.phone})</div>
              <div><strong>Option:</strong> {selectedAccommodation.name}</div>
              <div><strong>Dates:</strong> {formData.checkIn} to {formData.checkOut} ({formData.guestsCount} Guests)</div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={successData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp With Resident Host</span>
              </a>
              <button
                onClick={onClose}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 py-2.5 rounded-xl text-xs font-semibold"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Booking Desk</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Reserve Suryavan Villa
              </h3>
              <p className="text-stone-400 text-xs">
                Tambas, Kadav, Karjat, Maharashtra 410201
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-300 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-300 font-semibold">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98201 44552"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-300 font-semibold">Check-In *</label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-300 font-semibold">Check-Out *</label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-300 font-semibold">Guests *</label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Accommodation Option */}
              <div className="space-y-1">
                <label className="text-stone-300 font-semibold">Option / Suite *</label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                >
                  {ACCOMMODATIONS.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} — from ₹{acc.pricePerNight.toLocaleString("en-IN")}/night
                    </option>
                  ))}
                </select>
              </div>

              {/* Meal Plan */}
              <div className="space-y-1">
                <label className="text-stone-300 font-semibold">Meal Preference</label>
                <select
                  value={formData.mealPlan}
                  onChange={(e) => setFormData({ ...formData, mealPlan: e.target.value as any })}
                  className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="AP (All Meals - Chef Special)">All Meals Package (Breakfast, Lunch, High Tea, Dinner + BBQ)</option>
                  <option value="CP (With Breakfast)">Breakfast Package Only</option>
                  <option value="EP (Room Only)">Room Only (Self Cater / Tea Station)</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="space-y-1">
                <label className="text-stone-300 font-semibold">Special Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Jain food required, birthday celebration cake setup, arrival time..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#12100e] border border-stone-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] text-[#1c1917] font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <span>{isSubmitting ? "Processing Request..." : "Submit Reservation Inquiry"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
