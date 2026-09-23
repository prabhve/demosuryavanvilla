import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  Users, 
  UtensilsCrossed, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Flame, 
  Car, 
  Gift,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useEstateData } from "../context/EstateDataContext";
import { BookingFormData } from "../types";

interface DirectBookingEngineProps {
  initialRoomType?: string;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
}

export default function DirectBookingEngine({ initialRoomType, initialDates }: DirectBookingEngineProps) {
  const { accommodations, villaSettings, addInquiry } = useEstateData();
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const [formData, setFormData] = useState<BookingFormData>({
    guestName: "",
    phone: "",
    email: "",
    checkIn: initialDates?.checkIn || tomorrow.toISOString().split("T")[0],
    checkOut: initialDates?.checkOut || dayAfter.toISOString().split("T")[0],
    guestsCount: initialDates?.guests || 8,
    roomType: initialRoomType || (accommodations[0]?.id || "estate-buyout"),
    mealPlan: "AP (All Meals - Chef Special)",
    addons: ["Live Barbecue Setup", "Evening Bonfire Experience"],
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingRef: string;
    whatsappUrl: string;
  } | null>(null);

  // Available addons
  const availableAddons = [
    { id: "Live Barbecue Setup", label: "Live Poolside Barbecue (Tandoor & Skewers)", price: 1500, icon: Flame },
    { id: "Evening Bonfire Experience", label: "Evening Bonfire & Stargazing Wood Setup", price: 800, icon: Flame },
    { id: "Karjat Station Transfer", label: "Karjat Station Pickup & Drop (Innova / Ertiga)", price: 1200, icon: Car },
    { id: "Celebration Lawn Decor", label: "Celebration Floral & Balloon Lawn Decor", price: 2500, icon: Gift },
  ];

  // Dynamic calculations
  const calculation = useMemo(() => {
    const selectedAcc = accommodations.find((a) => a.id === formData.roomType) || accommodations[0] || {
      id: "estate-buyout",
      name: "5-BHK Full Estate Buyout",
      pricePerNight: 35000,
    };
    
    // Calculate nights
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.max(end.getTime() - start.getTime(), 1000 * 60 * 60 * 24);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    // Base rate
    const baseNightlyRate = (selectedAcc as any).pricePerNight || 35000;
    const roomTotal = baseNightlyRate * nights;

    // Meal Plan Total
    let mealRatePerPerson = 0;
    if (formData.mealPlan === "CP (With Breakfast)") {
      mealRatePerPerson = 350;
    } else if (formData.mealPlan === "AP (All Meals - Chef Special)") {
      mealRatePerPerson = 1500;
    }
    const mealsTotal = mealRatePerPerson * formData.guestsCount * nights;

    // Addons Total
    let addonsTotal = 0;
    formData.addons.forEach((addonId) => {
      const match = availableAddons.find((a) => a.id === addonId);
      if (match) addonsTotal += match.price;
    });

    const subTotal = roomTotal + mealsTotal + addonsTotal;
    const directDiscount = Math.round(subTotal * 0.05); // 5% Direct Booking Discount
    const estimatedTotal = subTotal - directDiscount;

    return {
      nights,
      selectedAcc,
      roomTotal,
      mealsTotal,
      addonsTotal,
      directDiscount,
      estimatedTotal,
    };
  }, [formData, accommodations]);

  const toggleAddon = (addonId: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter((id) => id !== addonId)
        : [...prev.addons, addonId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Also register in local central state
      const localRef = addInquiry(formData, "Website Form");

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success || localRef) {
        setBookingSuccess({
          bookingRef: data.bookingRef || localRef,
          whatsappUrl: data.whatsappUrl || `https://wa.me/${villaSettings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${villaSettings.name}, I submitted booking inquiry ${localRef} for ${formData.guestName}.`)}`,
        });
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      const localRef = addInquiry(formData, "Website Form");
      setBookingSuccess({
        bookingRef: localRef,
        whatsappUrl: `https://wa.me/${villaSettings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${villaSettings.name}, I submitted booking inquiry ${localRef} for ${formData.guestName}.`)}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#181614] text-white relative scroll-mt-20">
      <div id="booking-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Reservation Engine</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Check Rates & Reserve Your Stay
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-300 text-base sm:text-lg">
            Enjoy exclusive direct booking privileges, zero agent commission fees, complimentary evening bonfire setup, and direct WhatsApp concierge access.
          </p>
        </div>

        {bookingSuccess ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-[#201c18] border-2 border-amber-500/80 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Reservation Request Acknowledged
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Thank You, {formData.guestName}!
              </h3>
              <p className="text-stone-300 text-sm">
                Your reservation reference ID is:{" "}
                <span className="font-mono font-bold text-amber-400 px-2.5 py-1 bg-black/40 rounded-lg border border-amber-500/30">
                  {bookingSuccess.bookingRef}
                </span>
              </p>
            </div>

            <div className="bg-stone-900/90 rounded-2xl p-4 text-xs sm:text-sm text-left text-stone-300 space-y-2 border border-stone-800">
              <div className="flex justify-between">
                <span className="text-stone-500">Suite Selected:</span>
                <span className="font-medium text-white">{calculation.selectedAcc.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dates:</span>
                <span className="font-medium text-white">{formData.checkIn} to {formData.checkOut} ({calculation.nights} Nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guests:</span>
                <span className="font-medium text-white">{formData.guestsCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Total:</span>
                <span className="font-bold text-amber-400">₹{calculation.estimatedTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={bookingSuccess.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Confirm on WhatsApp Immediately</span>
              </a>
              <button
                onClick={() => setBookingSuccess(null)}
                className="px-6 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-semibold transition"
              >
                Modify Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Reservation Form & Price Breakdown */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left 7 Columns: Form Controls */}
            <div className="lg:col-span-7 bg-[#201c18] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full bg-[#141210] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98201 44552"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#141210] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full bg-[#141210] border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={formData.checkIn || todayStr}
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full bg-[#141210] border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">
                      Guests Count *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                      className="w-full bg-[#141210] border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Suite / Estate Choice */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Select Suite or Estate Option *
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full bg-[#141210] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    {accommodations.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} — ₹{acc.pricePerNight.toLocaleString("en-IN")}/night
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Meal Plan Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                    <span>Choose Meal Package:</span>
                    <span className="text-[11px] text-amber-400">Cooked by In-House Chef</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {[
                      { id: "EP (Room Only)", label: "Room Only (EP)", desc: "Tea/Coffee station included" },
                      { id: "CP (With Breakfast)", label: "Breakfast (CP)", desc: "Hot Maharashtrian breakfast" },
                      { id: "AP (All Meals - Chef Special)", label: "All Meals (AP)", desc: "Breakfast, Lunch, Tea, Dinner" },
                    ].map((plan) => (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => setFormData({ ...formData, mealPlan: plan.id as any })}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          formData.mealPlan === plan.id
                            ? "border-amber-500 bg-amber-500/15 text-white"
                            : "border-stone-800 bg-[#141210] text-stone-400 hover:text-white"
                        }`}
                      >
                        <div className="font-bold text-amber-300">{plan.label}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{plan.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Add-ons Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-300">
                    Optional Curated Experiences:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {availableAddons.map((addon) => {
                      const isSelected = formData.addons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                            isSelected
                              ? "border-amber-500/70 bg-amber-500/10 text-white"
                              : "border-stone-800 bg-[#141210] text-stone-400 hover:border-stone-700"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-amber-500 border-amber-500 text-black" : "border-stone-600"}`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-medium text-stone-200">{addon.label}</span>
                          </div>
                          <span className="text-amber-400 font-bold ml-2 shrink-0">+₹{addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Special Requests (e.g. Jain food, birthday decor, pet arrival)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us any dietary requirements, celebration needs or arrival details..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-[#141210] border border-stone-700 rounded-xl px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#b38f2a] via-[#d4af37] to-[#e6c35c] hover:from-[#c89b3f] hover:to-[#ffd768] text-[#1c1917] font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isSubmitting ? "Generating Reservation Request..." : "Request Direct Reservation & Lock Rates"}</span>
                </button>
              </form>
            </div>

            {/* Right 5 Columns: Price Breakdown & Instant Connect */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cost Summary Card */}
              <div className="bg-[#201c18] border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                      Estimated Summary
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {calculation.selectedAcc.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {calculation.nights} {calculation.nights === 1 ? "Night" : "Nights"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <div className="flex justify-between">
                    <span>Base Accommodation ({calculation.nights} Nights):</span>
                    <span className="font-medium text-white">₹{calculation.roomTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meal Package ({formData.mealPlan.split(" ")[0]} x {formData.guestsCount} guests):</span>
                    <span className="font-medium text-white">₹{calculation.mealsTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {calculation.addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>Selected Experiences & Add-ons:</span>
                      <span className="font-medium text-white">₹{calculation.addonsTotal.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-400 font-medium pt-2 border-t border-stone-800">
                    <span>Direct Website Privilege (5% Off):</span>
                    <span>-₹{calculation.directDiscount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="pt-4 border-t border-amber-500/30 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-stone-400 uppercase font-semibold">Total Estimated Amount</div>
                    <div className="text-[10px] text-stone-500">Taxes & butler service included</div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#d4af37]">
                    ₹{calculation.estimatedTotal.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Direct Benefits Checklist */}
                <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero booking fees & 100% price match guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free cancellation up to 7 days prior to check-in</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp coordination with resident manager</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Help Card */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 text-center space-y-3">
                <div className="text-xs text-stone-400">Prefer instant voice or chat booking?</div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`tel:${villaSettings.phone}`}
                    className="flex-1 bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Call Reservations</span>
                  </a>
                  <a
                    href={`https://wa.me/${villaSettings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${villaSettings.name}, I would like to book a stay directly.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
