import React, { useState } from "react";
import { Mail, Lock, User as UserIcon, Globe, MapPin, Sparkles, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { User } from "../types";

interface AuthModalProps {
  onLoginSuccess: (user: User, token: string) => void;
  onClose?: () => void;
  presetEmail?: string;
  presetPassword?: string;
}

export default function AuthModal({ onLoginSuccess, onClose, presetEmail = "", presetPassword = "" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "register" | "recover">("login");
  const [email, setEmail] = useState(presetEmail || "admin@gmail.com");
  const [password, setPassword] = useState(presetPassword || "admin123");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United Arab Emirates");
  const [role, setRole] = useState<"Tourist" | "Admin">("Tourist");
  const [preferences, setPreferences] = useState<string[]>(["Culture"]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Automatically fetch/extract capitalized name from email prefix before @ symbol
  React.useEffect(() => {
    if (email && email.includes("@")) {
      const prefix = email.split("@")[0];
      const parts = prefix.split(/[._-]/).filter(Boolean);
      const computedName = parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      setName(computedName || "");
    } else if (email) {
      // If there's no @ symbol yet, format the partial string
      const parts = email.split(/[._-]/).filter(Boolean);
      const computedName = parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      setName(computedName || "");
    } else {
      setName("");
    }
  }, [email]);

  const uaeEmirates = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ras Al Khaimah",
    "Fujairah",
    "Ajman",
    "Umm Al Quwain"
  ];

  const availablePrefs = [
    "Culture & Museums",
    "Luxury & Fine Dining",
    "Desert Safaris",
    "Eco-tourism & Nature",
    "Beach Resorts",
    "Theme Parks & Kids",
    "Traditional Souks"
  ];

  const handleTogglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter((p) => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setSuccess("Logged in successfully!");
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
      }, 500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          country,
          role,
          preferences,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Account registered successfully! Logging you in...");
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to register account.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Please input your email address first.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/recover-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setSuccess("A verification OTP code has been dispatched to your email address!");
      } else {
        throw new Error(data.error || "Failed to trigger recovery");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!otpCode || !newPassword) {
      setError("Please supply both the OTP and the new password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Password restored! You can now log in securely.");
        setView("login");
        setOtpSent(false);
        setPassword(newPassword);
      } else {
        throw new Error(data.error || "Recovery failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fastFill = (type: "traveler" | "admin") => {
    if (type === "traveler") {
      setEmail("student@gmail.com");
      setPassword("student123");
    } else {
      setEmail("admin@gmail.com");
      setPassword("admin123");
    }
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="w-full bg-[#1e293b] border-2 border-slate-700/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-slate-200">
      
      {/* Dynamic Sub-header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          {view === "login" ? "Zayed AI" : view === "register" ? "Create Traveler Account" : "Access Recovery Portal"}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {view === "login" 
            ? "Sign in to compile smart itineraries & explore business analytics" 
            : view === "register" 
            ? "Unlock personalized travel paths with real-time UAE suggestions" 
            : "Reset your administrative/traveler credential secure tokens"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-lg text-red-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-start gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {view === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Email Address / Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setView("recover")}
                className="text-[11px] text-sky-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-[#0f172a] font-extrabold py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>

          <div className="text-center text-xs text-slate-400 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setView("register")}
              className="text-sky-400 font-bold hover:underline"
            >
              Sign Up Instead
            </button>
          </div>

          <div className="border-t border-slate-800 my-5 pt-4">
            <span className="text-[10px] text-slate-500 block text-center uppercase font-bold mb-2">
              Fast-Fill Demo Accounts
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fastFill("traveler")}
                className="bg-slate-800 hover:bg-slate-700 hover:border-slate-500 border border-slate-700 text-slate-300 text-xs py-1.5 px-3 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                Tourist Mode
              </button>
              <button
                type="button"
                onClick={() => fastFill("admin")}
                className="bg-slate-800 hover:bg-slate-700 hover:border-slate-500 border border-slate-700 text-slate-300 text-xs py-1.5 px-3 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                Admin Mode
              </button>
            </div>
          </div>
        </form>
      )}

      {view === "register" && (
        <form onSubmit={handleRegister} className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Siddhartha Dhar"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Password (Min. 6 chars)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Your Origin Country
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United Kingdom"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Startup Role Access Limit
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="Tourist">Tourist User</option>
                <option value="Admin">Admin Operator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Personal Travel Preferences
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availablePrefs.map((pref) => {
                const checked = preferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handleTogglePreference(pref)}
                    className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                      checked 
                        ? "bg-sky-500/20 border-sky-400 text-sky-300"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-[#0f172a] font-extrabold py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account & Log In</span>
            )}
          </button>

          <div className="text-center text-xs text-slate-400 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setView("login")}
              className="text-sky-400 font-bold hover:underline"
            >
              Sign In Instead
            </button>
          </div>
        </form>
      )}

      {view === "recover" && (
        <form onSubmit={otpSent ? handleResetPassword : handleRecoverRequest} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
                placeholder="name@example.com"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500 disabled:opacity-55"
              />
            </div>
          </div>

          {otpSent && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  6-Digit OTP Code (Sent to your Email)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-amber-400">
                    OTP
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123456"
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-16 pr-4 text-sm text-white focus:outline-none focus:border-sky-500 font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Enter New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-extrabold py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{otpSent ? "Verify OTP & Reset Password" : "Send Recovery OTP Code"}</span>
            )}
          </button>

          <div className="text-center text-xs text-slate-400 mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setView("login");
                setOtpSent(false);
              }}
              className="text-sky-400 font-bold hover:underline"
            >
              ← Back to Login
            </button>
            {otpSent && (
              <button
                type="button"
                onClick={handleRecoverRequest}
                className="text-amber-400 hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>
        </form>
      )}

    </div>
  );
}
