"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Mail, Phone, MapPin, Briefcase, GraduationCap, Globe, Paperclip, Linkedin } from "lucide-react";
import AdminNavbar from "../../AdminNavbar";

type FormDetail = {
  firstName: string; middleName?: string; lastName?: string;
  gender?: string; dateOfBirth?: string; mobileNo?: string; emailId?: string;
  country?: string; state?: string; city?: string; pinCode?: string;
  profileId?: string;
  currentStatus?: string; otherStatus?: string; selfEmployedDesc?: string; employedInJobDesc?: string;
  qualificationRows: Array<{ name: string; checked: boolean; year: string; experience: string }>;
  softwareKnowledge: string[]; softwareOther?: string;
  specialization: string[]; specializationOther?: string;
  priorWorkExperience: string[]; priorWorkOther?: string;
  serviceAvailability: string[]; serviceOther?: string;
  geographicCoverage: string[];
  linkedinUrl?: string;
  attachment?: { name: string; type: string; base64: string };
  status: string;
  createdAt: string; updatedAt: string;
};

const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
    <h2 className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-4 pb-2 border-b border-white/10">
      {icon && <span className="text-white/50">{icon}</span>}
      {title}
    </h2>
    {children}
  </div>
);

const InfoCard = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 min-w-0">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-white font-medium break-all">{value}</p>
    </div>
  ) : null;

const Tag = ({ label }: { label: string }) => (
  <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-lg border border-white/10">{label}</span>
);

export default function FormDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/forms/${id}`)
      .then((r) => { if (r.status === 401) { router.push("/login"); } return r.json(); })
      .then((d) => { setForm(d.form); setLoading(false); });
  }, [id, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))" }}>
      <svg className="animate-spin h-6 w-6 text-[#283c91]" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );

  if (!form) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Form not found</div>
  );

  const checkedQuals = form.qualificationRows?.filter((r) => r.checked) || [];
  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ");
  const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() || "?";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>

      <AdminNavbar active="dashboard" />
      <div className="bg-[#0f172a] border-b border-white/10 px-4 sm:px-6 md:px-10 py-2">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition font-medium">
          <ArrowLeft className="w-4 h-4" />Back to Dashboard
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6">

        {/* Profile Header Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#283c91] to-purple-600 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-lg sm:text-xl font-bold text-white">{fullName}</h1>
                  {form.profileId && (
                    <span className="text-xs font-mono font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">{form.profileId}</span>
                  )}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${form.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                    {form.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {form.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3">
                  {form.emailId && <span className="flex items-center gap-1 text-xs text-white/50 truncate"><Mail className="w-3 h-3 flex-shrink-0" />{form.emailId}</span>}
                  {form.mobileNo && <span className="flex items-center gap-1 text-xs text-white/50"><Phone className="w-3 h-3 flex-shrink-0" />{form.mobileNo}</span>}
                  {(form.city || form.country) && <span className="flex items-center gap-1 text-xs text-white/50"><MapPin className="w-3 h-3 flex-shrink-0" />{[form.city, form.state, form.country].filter(Boolean).join(", ")}</span>}
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col gap-4 sm:gap-0 sm:text-right text-xs text-white/40 flex-shrink-0">
              <div><p>Submitted</p><p className="font-medium text-white/70">{new Date(form.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p></div>
              <div><p className="sm:mt-1">Updated</p><p className="font-medium text-white/70">{new Date(form.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p></div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <InfoCard label="Gender" value={form.gender} />
            <InfoCard label="Date of Birth" value={form.dateOfBirth} />
            <InfoCard label="Mobile" value={form.mobileNo} />
            <InfoCard label="Email" value={form.emailId} />
          </div>
        </Section>

        {/* Location */}
        <Section title="Location" icon={<MapPin className="w-3.5 h-3.5" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <InfoCard label="Country" value={form.country} />
            <InfoCard label="State" value={form.state} />
            <InfoCard label="City" value={form.city} />
            <InfoCard label="Pin Code" value={form.pinCode} />
          </div>
        </Section>

        {/* Current Status */}
        <Section title="Current Status" icon={<Briefcase className="w-3.5 h-3.5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard label="Status" value={form.currentStatus} />
            <InfoCard label="Details" value={form.selfEmployedDesc || form.employedInJobDesc || form.otherStatus} />
          </div>
        </Section>

        {/* Qualifications */}
        {checkedQuals.length > 0 && (
          <Section title="Qualifications & Credentials" icon={<GraduationCap className="w-3.5 h-3.5" />}>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-xs font-semibold text-white/40 uppercase tracking-wide border-b border-white/10">
                    <th className="text-left px-4 py-2.5">Qualification</th>
                    <th className="text-left px-4 py-2.5">Year</th>
                    <th className="text-left px-4 py-2.5">Experience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {checkedQuals.map((q) => (
                    <tr key={q.name} className="hover:bg-white/5 transition">
                      <td className="px-4 py-2.5 font-medium text-white">{q.name}</td>
                      <td className="px-4 py-2.5 text-white/60">{q.year || "—"}</td>
                      <td className="px-4 py-2.5 text-white/60">{q.experience ? `${q.experience} yrs` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="sm:hidden space-y-2">
              {checkedQuals.map((q) => (
                <div key={q.name} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                  <p className="font-medium text-white text-sm">{q.name}</p>
                  <div className="text-right text-xs text-white/50">
                    <p>{q.year || "—"}</p>
                    <p>{q.experience ? `${q.experience} yrs` : "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        <Section title="Skills & Expertise" icon={<Globe className="w-3.5 h-3.5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {form.softwareKnowledge?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2.5">Software Knowledge</p>
                <div className="flex flex-wrap gap-2">{[...form.softwareKnowledge, form.softwareOther].filter(Boolean).map((s) => <Tag key={s} label={s!} />)}</div>
              </div>
            )}
            {form.specialization?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2.5">Specialization</p>
                <div className="flex flex-wrap gap-2">{[...form.specialization, form.specializationOther].filter(Boolean).map((s) => <Tag key={s} label={s!} />)}</div>
              </div>
            )}
            {form.priorWorkExperience?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2.5">Prior Work Experience</p>
                <div className="flex flex-wrap gap-2">{[...form.priorWorkExperience, form.priorWorkOther].filter(Boolean).map((s) => <Tag key={s} label={s!} />)}</div>
              </div>
            )}
            {form.serviceAvailability?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2.5">Service Availability</p>
                <div className="flex flex-wrap gap-2">{[...form.serviceAvailability, form.serviceOther].filter(Boolean).map((s) => <Tag key={s} label={s!} />)}</div>
              </div>
            )}
            {form.geographicCoverage?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2.5">Geographic Coverage</p>
                <div className="flex flex-wrap gap-2">{form.geographicCoverage.map((s) => <Tag key={s} label={s} />)}</div>
              </div>
            )}
          </div>
        </Section>

        {/* Additional */}
        {(form.linkedinUrl || form.attachment?.name) && (
          <Section title="Additional Information">
            <div className="flex flex-wrap gap-4">
              {form.linkedinUrl && (
                <a href={form.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              )}
              {form.attachment?.name && form.attachment?.base64 && (
                <a href={`data:${form.attachment.type};base64,${form.attachment.base64}`} download={form.attachment.name}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition">
                  <Paperclip className="w-4 h-4" />
                  {form.attachment.name}
                </a>
              )}
              {form.attachment?.name && !form.attachment?.base64 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/40 bg-white/5 rounded-xl border border-white/10">
                  <Paperclip className="w-4 h-4" />
                  {form.attachment.name} (preview unavailable)
                </div>
              )}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
