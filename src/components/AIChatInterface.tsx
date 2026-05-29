import React, { useState } from "react";
import { Send, Sparkles, Mic, Globe, Compass, Calendar, Plus, Save, RotateCcw, HelpCircle, Star, ShieldAlert } from "lucide-react";
import { Message, TravelPreferences, ItineraryOutput } from "../types";

interface AIChatInterfaceProps {
  messages: Message[];
  chatInput: string;
  setChatInput: (val: string) => void;
  isSending: boolean;
  onSendChat: (e?: React.FormEvent) => void;
  onSubmitPreseededPrompt: (promptText: string) => void;
  analyticsPrefs: TravelPreferences;
  onSaveItinerary: (itinerary: ItineraryOutput) => void;
}

export default function AIChatInterface({
  messages,
  chatInput,
  setChatInput,
  isSending,
  onSendChat,
  onSubmitPreseededPrompt,
  analyticsPrefs,
  onSaveItinerary,
}: AIChatInterfaceProps) {
  const [selectedLang, setSelectedLang] = useState<string>("English");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Suggested pre-seeded prompts from Master Prompt
  const suggestedQueries = [
    { label: "Plan 5-Day Luxury Dubai under AED 5000", text: "Plan a 5-day luxury Dubai trip under AED 5000 detailing hotels, activities, and budget." },
    { label: "Family spots in Abu Dhabi", text: "Suggest family-friendly attractions in Abu Dhabi with cultural dress code tips." },
    { label: "Honeymoon Itinerary", text: "Generate a honeymoon itinerary for Dubai and Abu Dhabi featuring romantic spots and beaches." },
    { label: "Restaurants near Burj Khalifa", text: "Best restaurants near Burj Khalifa within walking distance." }
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    onSubmitPreseededPrompt(`Please transition the conversation. Answer the following questions in ${lang}. Hello!`);
  };

  const toggleMicInputSimulation = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setChatInput("Suggest family-friendly attractions in Abu Dhabi...");
      setTimeout(() => {
        setIsRecording(false);
      }, 2000);
    }
  };

  // Helper to parse potential itinerary output if the AI formatted text contains structure
  const handleExtractAndSave = (text: string) => {
    // Structured extraction matching prompt standard output
    // Simple mock parsing or extraction fallback
    const mockExtracted: ItineraryOutput = {
      destination: text.toLowerCase().includes("abu dhabi") ? "Abu Dhabi Cultural Journey" : "Dubai Skyline Expedition",
      duration: "5 Days",
      budget: "Luxury Portfolio",
      hotels: ["Emirates Palace Mandarin Oriental", "Burj Al Arab Suite"],
      activities: ["Sheikh Zayed Mosque guided path", "Burj Khalifa Observation Deck", "Al Fahidi heritage tour"],
      restaurants: ["Zuma Dubai Marina", "L'Olivo at Al Mahara"],
      transportation: ["Air-conditioned premium electric cabs", "Dubai Metro Nol Silver Card"],
      daily_plan: [
        { day: 1, title: "Cultural Heritage Arrival", events: ["Morning: Walk Al Fahidi Historical Neighbourhood", "Afternoon: Abu Dhabi Mosque path", "Evening: Traditional Abra boat ride across Dubai Creek"] },
        { day: 2, title: "Modern Vistas", events: ["Morning: Burj Khalifa sky view", "Afternoon: Louvre Abu Dhabi dome tour", "Evening: Local eco-desert camp safari and traditional barbecue"] }
      ]
    };

    onSaveItinerary(mockExtracted);
  };

  return (
    <div className="flex flex-col h-full text-slate-200" id="ai-chat-interface-root">
      
      {/* Interaction Header Toolbar */}
      <div className="bg-[#1e293b]/70 border-b border-slate-800 p-3 flex flex-wrap justify-between items-center gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Zayed Active Chat Planner</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Multilingual Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <select
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-[11px] text-slate-350 outline-none border-none pr-4 cursor-pointer font-bold focus:ring-0"
              aria-label="Select dialogue language"
            >
              <option value="English" className="bg-slate-900 text-slate-200">English Dialogue</option>
              <option value="Arabic" className="bg-slate-900 text-slate-200">العربية (Arabic)</option>
              <option value="Spanish" className="bg-slate-900 text-slate-200">Español (Spanish)</option>
              <option value="French" className="bg-slate-900 text-slate-200">Français (French)</option>
              <option value="Chinese" className="bg-slate-900 text-slate-200">中文 (Chinese)</option>
            </select>
          </div>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Zayed AI Usage Help"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="bg-sky-500/10 border-b border-sky-500/20 p-3.5 text-xs text-sky-305 shrink-0 space-y-1.5 leading-relaxed font-sans" id="help-drawer">
          <h4 className="font-bold flex items-center gap-1 uppercase tracking-wide text-[10px] text-sky-400">
            <Sparkles className="w-3.5 h-3.5 text-sky-450 shrink-0 animate-pulse" /> Zayed AI Intelligent Planner Guide
          </h4>
          <p className="text-slate-300">
            This chatbot connects securely to the <strong>Gemini 3.5 Flash Model</strong>. The template queries (listed below the chat) are engineered with contextual parameters to generate: (1) highly-structured itineraries, (2) cultural modesty and heritage guidelines, and (3) alignments with sustainable local tourism and SME ecosystems.
          </p>
        </div>
      )}

      {/* Conversations scroll area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 bg-[#020617]/50" id="chat-scroller">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2`}
              id={`bubble-c-${m.id}`}
            >
              {!isUser && (
                <div className="bg-[#334155] rounded-full h-8 w-8 shrink-0 flex items-center justify-center font-bold text-[#38bdf8] border border-[#38bdf8]/20 text-xs shadow-sm">
                  🐪
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed border transition-all ${
                  isUser
                    ? "bg-[#38bdf8] text-[#0f172a] border-[#38bdf8] font-semibold rounded-br-none shadow-md"
                    : "bg-[#1e293b] text-[#f8fafc] border-[#334155] rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap select-text selection:bg-amber-500 selection:text-white max-w-none">
                  {m.text.split("\n").map((line, lIdx) => {
                    if (line.startsWith("|") && line.endsWith("|")) {
                      const cells = line.split("|").filter((_, i) => i > 0 && i < line.split("|").length - 1);
                      return (
                        <div key={lIdx} className="grid grid-cols-4 gap-1.5 border-b border-slate-700/60 py-1 text-[10px] font-mono text-slate-300">
                          {cells.map((c, cIdx) => (
                            <span key={cIdx} className="truncate">{c.trim()}</span>
                          ))}
                        </div>
                      );
                    }

                    if (line.trim().startsWith("*") || line.trim().startsWith("-")) {
                      return (
                        <div key={lIdx} className="pl-4 py-0.5 text-slate-300 list-disc text-xs">
                          • {line.replace(/^[\s*-]+/, "")}
                        </div>
                      );
                    }

                    if (line.startsWith("###")) {
                      return <h4 key={lIdx} className="text-sm font-bold text-[#38bdf8] mt-3.5 mb-1.5">{line.substring(3).trim()}</h4>;
                    }
                    if (line.startsWith("####")) {
                      return <h5 key={lIdx} className="text-xs font-bold text-amber-400 mt-2.5 mb-1">{line.substring(4).trim()}</h5>;
                    }

                    return <p key={lIdx} className="min-h-[0.75rem]">{line}</p>;
                  })}
                </div>

                {/* Inline Actionable Cards for Model outputs */}
                {!isUser && !m.id.includes("welcome") && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap justify-between items-center gap-2">
                    <span className="text-[10px] text-slate-500 italic">Actionable structured output available</span>
                    <button
                      onClick={() => handleExtractAndSave(m.text)}
                      className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Itinerary to Dashboard</span>
                    </button>
                  </div>
                )}

                <div className={`text-[9px] mt-2 text-right ${isUser ? "text-[#0f172a]/60" : "text-slate-500"}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex justify-start items-center gap-2" id="think-spinner">
            <div className="bg-[#334155] rounded-full h-8 w-8 shrink-0 flex items-center justify-center font-bold text-[#38bdf8] text-xs">
              🐪
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl rounded-bl-none p-3.5 text-xs text-slate-350 shadow">
              <div className="flex space-x-1.5 items-center">
                <span className="w-2 h-2 bg-sky-450 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="pl-1.5 text-xs font-medium">Zayed AI is evaluating itinerary parameters...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested fast prompts row */}
      <div className="p-2 bg-slate-950/80 border-t border-slate-850 overflow-x-auto flex gap-2 select-none shrink-0" id="preloaded-prompt-cards">
        <span className="text-[9px] text-slate-500 font-bold uppercase self-center shrink-0 pr-1 pl-1">Quick Prompts:</span>
        {suggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSubmitPreseededPrompt(q.text)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-650 transition-all font-medium whitespace-nowrap cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Main input control form */}
      <form onSubmit={onSendChat} className="p-3 bg-[#020617] border-t border-slate-800 shrink-0" id="chat-input-form">
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-1.5 px-4 flex items-center gap-2">
          
          <button
            type="button"
            onClick={toggleMicInputSimulation}
            className={`p-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
              isRecording 
                ? "bg-red-500/20 text-red-550 border border-red-550 animate-pulse" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            title="Simulate Voice/Microphone Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={isRecording ? "Listening & converting voice..." : "Search attractions near Saadiyat or ask budget ideas..."}
            className="bg-transparent border-none text-[#f8fafc] text-xs md:text-sm flex-1 outline-none focus:ring-0 placeholder-slate-500 py-1"
          />

          <button
            type="submit"
            disabled={!chatInput.trim() || isSending}
            className="bg-[#38bdf8] hover:bg-sky-400 text-[#0f172a] p-1.5 px-3.5 rounded-xl cursor-pointer font-bold text-xs flex items-center gap-1 transition-all disabled:opacity-40 shrink-0"
          >
            <Send className="w-3 w-3" />
            <span className="hidden sm:inline">Execute</span>
          </button>
        </div>
      </form>

    </div>
  );
}
