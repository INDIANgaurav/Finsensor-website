"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, CheckCircle, Clock, Search, Download } from "lucide-react";
import AdminNavbar from "./AdminNavbar";

type FormEntry = {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId?: string;
  mobileNo?: string;
  country?: string;
  state?: string;
  city?: string;
  currentStatus?: string;
  profileId?: string;
  status: "completed" | "incomplete";
  updatedAt: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [forms, setForms] = useState<FormEntry[]>([]);
  const [allForms, setAllForms] = useState<FormEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Unique values for dropdowns derived from loaded forms
  const countries = Array.from(new Set(allForms.map((f) => f.country).filter(Boolean))).sort() as string[];
  const states = Array.from(new Set(allForms.filter((f) => !countryFilter || f.country === countryFilter).map((f) => f.state).filter(Boolean))).sort() as string[];
  const currentStatuses = Array.from(new Set(allForms.map((f) => f.currentStatus).filter(Boolean))).sort() as string[];

  useEffect(() => {
    // Always fetch all forms once for stats
    fetch("/api/admin/forms")
      .then((r) => r.json())
      .then((d) => setAllForms(d.forms || []));
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      const url = filter === "all" ? "/api/admin/forms" : `/api/admin/forms?status=${filter}`;
      const res = await fetch(url);
      if (res.status === 401) { router.push("/login"); return; }
      const data = await res.json();
      setForms(data.forms || []);
      setLoading(false);
    };
    fetchForms();
  }, [filter, router]);

  const filtered = forms.filter((f) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || (
      `${f.firstName} ${f.lastName || ""}`.toLowerCase().includes(q) ||
      f.emailId?.toLowerCase().includes(q) ||
      f.mobileNo?.includes(q) ||
      f.profileId?.toLowerCase().includes(q) ||
      f.city?.toLowerCase().includes(q) ||
      f.country?.toLowerCase().includes(q) ||
      f.state?.toLowerCase().includes(q) ||
      f.currentStatus?.toLowerCase().includes(q) ||
      f.status?.toLowerCase().includes(q)
    );
    const matchCountry = !countryFilter || f.country === countryFilter;
    const matchState = !stateFilter || f.state === stateFilter;
    const matchStatus = !statusFilter || f.currentStatus === statusFilter;
    return matchSearch && matchCountry && matchState && matchStatus;
  });

  const total = allForms.length;
  const completed = allForms.filter((f) => f.status === "completed").length;
  const incomplete = allForms.filter((f) => f.status === "incomplete").length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>

      {/* Navbar */}
      <AdminNavbar active="dashboard" />

      <div className="w-full px-3 sm:px-6 py-6">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">FinSensor Connect</h1>
            <p className="text-sm text-white/50 mt-0.5">Manage and review all submitted professional profiles</p>
          </div>
          <a href="/api/admin/export" download
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 rounded-lg transition flex-shrink-0">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Excel</span>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Forms", value: total, icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />, bg: "bg-blue-500/10", color: "text-blue-400" },
            { label: "Completed", value: completed, icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />, bg: "bg-green-500/10", color: "text-green-400" },
            { label: "Incomplete", value: incomplete, icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />, bg: "bg-orange-500/10", color: "text-orange-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
                <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
              <p className="text-xs text-white/50 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="space-y-2 mb-4 md:hidden">
          {/* Mobile: Status tabs */}
          <div className="flex gap-2">
            {(["all", "completed", "incomplete"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition capitalize whitespace-nowrap ${filter === f ? "bg-gradient-to-r from-[#283c91] to-purple-600 text-white shadow-sm" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}>
                {f === "all" ? `All (${total})` : f === "completed" ? `Done (${completed})` : `Pending (${incomplete})`}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setStateFilter(""); }}
              className="flex-1 px-2 py-1.5 text-xs border border-white/10 rounded-lg outline-none bg-white/5 text-white/70">
              <option value="" className="bg-[#1e293b]">All Countries</option>
              {countries.map((c) => <option key={c} value={c} className="bg-[#1e293b]">{c}</option>)}
            </select>
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
              disabled={!countryFilter || states.length === 0}
              className="flex-1 px-2 py-1.5 text-xs border border-white/10 rounded-lg outline-none bg-white/5 text-white/70 disabled:opacity-40">
              <option value="" className="bg-[#1e293b]">All States</option>
              {states.map((s) => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-white/10 rounded-lg outline-none bg-white/5 text-white/70">
              <option value="" className="bg-[#1e293b]">Prof. Status</option>
              {currentStatuses.map((s) => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, ID..."
              className="pl-8 pr-4 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70 placeholder:text-white/30 w-full" />
          </div>
          {(countryFilter || stateFilter || statusFilter || search) && (
            <button onClick={() => { setCountryFilter(""); setStateFilter(""); setStatusFilter(""); setSearch(""); }}
              className="text-xs font-medium text-white/50 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition px-3 py-1.5">
              Clear filters
            </button>
          )}
        </div>

        {/* Desktop filters — original single line */}
        <div className="hidden md:flex items-center gap-2 mb-4 flex-wrap">
          {(["all", "completed", "incomplete"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition capitalize whitespace-nowrap ${filter === f ? "bg-gradient-to-r from-[#283c91] to-purple-600 text-white shadow-sm" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}>
              {f === "all" ? `All (${total})` : f === "completed" ? `Completed (${completed})` : `Incomplete (${incomplete})`}
            </button>
          ))}
          <div className="w-px h-5 bg-white/10" />
          <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setStateFilter(""); }}
            className="px-3 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70">
            <option value="" className="bg-[#1e293b]">All Countries</option>
            {countries.map((c) => <option key={c} value={c} className="bg-[#1e293b]">{c}</option>)}
          </select>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
            disabled={!countryFilter || states.length === 0}
            className="px-3 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70 disabled:opacity-40 disabled:cursor-not-allowed">
            <option value="" className="bg-[#1e293b]">All States</option>
            {states.map((s) => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70">
            <option value="" className="bg-[#1e293b]">All Prof. Status</option>
            {currentStatuses.map((s) => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
          </select>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, ID..."
              className="pl-8 pr-4 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70 placeholder:text-white/30 w-56" />
          </div>
          {(countryFilter || stateFilter || statusFilter || search) && (
            <button onClick={() => { setCountryFilter(""); setStateFilter(""); setStatusFilter(""); setSearch(""); }}
              className="px-3 py-1.5 text-xs font-medium text-white/50 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition whitespace-nowrap">
              Clear
            </button>
          )}
        </div>

        {/* Table / Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/40 text-sm gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/30 gap-2">
            <Users className="w-8 h-8 opacity-30" />
            <p className="text-sm">No forms found</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-xs font-semibold text-white/40 uppercase tracking-wide border-b border-white/10">
                    <th className="text-left px-5 py-3">#</th>
                    <th className="text-left px-5 py-3">Profile ID</th>
                    <th className="text-left px-5 py-3">Name</th>
                    <th className="text-left px-5 py-3">Email</th>
                    <th className="text-left px-5 py-3">Mobile</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3">Updated</th>
                    <th className="text-left px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((form, i) => {
                    const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() || "?";
                    return (
                      <tr key={form._id} className="hover:bg-white/5 transition">
                        <td className="px-5 py-3.5 text-white/30 text-xs">{i + 1}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono font-semibold text-white/60 bg-white/10 px-2 py-1 rounded-lg border border-white/10">{form.profileId || "—"}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#283c91] to-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{initials}</div>
                            <span className="font-semibold text-white">{form.firstName} {form.lastName || ""}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-white/50">{form.emailId || "—"}</td>
                        <td className="px-5 py-3.5 text-white/50">{form.mobileNo || "—"}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${form.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                            {form.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {form.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-white/40 text-xs">{new Date(form.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                        <td className="px-5 py-3.5">
                          <button onClick={() => router.push(`/admin/dashboard/form/${form._id}`)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 hover:from-[#1e2d6e] hover:to-purple-700 rounded-lg transition">
                            View Detail →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((form, i) => {
                const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() || "?";
                return (
                  <div key={form._id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#283c91] to-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{initials}</div>
                        <div>
                          <p className="font-semibold text-white text-sm">{form.firstName} {form.lastName || ""}</p>
                          <p className="text-xs text-white/40">{form.emailId || "—"}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${form.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                        {form.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {form.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div><p className="text-white/40">Profile ID</p><p className="text-white/70 font-mono">{form.profileId || "—"}</p></div>
                      <div><p className="text-white/40">Mobile</p><p className="text-white/70">{form.mobileNo || "—"}</p></div>
                      <div><p className="text-white/40">Updated</p><p className="text-white/70">{new Date(form.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p></div>
                      <div><p className="text-white/40">Location</p><p className="text-white/70">{[form.city, form.country].filter(Boolean).join(", ") || "—"}</p></div>
                    </div>
                    <button onClick={() => router.push(`/admin/dashboard/form/${form._id}`)}
                      className="w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg transition">
                      View Detail →
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
