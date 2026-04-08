"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

type Mode = "login" | "signup";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user?.role === "admin") router.replace("/admin/dashboard"); })
      .catch(() => {});
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === "login" ? `/api/auth/login` : `/api/auth/signup`;
      const body = mode === "login"
        ? { email: form.email, password: form.password, role: "admin" }
        : { name: form.name, email: form.email, password: form.password, role: "admin" };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success(mode === "login" ? "Welcome, Admin!" : "Admin account created!");
      setTimeout(() => router.push("/admin/dashboard"), 800);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
        <div className="flex items-center justify-center mb-2">
          <span className="font-extrabold text-[#e97944] text-2xl">FINSENSOR</span>
          <span className="font-extrabold text-white text-2xl">.AI</span>
        </div>
        <p className="text-center text-xs text-white/40 mb-6 uppercase tracking-widest">Admin Portal</p>

        <h1 className="text-xl font-bold text-white text-center mb-1">
          {mode === "login" ? "Admin Sign In" : "Create Admin Account"}
        </h1>
        <p className="text-sm text-white/50 text-center mb-6">
          {mode === "login" ? "Restricted access" : "Admin registration"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Admin Name"
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="admin@finsensor.ai"
              className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {mode === "signup" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30 pr-10" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-5">
          {mode === "login" ? "Need an admin account? " : "Already have an account? "}
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-400 font-medium hover:underline">
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <div className="flex gap-2 mt-4">
          <button type="button" onClick={() => router.push("/")}
            className="flex-1 py-2 text-sm font-medium text-white/50 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition">
            ← Back to Home
          </button>
          <button type="button" onClick={() => router.push("/admin-fs9x7k/change-password")}
            className="flex-1 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
