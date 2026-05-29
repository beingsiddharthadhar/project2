import React, { useState } from "react";
import { Compass, Calendar, Search, MapPin, DollarSign, CloudSun, Trash2, Heart, ShieldAlert, Sparkles, Plus, Eye, Share2 } from "lucide-react";
import { User, Trip, ItineraryOutput } from "../types";

interface UserDashboardProps {
  user: User;
  savedTrips: Trip[];
  onDeleteTrip: (id: string) => void;
  onSelectItinerary: (itinerary: ItineraryOutput) => void;
  onTriggerNewChat: (prompt: string) => void;
}

export default function UserDashboard({ user, savedTrips, onDeleteTrip, onSelectItinerary, onTriggerNewChat }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"trips" | "favorites" | "budget">("trips");
  const [budgetAllocation, setBudgetAllocation] = useState({
    lodging: 2200,
    activities: 1200,
    dining: 1000,
    transport: 600,
  });

  const weatherStates = [
    { city: "Abu Dhabi", temp: "34°C", condition: "Sunny & Gentle Wind", UVIndex: "Very High", recommendations: "Hydrate, wear modest linen coverings" },
    { city: "Dubai", temp: "35°C", condition: "Clear & Calm", UVIndex: "Extreme", recommendations: "Sunglasses, avoid peak afternoon sun hikes" },
    { city: "Ras Al Khaimah", temp: "31°C", condition: "Breezy near Jebel Jais", UVIndex: "Very High", recommendations: "Excellent evening mountain walking" },
    { city: "Al Ain", temp: "38°C", condition: "Dry Heat & Oasis Shade", UVIndex: "Extreme", recommendations: "Spend midday exploring date palm oases" },
  ];

  const defaultSuggestedDestinations = [
    {
      id: "shk-mosque",
      title: "Sheikh Zayed Grand Mosque",
      city: "Abu Dhabi",
      category: "Islamic Culture",
      image: "🕌",
      etiquette: "Modest dress required. Women should wear full-length abayas. Photography permitted.",
      suggestedPrompt: "Create a 1-day itinerary focused on Sheikh Zayed Grand Mosque and cultural landmarks in Abu Dhabi."
    },
    {
      id: "burj-kh",
      title: "Burj Khalifa & Fountain Marvel",
      city: "Dubai",
      category: "Modern Landmarks",
      image: "🏙️",
      etiquette: "Smart casual wear is ideal. Advance ticket booking highly recommended for sunset viewings.",
      suggestedPrompt: "Plan a luxury afternoon trip centering near Burj Khalifa with restaurant reservations."
    },
    {
      id: "al-fahidi",
      title: "Al Fahidi Historical Quarter",
      city: "Dubai",
      category: "Heritage Historical",
      image: "🛕",
      etiquette: "Moderate walking involved. Respect local Windtower residential zones.",
      suggestedPrompt: "Suggest budget family options near Al Fahidi heritage quarters and Dubai Creek."
    },
    {
      id: "jebel-jais",
      title: "Jebel Sledder & Flight",
      city: "Ras Al Khaimah",
      category: "Adventure Nature",
      image: "⛰️",
      etiquette: "Sportswear suggested. Expect cooler mountain breezes.",
      suggestedPrompt: "Give me a 2-day outdoor adventure in Ras Al Khaimah including Jebel Jais flight."
    }
  ];

  const totalBudgetSpent = budgetAllocation.lodging + budgetAllocation.activities + budgetAllocation.dining + budgetAllocation.transport;

  return (
    <div className="p-4 space-y-6 text-slate-200" id="tourist-dashboard">
      
      {/* Personalized Greeting Banner */}
      <section className="bg-gradient-to-r from-sky-950/40 to-slate-900 border border-sky-400/20 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <p className="text-[10px] tracking-widest font-black uppercase text-emerald-400">SESSION IDENTIFIED ACTIVE</p>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">Marhaban, {user.name}! 🐪</h2>
          <p className="text-xs text-slate-400">
            Welcome to your premium Zayed AI dashboard. Your travel registry country: <strong className="text-slate-300">{user.country}</strong>.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onTriggerNewChat("Create a comprehensive 3-day luxury itinerary for my family focusing on sustainable cultural landmarks.")}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Dynamic Trip</span>
          </button>
        </div>
      </section>

      {/* Main Grid: Weather and Saved Trips / Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Tabs for Trips/Favorites/Budget */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex border-b border-slate-850 gap-2">
            {[
              { id: "trips", label: "My Saved Itineraries" },
              { id: "favorites", label: "Target Attractions" },
              { id: "budget", label: "Budget Allocation Tracker" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id 
                    ? "border-sky-500 text-sky-450 font-black" 
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: Trips */}
          {activeTab === "trips" && (
            <div className="space-y-4">
              {savedTrips.length === 0 ? (
                <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-8 text-center space-y-3">
                  <div className="text-3xl">🧳</div>
                  <h3 className="font-bold text-white text-sm">No Itineraries Registered Yet</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    You can ask Zayed AI Assistant in the Chat tab to generate custom travel plans. Saving those plans will log them instantly into this panel!
                  </p>
                  <button
                    onClick={() => onTriggerNewChat("Plan a 5-day cultural trip to Abu Dhabi")}
                    className="mt-2 text-xs bg-sky-500/10 hover:bg-sky-400/20 text-sky-400 border border-sky-500/20 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Ask Zayed AI
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedTrips.map((trip) => (
                    <div key={trip.id} className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded uppercase">
                            {trip.budget} Flight
                          </span>
                          <button
                            onClick={() => onDeleteTrip(trip.id)}
                            className="p-1 hover:text-red-400 hover:bg-slate-800 rounded transition-colors text-slate-500"
                            title="Delete Saved Trip"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{trip.destination}</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Duration: {trip.duration}</p>
                        
                        <div className="mt-3 bg-slate-900/60 p-2.5 rounded border border-slate-850 text-[11px] text-slate-350 line-clamp-3 leading-normal">
                          {trip.itinerary?.daily_plan?.[0]?.events?.[0] || "Structured timeline outline ready to explore."}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/60 flex gap-2">
                        <button
                          onClick={() => onSelectItinerary(trip.itinerary)}
                          className="flex-1 py-1 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-350 hover:text-white border border-sky-500/20 text-xs rounded transition-all cursor-pointer font-bold flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect Plan</span>
                        </button>
                        
                        <button
                          onClick={() => alert(`Sharing itinerary code: ${trip.id}\nSuccessfully dispatched!`)}
                          className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 border border-slate-700 transition-all text-xs cursor-pointer"
                          title="Share Link"
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: Favorites */}
          {activeTab === "favorites" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {defaultSuggestedDestinations.map((dest) => (
                <div key={dest.id} className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-705 transition-all">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xl">{dest.image}</span>
                      <span className="px-2 py-0.5 text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold rounded uppercase">
                        {dest.category}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{dest.title}</h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>{dest.city}</span>
                    </p>
                    
                    <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/40 text-[10px] text-slate-300 leading-normal">
                      <strong>Etiquette Note:</strong> {dest.etiquette}
                    </div>
                  </div>

                  <button
                    onClick={() => onTriggerNewChat(dest.suggestedPrompt)}
                    className="w-full py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded text-xs transition-colors font-bold cursor-pointer"
                  >
                    Auto-Generate Itinerary
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: Budget */}
          {activeTab === "budget" && (
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-5 space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Interactive Budget Tracker</h4>
                  <p className="text-[10px] text-slate-400">Keep estimates updated inline to align with travel goals</p>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Estimated Spent</div>
                  <div className="text-lg font-black text-amber-400 font-mono">AED {totalBudgetSpent}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "lodging", label: "Abu Dhabi/Dubai Lodging (AED)", desc: "5-Star Resorts or Boutique SME rooms" },
                  { key: "activities", label: "Activities & Heritage Entries (AED)", desc: "Louvre tokens, safaris, guided routes" },
                  { key: "dining", label: "Dining & Culinary Spending (AED)", desc: "Fine dining Downtown or souk cafés" },
                  { key: "transport", label: "Airport/Local Abrah Car Transport (AED)", desc: "Air-conditioned premium electric cabs" },
                ].map((input) => (
                  <div key={input.key} className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-400">
                      {input.label}
                    </label>
                    <input
                      type="number"
                      value={budgetAllocation[input.key as keyof typeof budgetAllocation]}
                      onChange={(e) => setBudgetAllocation({
                        ...budgetAllocation,
                        [input.key]: Number(e.target.value) || 0
                      })}
                      className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-sky-500 font-mono font-bold"
                    />
                    <span className="text-[9px] text-slate-500 block">{input.desc}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] leading-relaxed text-emerald-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>
                  <strong>Tip:</strong> You have allocated roughly <strong className="font-mono">AED {budgetAllocation.activities}</strong> on domestic recreational businesses and SME entries. This strengthens localized multiplier velocities aligning with <strong>UAE Economic Vision</strong> parameters!
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right column: Weather Widgets & Alert Logs */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Weather Widget */}
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
              <CloudSun className="w-4 h-4 text-sky-400" />
              <span>UAE Smart Weather Updates</span>
            </h4>
            
            <div className="space-y-3">
              {weatherStates.map((w, index) => (
                <div key={index} className="bg-slate-950/60 p-3 rounded-xl border border-slate-850/60 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-xs">{w.city}</div>
                    <div className="text-[9px] text-slate-505 mt-0.5">{w.condition} | UV: <span className="text-amber-400">{w.UVIndex}</span></div>
                    <p className="text-[9px] text-slate-400 leading-normal italic mt-1 font-mono">⚠️ {w.recommendations}</p>
                  </div>
                  <div className="text-lg font-black text-sky-400 font-mono shrink-0 pl-2">{w.temp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Code of Ethics Advisory */}
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Cultural Respect Advisory</span>
            </h4>
            
            <div className="text-[10px] space-y-2 text-slate-350 leading-relaxed">
              <p>
                As a traveler in the UAE, following custom guidelines is beautiful and respectful. Ensure shoulders and knees are covered when traveling through modern community centers or local markets.
              </p>
              <p className="bg-slate-900/60 p-2 rounded border border-slate-800/40 font-mono text-[9px] text-slate-405">
                🔒 <strong>Zayed Safe Protocols:</strong> Our Agentic AI reviews recommended spots automatically against federal heritage dress directives.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
