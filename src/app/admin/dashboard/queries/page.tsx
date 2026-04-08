"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, MessageCircle, Clock, CheckCircle, ChevronDown, ChevronUp, Search, Mail, LayoutDashboard, X } from "lucide-react";
import LogoutButton from "../LogoutButton";
import AdminNavbar from "../AdminNavbar";
import { toast } from "sonner";

type Message = { sender: "user" | "admin"; content: string; createdAt: string };
type Query = { _id: string; userId: string; userName: string; userEmail: string; subject: string; status: string; messages: Message[]; createdAt: string; updatedAt: string };

export default function AdminQueriesPage() {
  const router = useRouter();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "replied" | "closed">("all");
  const [confirmCloseId, setConfirmCloseId] = useState<string | null>(null);
  const chatContainerRef = useRef<Record<string, HTMLDivElement | null>>({});
  const chatEndRef = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToBottom = (id: string) => {
    setTimeout(() => {
      const container = chatContainerRef.current[id];
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  };

  // Auto-scroll only when user opens a thread, not on polling
  useEffect(() => {
    if (openId) scrollToBottom(openId);
  }, [openId]);

  const fetchQueries = useCallback(() => {
    fetch("/api/admin/queries").then((r) => {
      if (r.status === 401) { router.push("/login"); return r.json(); }
      return r.json();
    }).then((d) => { setQueries(d.queries || []); setLoading(false); });
  }, [router]);

  useEffect(() => {
    fetchQueries();
    const interval = setInterval(fetchQueries, 8000);
    return () => clearInterval(interval);
  }, [fetchQueries]);

  const handleReply = async (queryId: string) => {
    const text = replyText[queryId]?.trim();
    if (!text) return;
    setReplying(queryId);
    try {
      const res = await fetch(`/api/queries/${queryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Reply sent");
      setReplyText((p) => ({ ...p, [queryId]: "" }));
      fetchQueries();
      scrollToBottom(queryId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setReplying(null);
    }
  };

  const handleClose = async (queryId: string) => {
    try {
      const res = await fetch(`/api/queries/${queryId}/close`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to close");
      toast.success("Query closed");
      setConfirmCloseId(null);
      fetchQueries();
    } catch {
      toast.error("Failed to close query");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };
  const filtered = queries.filter((q) => {    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    const s = search.toLowerCase();
    const matchSearch = !s || q.userName.toLowerCase().includes(s) || q.userEmail.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s);
    return matchStatus && matchSearch;
  });

  const counts = { open: queries.filter((q) => q.status === "open").length, replied: queries.filter((q) => q.status === "replied").length, closed: queries.filter((q) => q.status === "closed").length };

  return (
    <>
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>

      <AdminNavbar active="queries" />

      <div className="w-full px-3 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">User Queries</h1>
          <p className="text-sm text-white/50 mt-0.5">View and reply to queries submitted by users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Open", value: counts.open, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Replied", value: counts.replied, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Total", value: queries.length, color: "text-blue-400", bg: "bg-blue-500/10" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <MessageCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
              </div>
              <div>
                <p className={`text-lg sm:text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-3 w-full">
          {(["all", "open", "replied", "closed"] as const).map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`flex-1 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition capitalize whitespace-nowrap ${statusFilter === f ? "bg-gradient-to-r from-[#283c91] to-purple-600 text-white shadow-sm" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}>
              {f === "all" ? `All (${queries.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f as keyof typeof counts] ?? 0})`}
            </button>
          ))}
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search user, subject..."
            className="pl-8 pr-4 py-1.5 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/70 placeholder:text-white/30 w-full" />
        </div>

        {/* Queries */}
        {loading ? (
          <div className="flex justify-center py-20"><svg className="animate-spin h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg></div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-white/40 text-sm">No queries found</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <div key={q._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-4 py-4 cursor-pointer hover:bg-white/5 transition"
                  onClick={() => { const newId = openId === q._id ? null : q._id; setOpenId(newId); if (newId) scrollToBottom(newId); }}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#283c91] to-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {q.userName?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{q.subject}</p>
                      <p className="text-xs text-white/40 truncate">{q.userName} · {q.userEmail}</p>
                      <p className="text-xs text-white/30">{new Date(q.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${q.status === "replied" ? "bg-green-500/20 text-green-400" : q.status === "closed" ? "bg-white/10 text-white/50" : "bg-orange-500/20 text-orange-400"}`}>
                      {q.status === "replied" ? <><CheckCircle className="w-3 h-3" />Replied</> : q.status === "closed" ? "Closed" : <><Clock className="w-3 h-3" />Open</>}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <span>{q.messages.length} msg{q.messages.length !== 1 ? "s" : ""}</span>
                      {openId === q._id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Chat */}
                {openId === q._id && (
                  <div className="border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-4 space-y-3 max-h-96 overflow-y-auto" ref={(el) => { chatContainerRef.current[q._id] = el; }}>
                      {q.messages.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.sender === "admin" ? "bg-gradient-to-br from-[#283c91] to-purple-600 text-white rounded-br-sm" : "bg-white/10 text-white/80 rounded-bl-sm"}`}>
                            <p className="leading-relaxed">{m.content}</p>
                            <p className={`text-xs mt-1 ${m.sender === "admin" ? "text-white/60" : "text-white/40"}`}>
                              {m.sender === "user" ? `${q.userName} · ` : "You · "}{new Date(m.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={(el) => { chatEndRef.current[q._id] = el; }} />
                    </div>
                    {q.status === "closed" ? (
                      <div className="px-5 py-3 border-t border-white/10 bg-white/5 text-center">
                        <p className="text-xs text-white/40 font-medium">This query has been closed. No further replies can be sent.</p>
                      </div>
                    ) : (
                      <div className="px-5 pb-4 flex gap-2 border-t border-white/10 pt-3">
                        <input type="text" value={replyText[q._id] || ""} onChange={(e) => setReplyText((p) => ({ ...p, [q._id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReply(q._id); } }}
                          placeholder="Type your reply..."
                          className="flex-1 px-3 py-2 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white/80 placeholder:text-white/30" />
                        <button onClick={() => handleReply(q._id)} disabled={replying === q._id}
                          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition disabled:opacity-60 flex items-center gap-1.5">
                          {replying === q._id
                            ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                            : <Send className="w-4 h-4" />}
                          {replying === q._id ? "Sending..." : "Reply"}
                        </button>
                        <button onClick={() => setConfirmCloseId(q._id)}
                          className="px-3 py-2 text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> End Query
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Confirmation Modal */}
    {confirmCloseId && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl p-6 w-80 mx-4">
          <h2 className="text-lg font-semibold text-white mb-1">End Query</h2>
          <p className="text-sm text-white/50 mb-5">Are you sure you want to close this query? The user won&apos;t be able to reply anymore.</p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setConfirmCloseId(null)}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition">
              Cancel
            </button>
            <button onClick={() => handleClose(confirmCloseId)}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium">
              End Query
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
