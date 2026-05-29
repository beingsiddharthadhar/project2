import React from "react";
import { Compass, MapPin, TrendingUp, ShieldCheck, Heart, User, Sparkles, Building, BarChart2, Star, MessageSquare } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onAdminTeaserClick: () => void;
}

export default function LandingPage({ onGetStarted, onAdminTeaserClick }: LandingPageProps) {
  return (
    <div className="bg-[#020617] min-h-screen text-[#f8fafc] font-sans selection:bg-sky-500 selection:text-slate-900" id="landing-container">
      
      {/* Absolute floating glowing gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <header className="max-w-7xl mx-auto px-6 py-12 lg:py-20 text-center relative z-10" id="landing-hero">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-bold font-mono tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UAE SMART TOURISM & SUSTAINABILITY INITIATIVE</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Intelligent UAE Travel Planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Powered by Agentic AI</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Plan, structure, and refine custom itineraries across Abu Dhabi, Dubai, and beyond. Tailor-made recommendations for sustainable, culturally respectful, and memorable journeys.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/15"
          >
            <Compass className="w-4 h-4" />
            <span>Create Travel Itinerary</span>
          </button>
          
          <button
            onClick={onAdminTeaserClick}
            className="px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold transition-all text-sm flex items-center gap-2 cursor-pointer"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Tourism BI Analytics</span>
          </button>
        </div>
      </header>

      {/* Main Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10" id="landing-features">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white">Zayed AI Ecosystem</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Unlocking autonomous travel modeling & strategic startup parameters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-xl bg-sky-500/10 text-sky-450 border border-sky-500/20 mb-4 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Agentic Chat Planner</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Interact with localized travel prompt engines that build multi-day routes instantly, mapping safety codes, dress restrictions, and cultural timings automatically inside Abu Dhabi and Dubai.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider mt-4">Task 3 Generation Active</span>
          </div>

          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-xl bg-violet-500/10 text-violet-455 border border-violet-500/20 mb-4 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Responsible AI Safeguards</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Strict alignment with UAE Federal Decree-Law No. 45 on Personal Data Protection. Ensures tourist credentials and interaction logs are fully localized and isolated.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider mt-4">Task 2 Audits Standardized</span>
          </div>

          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 w-12 h-12 rounded-xl bg-amber-500/10 text-amber-455 border border-amber-500/20 mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Business Intelligence Suite</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Inputs variables directly into our SaaS analytical portal. Dynamically plots demand forecasts, carbon footprint ratings, and segmentations mirroring Make it in the Emirates goals.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mt-4">Task 4 Data Pipeline</span>
          </div>
        </div>
      </section>

      {/* UAE AI Tourism Banner */}
      <section className="max-w-6xl mx-auto px-6 py-8 relative z-10" id="landing-banner">
        <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-[#1e293b]/60 border border-sky-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="px-2.5 py-1 text-[9px] tracking-wider font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
              NATIONAL STRATEGIC COMPLIANCE
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Make it in the Emirates & UAE AI Strategy 2031 Framework</h3>
            <p className="text-xs text-slate-405 leading-relaxed">
              Every travel itinerary suggested by Zayed AI supports local businesses, traditional artisans, and sustainable eco-zones. We champion the localized digital infrastructure required for high-tech economic clusters.
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-2xl shrink-0 text-center w-full md:w-56 space-y-2">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated UAE SME Multiplier</span>
            <div className="text-3xl font-black text-amber-400">1.84x</div>
            <p className="text-[9px] text-slate-400">Domestic tourism spending velocity boost modeling</p>
          </div>
        </div>
      </section>

      {/* Smart Analytics Preview Box */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10" id="landing-preview">
        <div className="p-6 md:p-8 bg-[#0f172a] border border-slate-800 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                <BarChart2 className="w-5 h-5 text-sky-400" />
                <span>Smart Tourism Dashboard Preview (Pre-Seed Launch Mode)</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time parameters generated as you control target preferences</p>
            </div>
            <button
              onClick={onAdminTeaserClick}
              className="px-4 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-305 font-bold text-xs cursor-pointer flex items-center gap-1"
            >
              <span>Explore Admin Dashboard</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1e293b]/60 p-4 border border-[#334155]/60 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Weekly Active Bookings</span>
              <div className="text-lg font-extrabold text-slate-100 mt-1">42,850 Users</div>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5 block flex items-center gap-0.5">
                ▲ +14% this month
              </span>
            </div>

            <div className="bg-[#1e293b]/60 p-4 border border-[#334155]/60 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Avg Satisfaction Rate</span>
              <div className="text-lg font-extrabold text-white mt-1">4.89 / 5.00</div>
              <span className="text-[9px] text-sky-400 font-mono mt-0.5 block">98.2% positive sentiment matches</span>
            </div>

            <div className="bg-[#1e293b]/60 p-4 border border-[#334155]/60 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">SME Domestic Impact</span>
              <div className="text-lg font-extrabold text-amber-400 mt-1">AED 4.2M</div>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">Estimated tourist spend boost</span>
            </div>

            <div className="bg-[#1e293b]/60 p-4 border border-[#334155]/60 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Dynamic Caching Savings</span>
              <div className="text-lg font-extrabold text-emerald-400 mt-1">94.7% Less BW</div>
              <span className="text-[9px] text-emerald-300 font-mono mt-0.5 block">AI Semantic offline capability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10" id="landing-testimonials">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-white">Trust from UAE Smart Tourism Operators</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Feedback from localized digital business hubs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b]/30 p-6 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex gap-1.5 text-amber-450">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="italic text-xs text-slate-300 leading-normal">
              "We have deployed Zayed AI to assist our boutique hospitality groups in Dubai. The ability to automatically advise guests on modesty guidelines and mosques prayer times has completely automated cultural concierge challenges."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 text-sm">
                MK
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Maryam Al Ketbi</h4>
                <p className="text-[10px] text-slate-500">Director of Guest Experience, Heritage Boutique Hotels Dubai</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b]/30 p-6 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex gap-1.5 text-amber-450">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="italic text-xs text-slate-300 leading-normal">
              "As a tourist agency focusing on eco-routes, Zayed AI provided us with invaluable target preferences. Integrating carbon-offset metrics allows our customers to buy offsets immediately conforming with UAE Net Zero principles."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
                TH
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Tariq Al Hashemi</h4>
                <p className="text-[10px] text-slate-500">Founder, EcoVentures RAK</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="w-full text-center text-xs text-slate-500 mt-12 py-8 border-t border-slate-800/80 max-w-7xl mx-auto px-6">
        <p>© 2026 Zayed AI. All rights reserved.</p>
        <p className="mt-1">
          Zayed AI acts in direct correspondence with regional digital transformation goals.
        </p>
      </footer>

    </div>
  );
}
