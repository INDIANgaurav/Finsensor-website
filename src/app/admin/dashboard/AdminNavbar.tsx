"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, MessageCircle, Mail, LogOut, Menu, X } from "lucide-react";

type NavItem = { label: string; icon: React.ReactNode; href: string; active?: boolean };

export default function AdminNavbar({ active }: { active: "dashboard" | "queries" | "updates" }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin-fs9x7k";
  };

  const navItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, href: "/admin/dashboard", active: active === "dashboard" },
    { label: "Queries", icon: <MessageCircle className="w-4 h-4" />, href: "/admin/dashboard/queries", active: active === "queries" },
    { label: "Send Update", icon: <Mail className="w-4 h-4" />, href: "/admin/dashboard/updates", active: active === "updates" },
  ];

  return (
    <>
      <div className="bg-[#0f172a] sticky top-0 z-50 border-b border-white/10 shadow-sm">
        <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-10 h-16">
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="font-extrabold text-[#e97944] text-[24px] sm:text-[28px]">FINSENSOR</span>
            <span className="font-extrabold text-white text-[24px] sm:text-[28px]">.AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              item.active ? (
                <div key={item.label} className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  {item.icon}{item.label}
                </div>
              ) : (
                <button key={item.label} onClick={() => router.push(item.href)}
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition font-medium">
                  {item.icon}{item.label}
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop logout */}
            <button onClick={() => setShowLogout(true)}
              className="hidden md:flex items-center gap-1.5 text-sm text-white/60 hover:text-red-400 transition font-medium">
              <LogOut className="w-4 h-4" />Logout
            </button>
            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/60 hover:text-white transition">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0f172a] px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => { router.push(item.href); setMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${item.active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                {item.icon}{item.label}
              </button>
            ))}
            <button onClick={() => { setMenuOpen(false); setShowLogout(true); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout modal */}
      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl p-6 w-80 mx-4">
            <h2 className="text-lg font-semibold text-white mb-1">Logout</h2>
            <p className="text-sm text-white/50 mb-5">Are you sure you want to logout from admin panel?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowLogout(false)}
                className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition">Cancel</button>
              <button onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
