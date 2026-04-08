"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, MessageCircle, Clock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

type Message = { sender: "user" | "admin"; content: string; createdAt: string };
type Query = { _id: string; subject: string; status: string; messages: Message[]; createdAt: string; updatedAt: string };

const inputCls = "w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition placeholder:text-gray-300";

export default function PostQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"new" | "list">("new");
  const chatContainerRef = useRef<Record<string, HTMLDivElement | null>>({});
  const bottomRef = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToBottom = (id: string) => {
    setTimeout(() => {
      const container = chatContainerRef.current[id];
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  };

  // Auto-scroll only when user manually opens a thread, not on polling updates
  useEffect(() => {
    if (openId) scrollToBottom(openId);
  }, [openId]);

  const fetchQueries = useCallback(() => {
    fetch("/api/queries").then((r) => r.json()).then((d) => {
      setQueries(d.queries || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (d.user) {
        setLoggedIn(true);
        fetchQueries();
        const interval = setInterval(fetchQueries, 8000);
        return () => clearInterval(interval);
      } else {
        setLoading(false);
      }
    });
  }, [fetchQueries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Query submitted successfully");
      setSubject(""); setContent("");
      fetchQueries();
      setActiveTab("list");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

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
      setReplyText((prev) => ({ ...prev, [queryId]: "" }));
      // Update queries without triggering scroll
      fetch("/api/queries").then((r) => r.json()).then((d) => {
        setQueries(d.queries || []);
        // Scroll only the chat box after update
        setTimeout(() => {
          const container = chatContainerRef.current[queryId];
          if (container) container.scrollTop = container.scrollHeight;
        }, 150);
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setReplying(null);
    }
  };

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-10"
      style={{ background: "radial-gradient(circle at center, rgba(255,255,200,0.35) 0%, rgba(255,255,240,0.2) 40%, rgba(255,255,255,0.05) 80%), linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Post Queries</h1>
          <p className="text-sm text-gray-500 mt-0.5">Submit your queries and track replies from our team</p>
        </div>

        {!loggedIn ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm mb-4">Please login to submit and view your queries</p>
            <a href="/login" className="inline-block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition">
              Login
            </a>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 w-fit">
              <button onClick={() => setActiveTab("new")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "new" ? "bg-white text-[#283c91] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                <Send className="w-3.5 h-3.5" /> Post New Query
              </button>
              <button onClick={() => setActiveTab("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "list" ? "bg-white text-[#283c91] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                <MessageCircle className="w-3.5 h-3.5" /> My Queries {queries.length > 0 && <span className="bg-[#283c91] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">{queries.length}</span>}
              </button>
            </div>

            {/* New Query Form */}
            {activeTab === "new" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject" required className={inputCls} />
                  <textarea value={content} onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe your query..." required rows={5}
                    className={`${inputCls} resize-none`} />
                  <button type="submit" disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition disabled:opacity-60">
                    {submitting ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : <Send className="w-4 h-4" />}
                    {submitting ? "Submitting..." : "Submit Query"}
                  </button>
                </form>
              </div>
            )}

            {/* Queries List */}
            {activeTab === "list" && (
              <div className="space-y-3">
                {loading ? (
                  <div className="flex justify-center py-10"><svg className="animate-spin h-5 w-5 text-[#283c91]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg></div>
                ) : queries.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center text-gray-400 text-sm">No queries yet</div>
                ) : queries.map((q) => (
                  <div key={q._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => { const newId = openId === q._id ? null : q._id; setOpenId(newId); if (newId) scrollToBottom(newId); }}>
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${q.status === "replied" ? "bg-green-500" : q.status === "closed" ? "bg-gray-400" : "bg-orange-400"}`} />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{q.subject}</p>
                          <p className="text-xs text-gray-400">{new Date(q.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${q.status === "replied" ? "bg-green-100 text-green-700" : q.status === "closed" ? "bg-gray-100 text-gray-500" : "bg-orange-100 text-orange-600"}`}>
                          {q.status === "replied" ? <><CheckCircle className="w-3 h-3" />Replied</> : q.status === "closed" ? "Closed" : <><Clock className="w-3 h-3" />Open</>}
                        </span>
                        {openId === q._id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                    {openId === q._id && (
                      <div className="border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-5 py-4 space-y-3 max-h-80 overflow-y-auto" ref={(el) => { chatContainerRef.current[q._id] = el; }}>
                          {q.messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.sender === "user" ? "bg-gradient-to-br from-[#283c91] to-purple-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                                <p className="leading-relaxed">{m.content}</p>
                                <p className={`text-xs mt-1 ${m.sender === "user" ? "text-white/60" : "text-gray-400"}`}>
                                  {m.sender === "admin" ? "FinSensor Team · " : ""}{new Date(m.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div ref={(el) => { bottomRef.current[q._id] = el; }} />
                        </div>
                        {q.status === "closed" ? (
                          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-center">
                            <p className="text-xs text-gray-400 font-medium">This query has been closed by the support team. You can post a new query if needed.</p>
                          </div>
                        ) : (
                          <div className="px-5 pb-4 flex gap-2 border-t border-gray-50 pt-3">
                            <input type="text" value={replyText[q._id] || ""} onChange={(e) => setReplyText((p) => ({ ...p, [q._id]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReply(q._id); } }}
                              placeholder="Type a follow-up message..."
                              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
                            <button onClick={() => handleReply(q._id)} disabled={replying === q._id}
                              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition disabled:opacity-60 flex items-center">
                              {replying === q._id
                                ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                : <Send className="w-4 h-4" />}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
