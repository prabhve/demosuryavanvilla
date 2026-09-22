import { useState } from "react";
import { 
  MapPin, 
  Car, 
  Train, 
  Plane, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  Phone
} from "lucide-react";
import { VILLA_CONTACT } from "../data/villaData";

export default function LiveLocationDirections() {
  const [copied, setCopied] = useState(false);
  const [activeRouteTab, setActiveRouteTab] = useState<"mumbai" | "pune" | "train">("mumbai");

  const fullAddress = `${VILLA_CONTACT.addressLine1}, ${VILLA_CONTACT.city}, ${VILLA_CONTACT.state} ${VILLA_CONTACT.postalCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#181614] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Prime Sahyadri Location</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Location & Travel Directions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-300 text-base sm:text-lg">
            Located in scenic Tambas village, Kadav, just minutes from Karjat town. Smooth four-lane highway access from both Mumbai and Pune.
          </p>
        </div>

        {/* 2-Column: Interactive Map & Turn-by-Turn Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left 6 Cols: Google Maps Embed & Copy Address */}
          <div className="lg:col-span-6 bg-[#201c18] border border-stone-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl">
            {/* Map Frame */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-700 shadow-inner">
              <iframe
                title="Suryavan Villa Google Maps Location"
                src="https://maps.google.com/maps?q=18.9492291,73.3754337&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 bg-[#1c1917]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-xs font-semibold text-amber-300 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>GPS: 18.9492° N, 73.3754° E</span>
              </div>
            </div>

            {/* Exact Address Box */}
            <div className="bg-[#141210] rounded-2xl p-4 sm:p-5 border border-stone-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                    Official Estate Address
                  </div>
                  <div className="font-serif font-bold text-base text-white mt-0.5">
                    Suryavan Villa
                  </div>
                  <div className="text-xs sm:text-sm text-stone-300 mt-1">
                    32/2B/3, Tambas, Kadav, Karjat, Maharashtra 410201
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={VILLA_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#d4af37] hover:bg-amber-400 text-[#1c1917] font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={`tel:${VILLA_CONTACT.phone}`}
                  className="text-stone-300 hover:text-white text-xs flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Villa Manager for Live Location Pin</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Driving Routes & Transit Hubs */}
          <div className="lg:col-span-6 bg-[#201c18] border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Reach Us Effortlessly
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Step-by-Step Driving Directions
                </h3>
              </div>

              {/* Route Tabs */}
              <div className="flex gap-2 border-b border-stone-800 pb-3">
                <button
                  onClick={() => setActiveRouteTab("mumbai")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                    activeRouteTab === "mumbai"
                      ? "bg-[#d4af37] text-[#1c1917]"
                      : "bg-stone-900 text-stone-300 hover:text-white"
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>From Mumbai (80 km)</span>
                </button>
                <button
                  onClick={() => setActiveRouteTab("pune")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                    activeRouteTab === "pune"
                      ? "bg-[#d4af37] text-[#1c1917]"
                      : "bg-stone-900 text-stone-300 hover:text-white"
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>From Pune (100 km)</span>
                </button>
                <button
                  onClick={() => setActiveRouteTab("train")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                    activeRouteTab === "train"
                      ? "bg-[#d4af37] text-[#1c1917]"
                      : "bg-stone-900 text-stone-300 hover:text-white"
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>By Train / Transit</span>
                </button>
              </div>

              {/* Step Content */}
              {activeRouteTab === "mumbai" && (
                <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>Take the <strong>Sion-Panvel Expressway</strong> and continue onto the <strong>Mumbai-Pune Expressway</strong>.</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>Take the <strong>Shedung / Chowk exit</strong> towards Karjat on SH 76.</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>Drive through Karjat town towards <strong>Kadav (Murbad-Karjat road)</strong> for approx 10 km.</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">4</span>
                    <p>Turn into <strong>Tambas village lane (32/2B/3)</strong> to reach the main grand gate of <strong>Suryavan Villa</strong>.</p>
                  </div>
                </div>
              )}

              {activeRouteTab === "pune" && (
                <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>Join the <strong>Mumbai-Pune Expressway</strong> from Pune / Hinjewadi.</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>Take the <strong>Khalapur toll plaza exit</strong> and follow signs towards Karjat.</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>From Karjat, head on the scenic Kadav highway to <strong>Tambas</strong> (approx. 20-min picturesque drive).</p>
                  </div>
                </div>
              )}

              {activeRouteTab === "train" && (
                <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <Train className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <strong>Karjat Railway Station (12 km)</strong>
                      <p className="text-xs text-stone-400 mt-0.5">Central Railway suburban trains from CSMT/Dadar/Thane run frequently. Private autos & cabs take ~20 mins to reach Suryavan Villa.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-[#141210] p-3 rounded-xl border border-stone-800">
                    <Plane className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <strong>Navi Mumbai Airport (58 km) / Mumbai International (82 km)</strong>
                      <p className="text-xs text-stone-400 mt-0.5">We can arrange private chauffeured AC Innova / Ertiga pickup upon advance request.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Distance Quick Badges */}
            <div className="pt-4 border-t border-stone-800 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#141210] p-2.5 rounded-xl border border-stone-800">
                <div className="font-bold text-amber-400">1.5 - 2 Hrs</div>
                <div className="text-[10px] text-stone-400">From Mumbai</div>
              </div>
              <div className="bg-[#141210] p-2.5 rounded-xl border border-stone-800">
                <div className="font-bold text-amber-400">2 Hrs</div>
                <div className="text-[10px] text-stone-400">From Pune</div>
              </div>
              <div className="bg-[#141210] p-2.5 rounded-xl border border-stone-800">
                <div className="font-bold text-amber-400">12 km</div>
                <div className="text-[10px] text-stone-400">Karjat Station</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
