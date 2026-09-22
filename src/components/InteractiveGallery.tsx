import { useState } from "react";
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Eye
} from "lucide-react";
import { useEstateData } from "../context/EstateDataContext";

export default function InteractiveGallery() {
  const { galleryPhotos } = useEstateData();
  const [filter, setFilter] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "villa", label: "Villa Exterior" },
    { id: "pool", label: "Swimming Pool" },
    { id: "interiors", label: "Suites & Living" },
    { id: "lawns", label: "Lawns & Bonfire" },
    { id: "dining", label: "Gourmet Dining" },
  ];

  const filteredPhotos = filter === "all"
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === filter);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#161412] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Visual Tour</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Glimpses of Suryavan Villa
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-300 text-base sm:text-lg">
            Explore the tranquil estate, pristine pool waters, sunlit bedrooms, and ambient evening setups waiting for you in Kadav, Karjat.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                filter === cat.id
                  ? "bg-[#d4af37] text-[#1c1917] font-bold shadow-lg shadow-amber-950/40 scale-105"
                  : "bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-stone-800"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#1c1917] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-300 transition">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 mt-0.5 leading-snug">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-black/50 p-3 rounded-full border border-white/20 transition"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Right Nav */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-black/50 p-3 rounded-full border border-white/20 transition"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Main Lightbox Content */}
            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-stone-200">
                <div className="font-serif font-bold text-lg text-amber-300">
                  {filteredPhotos[activePhotoIndex].title}
                </div>
                <div className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                  {filteredPhotos[activePhotoIndex].caption}
                </div>
                <div className="text-xs text-stone-500 mt-2 font-mono">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
