"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuAlignJustify } from "react-icons/lu";
import Link from "next/link";
import { toast } from "sonner";

const ActionButtons = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#user-menu-wrapper")) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const toggleProductMenu = () => setIsProductMenuOpen(!isProductMenuOpen);

  return (
    <div className="flex place-items-center">
      <div className="md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger onClick={() => setSheetOpen(true)}>
            <LuAlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col space-y-3 items-start w-full text-lg text-black mt-10">
                  <Link href={"/"} className="w-full text-left py-2 px-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none flex justify-between">
                    Home
                  </Link>
                  <div className="w-full">
                    <button onClick={toggleProductMenu} className="w-full text-left py-2 px-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none flex justify-between">
                      <span>Products</span>
                      <span className="text-sm pt-1">{isProductMenuOpen ? "▲" : "▼"}</span>
                    </button>
                    {isProductMenuOpen && (
                      <div className="ml-4 mt-2 flex flex-col space-y-2 bg-gray-50 p-2 rounded-md shadow-inner">
                        <Link href={"/Product/finsoeasy360"} className="text-left text-[17px]">FinSoEasy360</Link>
                        <Link href={"/Product/lease-tool"} className="text-left text-[17px]">LAMsoEasy360</Link>
                        <Link href={"/Product/rpt"} className="text-left text-[17px]">RPTsoEasy360</Link>
                        <Link href={"/Product/famso-easy-360"} className="text-left text-[17px]">FamSoEasy360</Link>
                        <Link href={"/Product/reconso-easy-360"} className="text-left text-[17px]">ReconSoEasy360</Link>
                      </div>
                    )}
                  </div>
                  {user?.role !== "admin" && (
                    <Link href="/finsensor-connect" className="w-full text-left py-2 px-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none flex justify-between">
                      FinSensorConnect
                    </Link>
                  )}
                  <Link href={"/about-us"} className="w-full text-left py-2 px-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none flex justify-between">
                    About us
                  </Link>
                  <Link href={"/contact-us"} className="w-full text-left py-2 px-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none flex justify-between">
                    Contact us
                  </Link>
                  <div className="w-full border-t pt-3 mt-1 flex flex-col space-y-2">
                    {user ? (
                      <>
                        <p className="text-xs text-gray-400 px-1">Signed in as <span className="font-semibold text-gray-600">{user.name || user.email}</span></p>
                        <Link href={"/change-password"} className="w-full text-left py-2 px-4 bg-blue-50 text-blue-700 rounded-md shadow hover:bg-blue-100 focus:outline-none">
                          Change Password
                        </Link>
                        <button onClick={() => { setSheetOpen(false); setTimeout(() => setShowLogoutConfirm(true), 150); }} className="w-full text-left py-2 px-4 bg-red-50 text-red-600 rounded-md shadow hover:bg-red-100 focus:outline-none">
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link href={"/login"} className="w-full text-center py-2 px-4 bg-gradient-to-br from-purple-600 to-[#042c47] text-white rounded-md shadow hover:opacity-90 focus:outline-none">
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex md:space-x-3 items-center">
        {user?.role === "admin" ? (
          <Link href="/admin/dashboard">
            <Button className="text-md rounded text-white bg-gradient-to-br from-[#283c91] to-purple-600 hover:opacity-90" variant="outline">
              Admin Dashboard
            </Button>
          </Link>
        ) : (
          <Link href={"/contact-us"}>
            <Button className="text-md rounded text-white bg-gradient-to-br from-purple-600 to-[#042c47] hover:bg-gradient-to-bl hover:text-white" variant="outline">
              Book a Demo
            </Button>
          </Link>
        )}
        {user ? (
          <div className="relative" id="user-menu-wrapper">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-[#042c47] text-white font-bold text-sm flex items-center justify-center hover:opacity-90 transition">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-700 truncate">{user.name || user.email}</p>
                </div>
                <Link href={"/change-password"} onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                  Change Password
                </Link>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => { setIsUserMenuOpen(false); setShowLogoutConfirm(true); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href={"/login"}>
            <Button variant="outline" className="text-md rounded border border-[#042c47] text-[#042c47] hover:bg-[#042c47] hover:text-white transition">
              Login
            </Button>
          </Link>
        )}
      </div>

      {mounted && showLogoutConfirm && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 mx-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Logout</h2>
            <p className="text-sm text-gray-500 mb-5">Are you sure you want to logout?</p>
            <div className="flex gap-3 justify-end">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); setShowLogoutConfirm(false); }}
                className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); setShowLogoutConfirm(false); handleLogout(); }}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ActionButtons;
