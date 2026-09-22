import { useState } from "react";
import { 
  UtensilsCrossed, 
  Flame, 
  Leaf, 
  Sparkles, 
  Coffee, 
  Check, 
  Calendar,
  MessageSquare
} from "lucide-react";
import { VILLA_CONTACT } from "../data/villaData";

interface CulinaryExperienceProps {
  onOpenBooking: () => void;
  onOpenConcierge: (prompt?: string) => void;
}

export default function CulinaryExperience({ onOpenBooking, onOpenConcierge }: CulinaryExperienceProps) {
  const [activeMenuTab, setActiveMenuTab] = useState<"konkani" | "bbq" | "north-indian" | "jain">("konkani");

  const menuSections = {
    konkani: {
      title: "Authentic Konkani & Maharashtrian Feasts",
      subtitle: "Heartwarming local flavours cooked with freshly ground spices and village ghee",
      items: [
        { name: "Special Maharashtrian Kombdi Vade", desc: "Tender chicken cooked in rich roasted coconut gravy with fluffy puri-like vades" },
        { name: "Traditional Pithla Bhakri", desc: "Warm besan delicacy tempered with garlic, served with piping hot jowar or bajra bhakri & thecha" },
        { name: "Konkani Fish Curry & Fry (On Request)", desc: "Fresh fish marinated in Malvani masala, rava crusted and pan-fried to crisp perfection" },
        { name: "Authentic Solkadhi", desc: "Refreshing kokum and fresh coconut milk cooler infused with green chillies and garlic" },
        { name: "Shrikhand & Puran Poli", desc: "Handmade sweet flatbread stuffed with chana dal, cardamom & jaggery, drizzled with desi ghee" },
      ],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    },
    bbq: {
      title: "Live Poolside Barbecue & Tandoor",
      subtitle: "Smoky, sizzling skewers prepared right by the pool and bonfire",
      items: [
        { name: "Tandoori Paneer Tikka Angara", desc: "Cottage cheese cubes marinated in smoked hung curd, mustard oil and aromatic spices" },
        { name: "Juicy Chicken Seekh & Reshmi Kebabs", desc: "Melt-in-the-mouth skewers served with mint chutney and fresh onion rings" },
        { name: "Charred Corn & Herb Veggie Skewers", desc: "Zucchini, bell peppers, baby potatoes, and mushrooms basted in lemon butter" },
        { name: "Roasted Marshmallows & Bonfire Treats", desc: "Fun evening dessert over open flames for kids and families" },
      ],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    },
    "north-indian": {
      title: "North Indian & Mughlai Delicacies",
      subtitle: "Rich, creamy curries, aromatic biryanis and oven-fresh breads",
      items: [
        { name: "Dal Makhani & Paneer Butter Masala", desc: "Slow-cooked black lentils simmered overnight with cream and butter" },
        { name: "Murgh Dum Biryani with Burani Raita", desc: "Fragrant long-grain basmati rice layered with marinated spiced chicken and saffron" },
        { name: "Assorted Butter Naans & Parathas", desc: "Fresh hot Indian breads straight from the tandoor" },
        { name: "Warm Gulab Jamun with Rabdi", desc: "Soft golden dumplings drenched in rose syrup and thickened cardamom milk" },
      ],
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80",
    },
    jain: {
      title: "Pure Veg & Jain Special Kitchen",
      subtitle: "Clean, separate cookware with zero onion, garlic or root vegetables",
      items: [
        { name: "Jain Paneer Lababdar", desc: "Rich cashew and fresh tomato gravy with soft paneer cubes" },
        { name: "Karela & Raw Banana Sabzi", desc: "Traditional home-cooked healthy vegetables seasoned with cumin and coriander" },
        { name: "Panchmel Dal Tadka", desc: "Wholesome 5-lentil blend tempered with pure cow ghee and hing" },
        { name: "Moong Dal Sheera / Halwa", desc: "Decadent roasted yellow lentils in desi ghee and roasted nuts" },
      ],
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
    },
  };

  const currentMenu = menuSections[activeMenuTab];

  return (
    <section id="dining" className="py-20 lg:py-28 bg-[#faf8f5] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
            <span>Farm-to-Table Gastronomy</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight">
            Culinary Indulgence at Suryavan
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Our private resident chefs prepare fresh, customized meals according to your dietary preferences, from piping-hot morning poha to sunset barbecue by the poolside.
          </p>
        </div>

        {/* Meal Package Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200 hover:border-amber-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                Plan 1: Room Only (EP)
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Self-Cook / Basic Stay
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Full access to the estate, with tea/coffee amenities. In-house kitchen can be engaged on an à la carte or grocery basis.
              </p>
              <ul className="space-y-1.5 text-xs text-stone-700 pt-2">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Complimentary tea & coffee station</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Kitchen refrigerator & microwave access</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-xs font-semibold text-stone-500">
              Standard base rate
            </div>
          </div>

          <div className="bg-gradient-to-b from-amber-500/10 to-white rounded-2xl p-6 shadow-xl border-2 border-amber-500 relative flex flex-col justify-between">
            <div className="absolute -top-3 right-4 bg-amber-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full shadow-sm">
              Most Popular
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md">
                Plan 2: All Meals Package (AP)
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                All-Inclusive Chef Specials
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Hassle-free gourmet package covering Breakfast, Lunch, Evening High Tea with snacks, and Dinner + Barbecue.
              </p>
              <ul className="space-y-1.5 text-xs text-stone-700 pt-2">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited home-cooked meals by private chef</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Both Veg, Non-Veg & Jain options prepared</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Live barbecue & bonfire evening snacks</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200 text-xs font-bold text-amber-900">
              ₹1,400 - ₹1,800 / person / day
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200 hover:border-amber-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                Plan 3: Custom Events & BBQ
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Bespoke Party Catering
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Tailored buffet setup for birthdays, pool sundowners, and large group gatherings with live tandoor and desserts.
              </p>
              <ul className="space-y-1.5 text-xs text-stone-700 pt-2">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Custom customized menu curation</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Poolside buffet and table setups</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-xs font-semibold text-stone-500">
              Custom quotation on inquiry
            </div>
          </div>
        </div>

        {/* Interactive Menu Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200">
          {/* Menu Category Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-5 mb-8">
            <button
              onClick={() => setActiveMenuTab("konkani")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeMenuTab === "konkani"
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-500" />
              <span>Konkani & Maharashtrian</span>
            </button>
            <button
              onClick={() => setActiveMenuTab("bbq")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeMenuTab === "bbq"
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Live BBQ & Tandoor</span>
            </button>
            <button
              onClick={() => setActiveMenuTab("north-indian")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeMenuTab === "north-indian"
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Coffee className="w-4 h-4 text-amber-500" />
              <span>North Indian & Biryanis</span>
            </button>
            <button
              onClick={() => setActiveMenuTab("jain")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeMenuTab === "jain"
                  ? "bg-[#1c1917] text-[#f5efe6] shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Pure Veg & Jain Special</span>
            </button>
          </div>

          {/* Active Menu Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {currentMenu.title}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  {currentMenu.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {currentMenu.items.map((item, idx) => (
                  <div key={idx} className="border-b border-stone-100 pb-3 last:border-0">
                    <div className="font-serif font-bold text-base text-stone-900 flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-amber-700 text-xs font-sans font-semibold">Chef Signature</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenConcierge("What is the full food menu and meal package options at Suryavan Villa?")}
                  className="px-4 py-2.5 rounded-xl border border-amber-600/40 text-amber-900 hover:bg-amber-50 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Customize with AI Concierge</span>
                </button>
                <a
                  href={`https://wa.me/${VILLA_CONTACT.whatsappNumber}?text=${encodeURIComponent("Hello Chef & Reservations Team at Suryavan Villa, I would like to inquire about food menu options for our upcoming stay.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chef Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100">
                <img
                  src={currentMenu.image}
                  alt={currentMenu.title}
                  className="w-full h-72 sm:h-80 object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
