import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageSquare,
  Phone
} from "lucide-react";
import { FAQS, VILLA_CONTACT } from "../data/villaData";

interface FAQSectionProps {
  onOpenConcierge: (prompt?: string) => void;
}

export default function FAQSection({ onOpenConcierge }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#faf8f5] text-stone-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Everything You Need To Know</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Find immediate answers regarding check-in timings, chef menus, pool guidelines, and booking policies for Suryavan Villa, Kadav.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-amber-600 text-white" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-4 bg-stone-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Have another question in mind?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Ask our 24/7 AI Concierge or connect directly with our villa manager on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onOpenConcierge("What are the cancellation and booking terms at Suryavan Villa?")}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-[#f5efe6] text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AI Guide</span>
            </button>
            <a
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
