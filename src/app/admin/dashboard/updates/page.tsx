"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, User, CheckCircle, Mail, FileText, Clock, ChevronDown, ChevronUp } from "lucide-react";
import AdminNavbar from "../AdminNavbar";
import { toast } from "sonner";

type UserEntry = { _id: string; firstName: string; lastName?: string; emailId?: string; profileId?: string };
type EmailLog = { _id: string; subject: string; sentTo: string; recipientCount: number; recipients: string[]; content?: string; createdAt: string };
type Article = { _id: string; title: string; content: string; sentTo: string; recipientCount: number; createdAt: string };

const inputCls = "w-full px-3 py-2 text-sm border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition bg-white/5 text-white/80 placeholder:text-white/30";

const RecipientSelector = ({ users, recipientType, setRecipientType, selected, toggleUser }: {
  users: UserEntry[]; recipientType: "all" | "select"; setRecipientType: (v: "all" | "select") => void;
  selected: string[]; toggleUser: (id: string) => void;
}) => (
  <div>
    <label className="text-xs font-semibold text-white/40 uppercase tracking-wide block mb-2">Recipients</label>
    <div className="flex gap-2 mb-3">
      <button onClick={() => setRecipientType("all")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${recipientType === "all" ? "bg-[#283c91] text-white border-[#283c91]" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"}`}>
        <Users className="w-4 h-4" /> All Users ({users.length})
      </button>
      <button onClick={() => setRecipientType("select")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${recipientType === "select" ? "bg-[#283c91] text-white border-[#283c91]" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"}`}>
        <User className="w-4 h-4" /> Select Users
      </button>
    </div>
    {recipientType === "select" && (
      <>
        <div className="border border-white/10 rounded-xl overflow-hidden max-h-52 overflow-y-auto">
          {users.map((u) => (
            <div key={u._id} onClick={() => toggleUser(u._id)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition border-b border-white/5 last:border-0 ${selected.includes(u._id) ? "bg-blue-500/10" : "hover:bg-white/5"}`}>
              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${selected.includes(u._id) ? "bg-[#283c91] border-[#283c91]" : "border-white/20"}`}>
                {selected.includes(u._id) && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#283c91] to-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {u.firstName?.[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80">{u.firstName} {u.lastName || ""}</p>
                <p className="text-xs text-white/40 truncate">{u.emailId || "No email"}</p>
              </div>
              {u.profileId && <span className="text-xs font-mono text-white/60 bg-white/10 px-2 py-0.5 rounded border border-white/10">{u.profileId}</span>}
            </div>
          ))}
        </div>
        {selected.length > 0 && <p className="text-xs text-white/40 mt-1.5">{selected.length} selected</p>}
      </>
    )}
  </div>
);

export default function UpdatesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"email" | "article" | "history">("email");
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Email state
  const [emailRecipientType, setEmailRecipientType] = useState<"all" | "select">("all");
  const [emailSelected, setEmailSelected] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  // Article state
  const [artRecipientType, setArtRecipientType] = useState<"all" | "select">("all");
  const [artSelected, setArtSelected] = useState<string[]>([]);
  const [artTitle, setArtTitle] = useState("");
  const [artContent, setArtContent] = useState("");
  const [sendingArt, setSendingArt] = useState(false);

  useEffect(() => {
    fetch("/api/admin/forms").then((r) => r.json()).then((d) => setUsers(d.forms || []));
    fetchHistory();
    fetchArticles();
  }, []);

  const fetchHistory = () => {
    fetch("/api/admin/send-update").then((r) => r.json()).then((d) => setLogs(d.logs || []));
  };
  const fetchArticles = () => {
    fetch("/api/admin/articles").then((r) => r.json()).then((d) => setArticles(d.articles || []));
  };

  const toggleEmailUser = (id: string) => setEmailSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleArtUser = (id: string) => setArtSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailContent.trim()) { toast.error("Subject and content required"); return; }
    if (emailRecipientType === "select" && emailSelected.length === 0) { toast.error("Select at least one recipient"); return; }
    setSendingEmail(true);
    try {
      const res = await fetch("/api/admin/send-update", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: emailSubject, content: emailContent, recipients: emailRecipientType === "all" ? "all" : emailSelected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`${data.sent} email(s) sent`);
      setEmailSubject(""); setEmailContent(""); setEmailSelected([]);
      fetchHistory();
    } catch (err) { toast.error(err instanceof Error ? err.message : "Failed"); }
    finally { setSendingEmail(false); }
  };

  const handlePublishArticle = async () => {
    if (!artTitle.trim() || !artContent.trim()) { toast.error("Title and content required"); return; }
    setSendingArt(true);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: artTitle, content: artContent, recipients: artRecipientType === "all" ? "all" : artSelected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`Article published & ${data.sent} email(s) sent`);
      setArtTitle(""); setArtContent(""); setArtSelected([]);
      fetchArticles(); fetchHistory();
    } catch (err) { toast.error(err instanceof Error ? err.message : "Failed"); }
    finally { setSendingArt(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
      <AdminNavbar active="updates" />

      <div className="w-full px-3 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Updates & Communications</h1>
          <p className="text-sm text-white/50 mt-0.5">Send emails, publish articles, and view sent history</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 p-1 rounded-xl mb-6 w-full">
          {([
            { key: "email", label: "Send Email", icon: <Mail className="w-4 h-4" /> },
            { key: "article", label: "Publish Article", icon: <FileText className="w-4 h-4" /> },
            { key: "history", label: "Sent History", icon: <Clock className="w-4 h-4" /> },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${tab === t.key ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white/70"}`}>
              {t.icon}<span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Send Email Tab */}
        {tab === "email" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <RecipientSelector users={users} recipientType={emailRecipientType} setRecipientType={setEmailRecipientType} selected={emailSelected} toggleUser={toggleEmailUser} />
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wide block mb-1.5">Subject</label>
              <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject..." className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wide block mb-1.5">Message</label>
              <textarea value={emailContent} onChange={(e) => setEmailContent(e.target.value)} placeholder="Write your message..." rows={7} className={`${inputCls} resize-none`} />
            </div>
            <button onClick={handleSendEmail} disabled={sendingEmail}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition disabled:opacity-60">
              {sendingEmail ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : <Send className="w-4 h-4" />}
              {sendingEmail ? "Sending..." : "Send Email"}
            </button>
          </div>
        )}

        {/* Article Tab */}
        {tab === "article" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <RecipientSelector users={users} recipientType={artRecipientType} setRecipientType={setArtRecipientType} selected={artSelected} toggleUser={toggleArtUser} />
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wide block mb-1.5">Article Title</label>
              <input type="text" value={artTitle} onChange={(e) => setArtTitle(e.target.value)} placeholder="Article title..." className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wide block mb-1.5">Content</label>
              <textarea value={artContent} onChange={(e) => setArtContent(e.target.value)} placeholder="Write your article..." rows={10} className={`${inputCls} resize-none`} />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handlePublishArticle} disabled={sendingArt}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#283c91] to-purple-600 rounded-lg hover:opacity-90 transition disabled:opacity-60">
                {sendingArt ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : <FileText className="w-4 h-4" />}
                {sendingArt ? "Publishing..." : "Publish & Send"}
              </button>
              <p className="text-xs text-white/30">Article will be saved and emailed to recipients</p>
            </div>

            {/* Past Articles */}
            {articles.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Published Articles ({articles.length})</p>
                <div className="space-y-2">
                  {articles.map((a) => (
                    <div key={a._id} className="border border-white/10 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
                        onClick={() => setExpandedArticle(expandedArticle === a._id ? null : a._id)}>
                        <div>
                          <p className="text-sm font-semibold text-white">{a.title}</p>
                          <p className="text-xs text-white/40">{new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} · Sent to {a.recipientCount} user{a.recipientCount !== 1 ? "s" : ""} ({a.sentTo})</p>
                        </div>
                        {expandedArticle === a._id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                      </div>
                      {expandedArticle === a._id && (
                        <div className="px-4 pb-4 border-t border-white/10">
                          <div className="mt-3 text-sm text-white/70 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: a.content }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-4">Sent Emails ({logs.length})</p>
            {logs.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-8">No emails sent yet</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log._id} className="border border-white/10 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
                      onClick={() => setExpandedLog(expandedLog === log._id ? null : log._id)}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{log.subject}</p>
                          <p className="text-xs text-white/40">
                            {new Date(log.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                            {" · "}{log.recipientCount} recipient{log.recipientCount !== 1 ? "s" : ""}
                            {" · "}<span className="capitalize">{log.sentTo}</span>
                          </p>
                        </div>
                      </div>
                      {expandedLog === log._id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                    </div>
                    {expandedLog === log._id && (
                      <div className="px-4 pb-4 border-t border-white/10 space-y-3 mt-2">
                        <div className="text-sm text-white/70 leading-relaxed bg-white/5 rounded-lg p-3" dangerouslySetInnerHTML={{ __html: log.content ?? "" }} />
                        {log.recipients?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5">Recipients</p>
                            <div className="flex flex-wrap gap-1.5">
                              {log.recipients.map((r) => (
                                <span key={r} className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-lg border border-white/10">{r}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
