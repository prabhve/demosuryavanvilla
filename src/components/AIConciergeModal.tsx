import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  Phone, 
  Compass, 
  Flame, 
  UtensilsCrossed, 
  MapPin,
  RefreshCw
} from "lucide-react";
import { VILLA_CONTACT } from "../data/villaData";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function AIConciergeModal({ isOpen, onClose, initialPrompt }: AIConciergeModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Namaste! I am your **Sahyadri AI Concierge** for **Suryavan Villa** in Kadav, Karjat. 

I can assist you with:
• **Custom Weekend Itineraries** (Sightseeing, pool time & bonfires)
• **Driving Routes & Transit** from Mumbai or Pune
• **Chef's Food Packages** (Authentic Konkani, Maharashtrian, Jain & Live BBQ)
• **Celebration & Event Planning** on our 15,000 sq. ft. private lawn

How may I make your upcoming stay memorable?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle initial prompt if passed
  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSendPrompt(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I am at your service! Feel free to ask about our suites, private pool, or local attractions in Kadav.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Welcome to Suryavan Villa! You can connect with our villa manager directly on WhatsApp or call **+91 98201 44552** for immediate bookings.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    "Plan a 2-day relaxing itinerary with pool & BBQ",
    "How to reach Suryavan Villa by car from Mumbai?",
    "Tell me about the authentic Konkani food menu",
    "What are the rates for 5-BHK private estate buyout?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#1a1715] border border-amber-500/40 rounded-3xl w-full max-w-2xl h-[90vh] sm:h-[680px] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#241f1a] to-[#1c1917] p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#1c1917] rounded-full flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="font-serif font-bold text-white text-base sm:text-lg flex items-center space-x-2">
                <span>Sahyadri AI Concierge</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono px-2 py-0.5 rounded-full font-normal">
                  Live Online
                </span>
              </div>
              <div className="text-xs text-amber-300 font-light">
                Digital Host for Suryavan Villa • Kadav, Karjat
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#141210]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-stone-800 border border-amber-500/40 text-amber-400"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium"
                    : "bg-[#221e1a] text-stone-200 border border-stone-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-stone-800 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#221e1a] border border-stone-800 rounded-2xl px-4 py-3 text-xs text-amber-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Sahyadri Concierge is curating your personalized guide...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#1c1917] border-t border-stone-800 flex gap-2 overflow-x-auto no-scrollbar">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(chip)}
              className="text-[11px] whitespace-nowrap bg-stone-900 hover:bg-stone-800 text-amber-200/90 border border-amber-500/20 px-3 py-1.5 rounded-full transition shrink-0 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar & Actions */}
        <div className="p-4 bg-[#1a1715] border-t border-stone-800 flex flex-col space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about itineraries, private pool rules, menus, directions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#12100e] border border-stone-700 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#d4af37] hover:bg-amber-400 text-black font-bold p-3 rounded-2xl transition disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Direct WhatsApp connect footer */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
            <span>Want to speak with the human villa host?</span>
            <a
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
