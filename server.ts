import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with proper user agent
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Villa data definition
const SURYAVAN_VILLA_INFO = {
  name: "Suryavan Villa",
  tagline: "A Sanctuary of Royal Comfort in the Sahyadri Foothills",
  fullAddress: "32/2B/3, Tambas, Kadav, Karjat, Maharashtra 410201",
  pinCode: "410201",
  district: "Raigad",
  state: "Maharashtra",
  coordinates: {
    lat: 18.9492291,
    lng: 73.3754337,
  },
  contact: {
    phone: "+91 98201 44552",
    whatsapp: "+91 98201 44552",
    email: "stay@suryavanvilla.com",
    reservations: "+91 98201 44553",
  },
  timings: {
    checkIn: "01:00 PM",
    checkOut: "11:00 AM",
  },
  highlights: [
    "Private Crystal Clear Swimming Pool with Sunken Lounge",
    "Scenic Mountain Vistas of the Sahyadri Ranges",
    "Sprawling Manicured Celebration Lawns (up to 100 guests)",
    "Private In-House Chef for Authentic Konkani & Multi-Cuisine Dining",
    "Exclusive Full-Estate Buyout Available for Families & Corporate Retreats",
    "Open-Air Gazebo, Bonfire Pit & Star-Gazing Deck",
    "Air-Conditioned Luxury Suites with Attached Balconies",
    "Recreation Hub: Carrom, Pool Table, Table Tennis, Board Games",
    "High-Speed Wi-Fi & Power Backup for Workcations",
    "Pet-Friendly Environment with Prior Notice",
  ],
  accommodations: [
    {
      id: "estate-exclusive",
      name: "Grand Suryavan Private Estate (Exclusive 5-BHK Buyout)",
      type: "Full Villa & Estate",
      capacity: "12 - 25 Guests",
      bedrooms: "5 King Bedrooms + 6 Bathrooms",
      pricePerNight: 24999,
      weekendPrice: 32999,
      features: [
        "Exclusive use of the entire property & swimming pool",
        "Private gazebo, garden dining & barbecue pit",
        "Dedicated in-house chef and housekeeping team",
        "Spacious living room with 65-inch Smart TV & surround sound",
        "Large party lawn for private family gatherings",
      ],
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "sahyadri-royal-suite",
      name: "Sahyadri Royal Mountain View Suite",
      type: "Master Suite",
      capacity: "2 - 4 Guests",
      bedrooms: "1 King Suite with Panoramic Balcony",
      pricePerNight: 6499,
      weekendPrice: 7999,
      features: [
        "Private balcony overlooking mountain peaks",
        "Deep soaking bathtub and rain shower",
        "King posturepedic mattress with Egyptian cotton linens",
        "Tea/Coffee Maker & Mini Fridge",
      ],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "poolside-cabana-suite",
      name: "Poolside Panorama Cabana Suite",
      type: "Luxury Suite",
      capacity: "2 - 3 Guests",
      bedrooms: "1 King Suite with Pool Access",
      pricePerNight: 5999,
      weekendPrice: 7499,
      features: [
        "Direct walk-out access to the swimming pool deck",
        "Private sun loungers on timber deck",
        "En-suite luxury marble bathroom",
        "Smart 55-inch UHD TV with Netflix & OTT",
      ],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "garden-horizon-room",
      name: "Garden Horizon Deluxe Room",
      type: "Deluxe Room",
      capacity: "2 Guests",
      bedrooms: "1 Queen Bed with Garden Veranda",
      pricePerNight: 4499,
      weekendPrice: 5499,
      features: [
        "Private veranda opening into lush green lawns",
        "Organic garden views with fresh morning breeze",
        "Work desk with ultra-fast Wi-Fi",
        "Complimentary artisanal breakfast basket",
      ],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  nearbyAttractions: [
    {
      name: "Kadav Jain Temple (Shri Digambar Jain)",
      distance: "3.2 km",
      driveTime: "8 mins",
      description: "Historic tranquil temple known for its peaceful architecture and serene natural surroundings in Kadav village.",
    },
    {
      name: "ND's Film World / Studios",
      distance: "12 km",
      driveTime: "20 mins",
      description: "Massive cinematic theme park featuring iconic Bollywood movie sets, palace replicas, and entertainment shows.",
    },
    {
      name: "Kothaligad (Peth) Fort",
      distance: "15 km",
      driveTime: "30 mins",
      description: "Famous conical hill fortress featuring an internal carved staircase, offering breathtaking panoramic Western Ghats views.",
    },
    {
      name: "Bhivpuri Waterfalls & Lake",
      distance: "18 km",
      driveTime: "35 mins",
      description: "Spectacular cascade and peaceful lakeside during monsoon and post-monsoon months.",
    },
    {
      name: "Kondana Caves & Waterfalls",
      distance: "24 km",
      driveTime: "45 mins",
      description: "Ancient Buddhist rock-cut caves dating back to 1st century BC nestled inside dense Karjat forests.",
    },
    {
      name: "Morbe Dam & Reservoir",
      distance: "22 km",
      driveTime: "40 mins",
      description: "Serene scenic gravity dam supplying water to Navi Mumbai, surrounded by rolling green hills.",
    },
  ],
};

// API: Villa Details
app.get("/api/villa-info", (req, res) => {
  res.json({ success: true, data: SURYAVAN_VILLA_INFO });
});

// API: Weather in Kadav / Karjat
app.get("/api/weather", (req, res) => {
  // Returns realistic seasonal weather for Kadav / Karjat
  res.json({
    location: "Kadav, Karjat, Maharashtra",
    temperature: "27°C",
    condition: "Pleasant & Breezy",
    humidity: "62%",
    airQuality: "Pristine (AQI 38)",
    bestTimeForPool: "10:00 AM - 06:00 PM",
    sunsetTime: "06:38 PM",
  });
});

// API: Booking Inquiry / Instant Calculation
app.post("/api/inquiry", (req, res) => {
  const {
    guestName,
    phone,
    email,
    checkIn,
    checkOut,
    guestsCount,
    roomType,
    specialRequests,
    mealPlan,
  } = req.body;

  if (!guestName || !phone || !checkIn || !checkOut) {
    return res.status(400).json({
      success: false,
      error: "Please provide guest name, phone number, check-in, and check-out dates.",
    });
  }

  const bookingRef = `SV-${Date.now().toString().slice(-6)}`;
  
  // WhatsApp direct link generator for the guest
  const textMessage = `Hello Suryavan Villa Reservations! 
I would like to book a stay.
*Booking Reference:* ${bookingRef}
*Guest Name:* ${guestName}
*Phone:* ${phone}
*Check-in:* ${checkIn}
*Check-out:* ${checkOut}
*Guests:* ${guestsCount || "2"}
*Suite/Package:* ${roomType || "Grand Suryavan Estate"}
*Meal Plan:* ${mealPlan || "Custom In-House Chef"}
*Special Requests:* ${specialRequests || "None"}`;

  const whatsappUrl = `https://wa.me/919820144552?text=${encodeURIComponent(textMessage)}`;

  res.json({
    success: true,
    bookingRef,
    message: "Inquiry received successfully! Our villa manager will connect with you immediately.",
    whatsappUrl,
    details: {
      guestName,
      phone,
      email,
      checkIn,
      checkOut,
      guestsCount,
      roomType,
    },
  });
});

// API: AI Concierge & Itinerary Planner (Gemini powered with Real-time Estate Database Grounding)
app.post("/api/concierge", async (req, res) => {
  try {
    const { prompt, conversationHistory, liveEstateData } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    // Dynamically construct ground truth from live estate data if passed from frontend, otherwise default
    const villaSettings = liveEstateData?.villaSettings || SURYAVAN_VILLA_INFO;
    const accommodations = liveEstateData?.accommodations || SURYAVAN_VILLA_INFO.accommodations;
    const diningMenu = liveEstateData?.diningMenu || [];
    const mealPricing = liveEstateData?.mealPricing || { epPrice: 0, cpPrice: 450, apPrice: 1500 };
    const amenities = liveEstateData?.amenities || SURYAVAN_VILLA_INFO.highlights;
    const attractions = liveEstateData?.attractions || SURYAVAN_VILLA_INFO.nearbyAttractions;
    const customRules = liveEstateData?.villaSettings?.aiSystemPromptAddition || "";

    const accommodationsText = accommodations.map((a: any) => 
      `- ${a.name} (${a.type}): Weekday: ₹${a.pricePerNight}/night, Weekend: ₹${a.weekendPrice}/night. Capacity: ${a.capacity}. Bedrooms: ${a.bedrooms || a.bedroomsCount || "Standard"}. Features: ${(a.features || []).join(", ")}`
    ).join("\n");

    const diningText = diningMenu.length > 0 
      ? diningMenu.map((d: any) => `- ${d.name} (${d.category}, ${d.isVeg ? "Pure Veg" : "Non-Veg"}${d.isChefSpecial ? ", Chef Special" : ""}): ${d.description}`).join("\n")
      : "- Authentic Konkani Chicken & Fish Thali, Veg Village Specials, Puran Poli, Solkadhi, Live Poolside Barbecue.";

    const attractionsText = attractions.map((att: any) => 
      `- ${att.name || att.title} (${att.distance || "Nearby"}, ${att.driveTime || "short drive"}): ${att.description || ""}`
    ).join("\n");

    const systemInstruction = `You are "Sahyadri Concierge", the official luxury digital host and booking assistant for "Suryavan Villa", a private 5-BHK luxury nature estate in Kadav, Karjat, Maharashtra.

LIVE REAL-TIME VILLA KNOWLEDGE BASE:
- Estate Name: ${villaSettings.name || "Suryavan Villa"}
- Full Address: ${villaSettings.addressLine1 || "32/2B/3, Tambas"}, ${villaSettings.city || "Kadav, Karjat"}, Maharashtra ${villaSettings.postalCode || "410201"}
- Check-In: ${villaSettings.checkInTime || "01:00 PM"} | Check-Out: ${villaSettings.checkOutTime || "11:00 AM"}
- Phone: ${villaSettings.phone || "+91 98201 44552"} | WhatsApp: ${villaSettings.whatsappNumber || "+91 98201 44552"} | Email: ${villaSettings.email || "stay@suryavanvilla.com"}
- Direct UPI ID: ${villaSettings.upiId || "suryavanvilla@okhdfcbank"}

ACCOMMODATIONS & REAL-TIME RATES:
${accommodationsText}

MEAL PLANS & CHEF DINING:
- EP Plan (Room Only): ₹${mealPricing.epPrice}
- CP Plan (With Breakfast): ₹${mealPricing.cpPrice} per person/day
- AP Plan (All Meals Gourmet): ₹${mealPricing.apPrice} per person/day (Breakfast, Lunch, High Tea, Dinner)
Signature Dishes:
${diningText}

NEARBY ATTRACTIONS IN KADAV / KARJAT:
${attractionsText}

ESTATE POLICIES & FEATURES:
- 40-ft private filtered swimming pool with kids shallow deck and underwater lighting
- 100% Diesel Generator (DG Set) power backup with automatic switchover
- High-speed 300 Mbps fiber Wi-Fi throughout the villa
- 15,000 sq. ft. celebration lawn, open-air bonfire pit & poolside barbecue
- Games lounge: Carrom, Pool table, Table Tennis, Board games
- Music allowed outdoors until 10:00 PM, continues indoors after 10:00 PM
- Pet-friendly with prior notification

SPECIAL MANAGER DIRECTIVES & HOUSE RULES:
${customRules ? customRules : "Warmly welcome all guests with Maharashtrian hospitality. Guide them on driving routes and offer customized quotation breakdown."}

INSTRUCTIONS FOR GENERATING RESPONSES:
1. Always base all pricing, room names, and features on the live database above.
2. If the user asks for a price quote or availability, give the accurate weekday/weekend rate and calculate estimate including meal plans if requested.
3. If the user asks for an itinerary (1-day, 2-day, or 3-day weekend), create a bespoke, luxurious schedule combining pool relaxation, in-house Konkani meals, evening bonfire & barbecue, and excursions to Kadav Jain Temple or Kothaligad Fort.
4. If asked about driving routes: From Mumbai (~80 km, 1.5-2 hrs via Mumbai-Pune Expressway -> Shedung/Chowk exit -> Karjat -> Kadav); From Pune (~100 km, 2 hrs via Expressway -> Khalapur -> Karjat -> Kadav).
5. Always maintain a polite, polished, and hospitable tone. Keep formatting clean with bullet points and bold key details.`;

    if (!ai) {
      return res.json({
        reply: `Namaste and welcome to Suryavan Villa in Kadav, Karjat! 
We offer exclusive 5-BHK buyout and private suites with our 40-ft swimming pool, 15,000 sq. ft. celebration lawns, bonfire, and authentic Konkani meals prepared fresh by our private chef.

For direct reservations or instant inquiry assistance, please call or WhatsApp our manager directly at **${villaSettings.phone || "+91 98201 44552"}**.`,
      });
    }

    // Build contents for multi-turn chat
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(conversationHistory)) {
      conversationHistory.slice(-6).forEach((msg) => {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Welcome to Suryavan Villa! How can I assist you with your stay today?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Concierge API error:", error);
    res.status(500).json({
      error: "Unable to process concierge request",
      reply: "Welcome to Suryavan Villa! We're ready to host your dream getaway in Kadav, Karjat. You can reach our reservations desk directly at +91 98201 44552.",
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Suryavan Villa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
