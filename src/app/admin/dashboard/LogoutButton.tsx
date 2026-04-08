"use client";
import React, { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin-fs9x7k";
  };

  return (
    <>
      <button onClick={() => setShow(true)}
        className="flex items-center gap-1.5 text-sm text-white/60 hover:text-red-400 transition font-medium">
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl p-6 w-80 mx-4">
            <h2 className="text-lg font-semibold text-white mb-1">Logout</h2>
            <p className="text-sm text-white/50 mb-5">Are you sure you want to logout from admin panel?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShow(false)}
                className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
