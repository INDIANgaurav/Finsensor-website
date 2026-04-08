"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Mode = "login" | "signup";

export default function AdminAuthInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    if (key === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setAuthorized(true);
    }
  }, [searchParams]);

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

  if (!authorized) return <div className="min-h-screen bg-white" />;

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
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30" />
          </div>
          {mode === "signup" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-white/30" />
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
      </div>
    </div>
  );
}
