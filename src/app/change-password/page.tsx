"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Password changed successfully!");
      setTimeout(() => router.push("/"), 1000);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="font-extrabold text-[#e97944] text-2xl">FINSENSOR</span>
          <span className="font-extrabold text-[#283c91] text-2xl">.AI</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Change Password</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Update your account password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              required placeholder="you@example.com"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Password</label>
            <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange}
              required placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Password</label>
            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange}
              required placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirm New Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              required placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          <Link href="/" className="text-blue-600 font-medium hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
