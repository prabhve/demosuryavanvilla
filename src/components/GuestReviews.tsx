import { useState } from "react";
import { 
  Star, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useEstateData } from "../context/EstateDataContext";

export default function GuestReviews() {
  const { reviews } = useEstateData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewList = reviews && reviews.length > 0 ? reviews : [
    {
      id: "rev-1",
      author: "Aditya & Neha Sharma",
      location: "Mumbai",
      rating: 5,
      date: "February 2025",
      stayType: "Family Weekend",
      title: "An unforgettable private oasis in Kadav",
      comment: "Suryavan Villa exceeded our expectations! The 40-ft swimming pool was sparkling clean, chef-cooked Kombdi Vade was sublime, and the lawn was enormous for kids to play.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
    }
  ];

  const safeIndex = currentIndex % reviewList.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewList.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewList.length) % reviewList.length);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#f5f1eb] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Guest Stories & Accolades</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight">
            Loved by Over 180+ Families & Groups
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          
          {/* Trust Rating Bar */}
          <div className="mt-6 inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full shadow-md border border-stone-200">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-stone-900 text-sm">4.9 / 5.0</span>
            <span className="text-stone-400 text-xs">•</span>
            <span className="text-stone-600 text-xs">Verified Google Stays</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviewList.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-200/90 hover:border-amber-400 hover:shadow-xl transition flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                {/* Top Row with rating & tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {review.stayType}
                  </span>
                </div>

                {/* Review Title & Quote */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    "{review.title}"
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                    alt={review.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <div className="font-bold text-sm text-stone-900 flex items-center space-x-1.5">
                      <span>{review.author}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-xs text-stone-500">
                      {review.location} • {review.date}
                    </div>
                  </div>
                </div>

                <Quote className="w-7 h-7 text-amber-200 group-hover:text-amber-400 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
