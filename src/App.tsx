import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Award, 
  Cpu, 
  Globe, 
  Send, 
  Sparkles, 
  LogOut, 
  RefreshCw, 
  CheckCircle,
  HelpCircle,
  BarChart2,
  Lock,
  UserCheck
} from "lucide-react";

import { User, Trip, ItineraryOutput, RecommendationItem, BIAnalyticsData, TravelPreferences, Message } from "./types";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import AIChatInterface from "./components/AIChatInterface";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdminPanel from "./components/AdminPanel";
import AuthModal from "./components/AuthModal";

export default function App() {
  // Session Access State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authPresetEmail, setAuthPresetEmail] = useState<string>("");
  const [authPresetPassword, setAuthPresetPassword] = useState<string>("");

  // Navigations Tab Toggling
  const [activeTab, setActiveTab] = useState<"dashboard" | "chat" | "analytics" | "admin">("dashboard");

  // Database Memory Arrays synced from server
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [serverConfig, setServerConfig] = useState<{ hasApiKey: boolean; apiHost: string } | null>(null);

  // Chat Conversational States
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "model",
      text: `### Marhaban! Welcome to Zayed AI Assistant 🐪

I am your active Agentic AI Tourism Assistant, fully engineered for the **UAE Net Zero 2050** and the **Make it in the Emirates 2026** digital guidelines framework.

**How I can support your travel planning or economic research:**
1.  **Tailored Smart Itineraries:** Request your desired destination, timing or budget (e.g. *\"5-day high-end culture plan in Abu Dhabi\"*).
2.  **Cultural Etiquette Safekeeping:** Ask about dressing rules, dress requirements for mosque entrances or religious customs.
3.  **Real-Time Business Intel:** I feed digital parameters directly into your dynamic **BI Analytics Dashboard**.

*Let me know where to start!*`,
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  // Startup params and Analytics Configuration state
  const [startupIdea, setStartupIdea] = useState<string>("Boutique UAE Eco-Heritage Tourism Planner featuring localized SME partnerships for Make It in the Emirates");
  const [analyticsPrefs, setAnalyticsPrefs] = useState<TravelPreferences>({
    destination: "Abu Dhabi & Dubai, UAE",
    duration: "5 Days",
    budget: "Luxury",
    activities: ["Heritage & Islamic Culture", "Eco-Resorts"]
  });
  const [analyticsData, setAnalyticsData] = useState<BIAnalyticsData | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState<boolean>(false);

  // UI features

  // Check Server Status & Seed Data on mount
  useEffect(() => {
    fetch("/api/config/status")
      .then((res) => res.json())
      .then((data) => setServerConfig(data))
      .catch((err) => console.error("Error reading server state:", err));

    fetchRecommendations();
  }, []);

  // Sync Trips & BI Analytics once user is recognized logged-in
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTrips();
      handleFetchAnalytics();
    }
  }, [isAuthenticated, user, analyticsPrefs.destination, analyticsPrefs.budget, startupIdea]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("/api/recommendations");
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Failed to load recommendations DB:", err);
    }
  };

  const fetchTrips = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/trips?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setSavedTrips(data);
      }
    } catch (err) {
      console.error("Failed to load client saved trips:", err);
    }
  };

  const handleFetchAnalytics = async () => {
    setIsAnalyticsLoading(true);
    try {
      const response = await fetch("/api/analytics/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: analyticsPrefs.destination,
          startupIdea: startupIdea,
          segmentPreference: `${analyticsPrefs.budget} scope - ${analyticsPrefs.activities.join(", ")}`
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to compute forecasting metrics:", err);
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  const handleLoginSuccess = (loggedInUser: User, token: string) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    
    // Redirect Admin users immediately to the Admin controls dashboard
    if (loggedInUser.role === "Admin") {
      setActiveTab("admin");
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleSaveItinerary = async (itinerary: ItineraryOutput) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          destination: itinerary.destination,
          duration: itinerary.duration,
          budget: itinerary.budget,
          itinerary
        }),
      });

      if (res.ok) {
        // Re-fetch list
        fetchTrips();
        alert("Success! This trip plan has been saved to your 'Saved Itineraries' panel under Dashboard.");
      }
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    try {
      const res = await fetch(`/api/trips/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchTrips();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRecommendation = async (item: RecommendationItem) => {
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        fetchRecommendations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRecommendation = async (id: string) => {
    try {
      const res = await fetch(`/api/recommendations/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchRecommendations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Chat conversational handlers passed to inner chatbot
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isSending) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsSending(true);

    try {
      const chatPayloadHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatPayloadHistory,
          preferences: {
            destination: analyticsPrefs.destination,
            budget: analyticsPrefs.budget,
            duration: analyticsPrefs.duration,
            activities: analyticsPrefs.activities
          }
        })
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: "⚠️ **Server Caching Boundary Alert**: The model gateway experienced a timed refresh. Feel free to re-trigger current parameters.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const submitPreseededPrompt = (promptText: string) => {
    setActiveTab("chat");
    setChatInput(promptText);
    setTimeout(() => {
      // Direct auto submit trigger
      setIsSending(true);
      const userMsg: Message = {
        id: `usr-${Date.now()}`,
        role: "user",
        text: promptText,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, userMsg]);
      setChatInput("");

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
          preferences: {
            destination: analyticsPrefs.destination,
            budget: analyticsPrefs.budget
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Date.now()}`,
            role: "model",
            text: data.text,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      })
      .catch((_) => {
        console.error(_);
      })
      .finally(() => setIsSending(false));
    }, 150);
  };

  const toggleSidebarActivity = (act: string) => {
    setAnalyticsPrefs((prev) => {
      const exists = prev.activities.includes(act);
      if (exists) {
        return { ...prev, activities: prev.activities.filter((a) => a !== act) };
      } else {
        return { ...prev, activities: [...prev.activities, act] };
      }
    });
  };

  // LANDING PAGE TRIGGER WORKFLOWS
  const handleLandingGetStarted = () => {
    setAuthPresetEmail("student@gmail.com");
    setAuthPresetPassword("student123");
    setShowAuthModal(true);
  };

  const handleLandingAdminTeaser = () => {
    setAuthPresetEmail("admin@gmail.com");
    setAuthPresetPassword("admin123");
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans flex flex-col selection:bg-sky-500 selection:text-slate-900" id="main-scaffold">
      
      {/* Dynamic Cover Landing Screen or Primary Core App */}
      {!isAuthenticated ? (
        <div className="relative">
          <LandingPage 
            onGetStarted={handleLandingGetStarted} 
            onAdminTeaserClick={handleLandingAdminTeaser} 
          />

          {/* Login Auth Modal Popup wrapper screen overlay */}
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
              <div className="w-full max-w-md relative animate-fadeIn">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-white filter drop-shadow z-25 text-xs font-bold bg-[#1e293b] border border-slate-700 px-2 py-1 rounded"
                >
                  ✕ Close
                </button>
                <AuthModal 
                  onLoginSuccess={handleLoginSuccess}
                  presetEmail={authPresetEmail}
                  presetPassword={authPresetPassword}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CORE AUTHENTICATED SaaS INTERFACE PANEL ROUTING */
        <div className="min-h-screen flex flex-col animate-fadeIn">
          
          {/* Main Top Header Navbar */}
          <nav className="bg-[#1e293b]/95 border-b border-[#334155] px-6 py-3.5 flex items-center justify-between z-20 shrink-0" id="authenticated-navbar">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-2 font-black text-base tracking-tight text-[#38bdf8] cursor-pointer"
              >
                <span>◆</span> Zayed AI
                <span className="px-2 py-0.5 text-[8px] tracking-widest font-extrabold uppercase bg-sky-500 text-slate-950 rounded">
                  SaaS Launch
                </span>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Zayed AI Enterprise Portal</span>
              </div>
            </div>

            {/* Nav Menu Tab Toggles */}
            <div className="flex items-center gap-2 md:gap-4">
              
              <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-xl">
                {[
                  { id: "dashboard", label: "My Travel Hub" },
                  { id: "chat", label: "Zayed Chat AI" },
                  { id: "analytics", label: "BI Market Forecasts" },
                  ...(user?.role === "Admin" ? [{ id: "admin", label: "Admin Space" }] : []),
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? "bg-sky-500 text-[#0f172a] font-extrabold" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                <div className="text-right hidden sm:block">
                  <div className="font-bold text-slate-200 text-xs">{user?.name}</div>
                  <div className="text-[10px] text-pink-400 font-mono tracking-wider">{user?.role} Mode</div>
                </div>

                <div className="bg-[#334155] w-8 h-8 rounded-full border border-sky-500/50 flex items-center justify-center font-bold text-[#38bdf8] text-xs">
                  {user?.name.slice(0, 2).toUpperCase()}
                </div>

                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setUser(null);
                    setMessages([messages[0]]);
                  }}
                  title="Logout Session Safely"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-rose-450 hover:text-rose-400 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          </nav>

          {/* Primary Layout Columns holding Sidebar Drawer Parameters, and Main Views */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden" id="workspace-layout">
            
            {/* Left Parameters Drawer */}
            <aside className="lg:col-span-3 bg-[#0f172a] border-r border-[#334155] flex flex-col min-h-0 overflow-y-auto p-4 gap-4" id="sidebar-layout">
              <div>
                <div className="text-[10px] text-[#64748b] tracking-widest uppercase font-extrabold mb-2.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>SaaS Startup Parameters</span>
                </div>

                <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-3.5 space-y-3.5 shadow-inner">
                  <div>
                    <label className="block text-slate-450 text-[10px] font-bold uppercase mb-1">
                      Startup Enterprise Focus
                    </label>
                    <textarea
                      rows={2}
                      value={startupIdea}
                      onChange={(e) => setStartupIdea(e.target.value)}
                      className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-450 text-[10px] font-bold uppercase mb-1">
                        Emirate Focus
                      </label>
                      <select
                        value={analyticsPrefs.destination}
                        onChange={(e) => setAnalyticsPrefs({ ...analyticsPrefs, destination: e.target.value })}
                        className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer text-ellipsis"
                      >
                        <option value="Abu Dhabi & Dubai, UAE">Abu Dhabi & Dubai</option>
                        <option value="Abu Dhabi Saadiyat Corridor">Abu Dhabi (Saadiyat)</option>
                        <option value="Dubai Jumeirah District">Dubai (Jumeirah)</option>
                        <option value="Ras Al Khaimah Heights">Ras Al Khaimah</option>
                        <option value="Al Ain Heritage Oasis">Al Ain Green Oasis</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#94a3b8] text-[10px] font-bold uppercase mb-1">
                        Price Scope
                      </label>
                      <select
                        value={analyticsPrefs.budget}
                        onChange={(e) => setAnalyticsPrefs({ ...analyticsPrefs, budget: e.target.value as any })}
                        className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-slate-205 focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="Budget">Affordable Cultural</option>
                        <option value="Mid-Range">Premium Eco-Adventure</option>
                        <option value="Luxury">VIP Carbon-Neutral</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-slate-450 text-[10px] font-bold uppercase mb-1.5">
                      Targeted AI Capabilities
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        "Heritage & Islamic Culture",
                        "Eco-Resorts",
                        "Adventure Activities",
                        "Smart City Commerce",
                      ].map((act) => {
                        const isChecked = analyticsPrefs.activities.includes(act);
                        return (
                          <button
                            key={act}
                            type="button"
                            onClick={() => toggleSidebarActivity(act)}
                            className={`text-left p-1 rounded-lg border text-[9px] transition-all flex items-center gap-1 ${
                              isChecked 
                                ? "bg-sky-500/10 border-sky-500 text-sky-300" 
                                : "bg-[#020617] border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${isChecked ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'}`}></span>
                            <span className="truncate">{act}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handleFetchAnalytics}
                      disabled={isAnalyticsLoading}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-[#38bdf8] border border-[#38bdf8]/35 font-bold py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      {isAnalyticsLoading ? "Simulating Forecasting..." : "Recalculate BI Model"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Economic vision score tracker */}
              <div className="space-y-2">
                <div className="text-[10px] text-[#64748b] tracking-wider uppercase font-extrabold flex justify-between">
                  <span>UAE Strategy Match (CLO 1)</span>
                  <span className="text-[9px] text-amber-500 font-bold">5 Marks</span>
                </div>

                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-3.5 space-y-3.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#020617] p-2 rounded-lg text-center border border-slate-850">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">SME Velocity</div>
                      <div className="text-sm font-black text-sky-400 mt-1">
                        {analyticsData?.alignmentUAE?.makeItEmiratesScore || "85"}%
                      </div>
                    </div>

                    <div className="bg-[#020617] p-2 rounded-lg text-center border border-slate-850">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">AI 2031 Vision</div>
                      <div className="text-sm font-black text-rose-400 mt-1">
                        {analyticsData?.alignmentUAE?.aiVisionScore || "92"}%
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#020617] border border-slate-850 rounded text-[9.5px] text-slate-350 leading-relaxed">
                    <strong>Review:</strong> {analyticsData?.alignmentUAE?.analysisSummary || "Grounded UAE analytics matching 2026 economic guidelines and Saadiyat digital expansion."}
                  </div>
                </div>
              </div>

              {/* Environmental Carbon tracker */}
              <div className="bg-[#1e293b]/30 border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <span className="text-[8px] tracking-wider font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                  NET ZERO COP28 COMPLIANCE
                </span>
                <p className="text-[10px] text-slate-400 leading-normal pt-1 flex items-center justify-center gap-1">
                  ♻️ Carbon offsetting target: <strong className="text-slate-200">{analyticsData?.kpis?.carbonOffsetEstimateKg || "12,400"} kg CO₂</strong> saved.
                </p>
              </div>
            </aside>

            {/* Core Action Screen Viewport panels */}
            <main className="lg:col-span-9 bg-[#020617] flex flex-col min-h-0 overflow-y-auto" id="viewport-pane">
              
              {activeTab === "dashboard" && (
                <UserDashboard 
                  user={user}
                  savedTrips={savedTrips}
                  onDeleteTrip={handleDeleteTrip}
                  onSelectItinerary={(itin) => {
                    alert(`Now inspecting: ${itin.destination}\nDuration: ${itin.duration}\nBudget: ${itin.budget}`);
                    setActiveTab("chat");
                    setMessages(p => [
                      ...p,
                      {
                        id: `ins-${Date.now()}`,
                        role: "model",
                        text: `### 🗺️ Inspecting Itinerary Plan: ${itin.destination}
Here is the raw parsed breakdown of your saved trip:
*   **Accommodations:** ${itin.hotels.join(", ")}
*   **Cultural Spots:** ${itin.activities.join(", ")}
*   **Sustainable Sourcing Dining:** ${itin.restaurants.join(", ")}
*   **Transport Mode:** ${itin.transportation.join(", ")}

#### Suggested Timing Flow
${itin.daily_plan.map(d => `*   **Day ${d.day} (${d.title}):** ${d.events.join(" → ")}`).join("\n")}`,
                        timestamp: new Date().toLocaleTimeString()
                      }
                    ]);
                  }}
                  onTriggerNewChat={(p) => {
                    setActiveTab("chat");
                    submitPreseededPrompt(p);
                  }}
                />
              )}

              {activeTab === "chat" && (
                <AIChatInterface 
                  messages={messages}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  isSending={isSending}
                  onSendChat={handleSendChat}
                  onSubmitPreseededPrompt={submitPreseededPrompt}
                  analyticsPrefs={analyticsPrefs}
                  onSaveItinerary={handleSaveItinerary}
                />
              )}

              {activeTab === "analytics" && (
                <AnalyticsDashboard 
                  analyticsData={analyticsData}
                  onRefreshAnalytics={handleFetchAnalytics}
                  isAnalyticsLoading={isAnalyticsLoading}
                />
              )}

              {activeTab === "admin" && user?.role === "Admin" && (
                <AdminPanel 
                  recommendations={recommendations}
                  onAddRecommendation={handleAddRecommendation}
                  onDeleteRecommendation={handleDeleteRecommendation}
                />
              )}

            </main>

          </div>

        </div>
      )}

    </div>
  );
}
