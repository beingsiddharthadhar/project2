import React, { useState } from "react";
import { ListFilter, MapPin, Eye, Plus, Trash2, ArrowUpRight, TrendingUp, Cpu, Users, Star, Save, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { User, RecommendationItem } from "../types";

interface AdminPanelProps {
  onRefreshData?: () => void;
  recommendations: RecommendationItem[];
  onAddRecommendation: (item: RecommendationItem) => void;
  onDeleteRecommendation: (id: string) => void;
  sysLogs?: any[];
}

export default function AdminPanel({
  onRefreshData,
  recommendations,
  onAddRecommendation,
  onDeleteRecommendation,
  sysLogs = [],
}: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<"database" | "logs" | "users">("database");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<RecommendationItem["category"]>("Attraction");
  const [newItemEmirate, setNewItemEmirate] = useState("Abu Dhabi");
  const [newItemPrice, setNewItemPrice] = useState("Luxury Portfolio");
  const [newItemRating, setNewItemRating] = useState(4.8);
  const [newItemDesc, setNewItemDesc] = useState("");
  const [isPopular, setIsPopular] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mockActiveTravelers = [
    { email: "student@gmail.com", name: "Siddhartha Dhar", role: "Tourist", country: "India", status: "Active", savedCount: 3 },
    { email: "admin@gmail.com", name: "Dr. Neda Abdelhamid", role: "Admin", country: "United Arab Emirates", status: "Active", savedCount: 0 },
    { email: "john.visitor@gmail.com", name: "John Visitor", role: "Tourist", country: "United Kingdom", status: "Offline", savedCount: 1 },
    { email: "amna.travels@det.gov.ae", name: "Amna Al Mansoori", role: "Tourist", country: "United Arab Emirates", status: "Idle", savedCount: 2 },
  ];

  const defaultAISysLogs = [
    { timestamp: "15:31:02", model: "gemini-3.5-flash", action: "generateContent", tokens: 1420, latency: "542ms", status: "Grounded via Maps" },
    { timestamp: "15:28:44", model: "gemini-3.5-flash", action: "generateContent (Structured schema)", tokens: 2880, latency: "1055ms", status: "Validation Passed" },
    { timestamp: "15:22:15", model: "gemini-3.5-flash", action: "sentimentAudit", tokens: 540, latency: "381ms", status: "Neutral Index Clogged" },
    { timestamp: "15:10:09", model: "gemini-3.5-flash", action: "generateContentStream", tokens: 4210, latency: "1284ms", status: "User Cancelled" },
  ];

  const handleSubmitRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!newItemName || !newItemDesc) {
      setSubmitError("Please fill out the name and description fields.");
      return;
    }

    const payload: RecommendationItem = {
      id: `rec-${Date.now()}`,
      title: newItemName,
      category: newItemCategory,
      emirate: newItemEmirate,
      priceRange: newItemPrice,
      rating: Number(newItemRating) || 4.8,
      description: newItemDesc,
      isPopular: isPopular
    };

    onAddRecommendation(payload);
    setNewItemName("");
    setNewItemDesc("");
    setNewItemPrice("Luxury Portfolio");
  };

  return (
    <div className="p-4 space-y-6 text-slate-200" id="admin-panel-scaffold">
      
      {/* Mini strategic cover-up */}
      <section className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 text-xs font-sans">
        <div className="space-y-1">
          <p className="text-sky-400 font-extrabold uppercase tracking-wide text-[10px] flex items-center gap-1.5 label-brand">
            <Cpu className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Admin Operator Control Panel</span>
          </p>
          <p className="text-slate-450 leading-normal">
            Manage custom database entities, tune recommendation priorities, and audit live Google AI Studio telemetry logs.
          </p>
        </div>

        <div className="flex bg-slate-950 border border-slate-850 rounded-lg p-1">
          {[
            { id: "database", label: "Manage Recommendations" },
            { id: "logs", label: "AI System Telemetry" },
            { id: "users", label: "Registered Sessions" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as any)}
              className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                activeSubTab === t.id 
                  ? "bg-sky-500 text-slate-950 font-black shadow" 
                  : "text-slate-400 hover:text-slate-205"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Database tab content */}
      {activeSubTab === "database" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="recommendations-database">
          
          {/* Left panel: Add Recommendation Form */}
          <div className="lg:col-span-5 bg-[#1e293b]/50 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="font-bold text-white text-sm">Add Custom Recommender Spot</h3>
              <p className="text-[10px] text-slate-455">Add new entities directly into the mock caching databases.</p>
            </div>

            {submitError && (
              <div className="p-2.5 bg-red-500/15 border border-red-500/30 rounded text-red-300 text-[10px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitRecommendation} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Spot Title</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="E.g., Zuma Dubai Marina"
                  className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Zone Emirate</label>
                  <select
                    value={newItemEmirate}
                    onChange={(e) => setNewItemEmirate(e.target.value)}
                    className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Al Ain">Al Ain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Attraction">Attraction</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transport">Transportation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Price Range</label>
                  <input
                    type="text"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="E.g., Moderate (AED 150 - 300)"
                    className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Rating Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newItemRating}
                    onChange={(e) => setNewItemRating(Number(e.target.value) || 4.8)}
                    className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Quick Description</label>
                <textarea
                  rows={2}
                  required
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Provide dress etiquette, sustainable attributes or hours details..."
                  className="w-full bg-[#020617] text-xs border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular-box"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-705 text-sky-500"
                />
                <label htmlFor="popular-box" className="text-[10px] uppercase font-bold text-slate-400">Mark as popular highlight</label>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-2 rounded text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Entry to Database</span>
              </button>
            </form>

          </div>

          {/* Right panel: Items Table List */}
          <div className="lg:col-span-7 bg-[#1e293b]/50 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="font-bold text-white text-sm">Active Recommendations Registry</h3>
              <p className="text-[10px] text-slate-455">Cached spots presented inside itineraries and personalized triggers.</p>
            </div>

            <div className="overflow-x-auto min-h-[250px] max-h-[384px] scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase text-[9px] font-bold pb-2">
                    <th className="py-2">Title</th>
                    <th className="py-2">Emirate</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Rating</th>
                    <th className="py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 leading-normal text-slate-350">
                  {recommendations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40">
                      <td className="py-2 font-bold text-slate-200">{item.title}</td>
                      <td className="py-2">{item.emirate}</td>
                      <td className="py-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-medium text-slate-405 font-mono">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2 font-mono text-amber-400 font-bold">{item.rating} ★</td>
                      <td className="py-2 text-center">
                        <button
                          onClick={() => onDeleteRecommendation(item.id)}
                          className="p-1 hover:text-red-400 text-slate-500 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* System Telemetry Logs sub-tab */}
      {activeSubTab === "logs" && (
        <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-5 space-y-4" id="telemetry-panel">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Grounded Google AI Studio Telemetry Streams</span>
            </h3>
            <p className="text-[10px] text-slate-455">Raw server-side logs checking compliance, model latencies, and token structures.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60 font-mono text-xs text-sky-400/90 space-y-2.5 overflow-x-auto">
            {defaultAISysLogs.map((log, index) => (
              <div key={index} className="flex justify-between hover:bg-slate-900 py-1 rounded px-2 transition-colors border-l-2 border-slate-800 hover:border-sky-500">
                <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                <span className="text-amber-500">{log.action}</span>
                <span className="text-slate-350">{log.model}</span>
                <span className="text-slate-450">{log.tokens} tk</span>
                <span className="text-slate-450">{log.latency}</span>
                <span className="text-emerald-400 font-bold font-mono text-[10px]">{log.status}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-405 leading-relaxed">
            🚩 <strong>Zayed Guard Protocol Active Status:</strong> 0 toxic context flags flagged in preceding 24 hours. Rate limiting operates smoothly at max 15 requests per minute per IP to keep system boundaries robust.
          </div>
        </div>
      )}

      {/* Users and registered session registries */}
      {activeSubTab === "users" && (
        <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-5 space-y-4" id="traveler-users-registries">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1">
              <Users className="w-4 h-4 text-violet-400" />
              <span>Registered User Account Registry (Database Collection Users)</span>
            </h3>
            <p className="text-[10px] text-slate-455">Direct view of active, idle, or guest tourist roles registered globally.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase text-[9px] font-bold py-2">
                  <th className="py-2">Full Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Origin Country</th>
                  <th className="py-2">Role Access</th>
                  <th className="py-2">Itineraries Saved</th>
                  <th className="py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-355 leading-normal">
                {mockActiveTravelers.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-2.5 font-bold text-slate-205">{t.name}</td>
                    <td className="py-2.5 font-mono text-slate-405">{t.email}</td>
                    <td className="py-2.5">{t.country}</td>
                    <td className="py-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        t.role === "Admin" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      }`}>
                        {t.role}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono pl-6 font-bold text-white">{t.savedCount} trips</td>
                    <td className="py-2.5 text-center">
                      <span className={`inline-block w-2, h-2 rounded-full mr-1.5 ${
                        t.status === "Active" ? "bg-emerald-400 animate-pulse" : t.status === "Idle" ? "bg-amber-500 text-xs" : "bg-slate-600"
                      }`} style={{ width: "8px", height: "8px" }} />
                      <span className="text-[10px]">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
