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

// API: AI Concierge & Itinerary Planner (Gemini powered)
app.post("/api/concierge", async (req, res) => {
  try {
    const { prompt, conversationHistory } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Sahyadri Concierge", the gracious, highly knowledgeable digital host & guest assistant for "Suryavan Villa", a luxury private villa resort located at 32/2B/3, Tambas, Kadav, Karjat, Maharashtra 410201.

Key facts about Suryavan Villa:
- Location: Tambas village in Kadav, near Karjat, Raigad district, Maharashtra. Easy drive from Mumbai (~80km / 1.5-2 hrs) and Pune (~100km / 2 hrs). Nearest railway station is Karjat Station (12km).
- Features: Private crystal clear pool, 5 luxurious AC bedrooms, grand living hall, private lawn (for intimate events, sundowners, birthdays up to 100 people), gazebo with bonfire and BBQ, in-house dedicated chef preparing authentic Konkani/Maharashtrian, North Indian, Jain, and Continental cuisines.
- Check-in: 1:00 PM | Check-out: 11:00 AM.
- Pets: Pet-friendly upon prior request.
- Local sights: Kadav Jain Temple (3 km), ND Studios (12 km), Kothaligad/Peth Fort (15 km), Bhivpuri Waterfalls (18 km), Kondana Caves (24 km), Morbe Dam (22 km).
- Phone & WhatsApp: +91 98201 44552 | Email: stay@suryavanvilla.com.

Guidelines for your response:
1. Speak with hospitality warmth, elegance, and enthusiasm.
2. If asked for itineraries (e.g. 1-day, 2-day, weekend plan), design a custom, relaxed schedule featuring pool time, outdoor barbecue, bonfire under the stars, farm-to-table food at Suryavan Villa, and optional nearby visits like Kothaligad or ND Studios.
3. If asked for driving routes from Mumbai or Pune, provide clear highway instructions (e.g. Mumbai -> Mumbai-Pune Expressway -> Shedung/Chowk exit -> Karjat -> Kadav -> Tambas).
4. If asked about prices, provide the indicative rates (e.g. ₹24,999/night for full 5-BHK estate buyout on weekdays, ₹32,999 on weekends, individual suites starting ₹4,499) and offer direct booking via WhatsApp or the booking form on the page.
5. Keep formatting clean with bullet points and bold highlights.`;

    if (!ai) {
      // Fallback if no API key is set yet
      return res.json({
        reply: `Namaste and welcome to Suryavan Villa! Located in serene Kadav, Karjat, our luxury villa offers a private pool, lush green lawns, bonfire nights, and delicious home-cooked meals by our in-house chef. 

To visit us from Mumbai or Pune, take the Expressway to Karjat and head towards Kadav (Tambas). For reservations or personalized arrangements, call or WhatsApp our manager at **+91 98201 44552**!`,
      });
    }

    // Build contents for multi-turn chat if history is provided
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
      model: "gemini-3.8-flash",
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
