"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";

/* ─── Custom Date Picker using react-day-picker ─── */
const DatePicker = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = value ? new Date(value) : undefined;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen(!open)}
        className={`${inputCls} flex items-center justify-between cursor-pointer select-none`}
      >
        <span className={selected ? "text-gray-800" : "text-gray-300"}>
          {selected ? format(selected, "dd MMM yyyy") : "DD MMM YYYY"}
        </span>
        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>

      {open && (
        <div className="absolute z-[9999] mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) { onChange(format(date, "yyyy-MM-dd")); setOpen(false); }
            }}
            captionLayout="dropdown"
            fromYear={1950}
            toYear={new Date().getFullYear()}
            styles={{
              caption: { display: "flex", alignItems: "center", justifyContent: "space-between" },
              day: { borderRadius: "50%", width: "2rem", height: "2rem" },
            }}
            classNames={{
              months: "flex flex-col",
              month: "space-y-2",
              caption: "flex justify-center items-center gap-2 px-1 py-1",
              caption_label: "hidden",
              caption_dropdowns: "flex gap-2",
              dropdown: "text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400",
              nav: "flex items-center gap-1",
              nav_button: "p-1 rounded-lg hover:bg-gray-100 transition text-gray-500",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell: "text-gray-400 text-xs font-semibold w-8 text-center py-1",
              row: "flex w-full mt-1",
              cell: "w-8 h-8 text-center text-sm",
              day: "w-8 h-8 rounded-full text-xs font-medium hover:bg-blue-50 text-gray-700 transition",
              day_selected: "bg-blue-600 text-white hover:bg-blue-700 rounded-full",
              day_today: "border border-blue-400 text-blue-600 rounded-full",
              day_outside: "text-gray-300",
            }}
          />
        </div>
      )}
    </div>
  );
};

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition placeholder:text-gray-300 box-border";

/* ─── Searchable Dropdown with "Other" fallback ─── */
const SearchableSelect = ({
  value, onChange, options, placeholder, loading, disabled,
}: {
  value: string; onChange: (val: string) => void;
  options: string[]; placeholder: string; loading?: boolean; disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [manualValue, setManualValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOther = value === "__other__";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
    if (!open) setSearch("");
  }, [open]);

  useEffect(() => {
    if (value && value !== "__other__" && !options.includes(value)) {
      setManualValue(value);
    }
  }, [value, options]);

  const filtered = search.trim()
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const displayLabel = isOther
    ? "Other"
    : value && !options.includes(value) && value !== ""
    ? value
    : value || "";

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => { if (!disabled) setOpen((prev) => !prev); }}
        className={`${inputCls} flex items-center justify-between cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={displayLabel ? "text-gray-800" : "text-gray-300"}>
          {loading ? "Loading..." : displayLabel || placeholder}
        </span>
        <span className="text-gray-400 text-xs ml-1">▼</span>
      </div>

      {open && !disabled && (
        <div className="absolute z-[9999] mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map((opt) => (
              <li key={opt}
                onMouseDown={() => { onChange(opt); setSearch(""); setOpen(false); }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition ${value === opt ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}`}
              >
                {opt}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400">No results found</li>
            )}
            <li
              onMouseDown={() => { onChange("__other__"); setSearch(""); setOpen(false); }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 transition text-orange-600 font-medium border-t border-gray-100 ${isOther ? "bg-orange-50" : ""}`}
            >
              Others (type manually)
            </li>
          </ul>
        </div>
      )}

      {(isOther || (value && !options.includes(value) && value !== "")) && (
        <input
          type="text"
          value={manualValue}
          onChange={(e) => { setManualValue(e.target.value); onChange(e.target.value); }}
          placeholder={`Enter ${placeholder.toLowerCase()} manually...`}
          className={`mt-2 ${inputCls}`}
        />
      )}
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white/70 rounded-xl border border-white shadow-sm p-5">
    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">{title}</h2>
    {children}
  </div>
);

const STORAGE_KEY = "finsensor_personal_info_draft";

type QualRow = { name: string; checked: boolean; year: string; experience: string };
type FormData = {
  firstName: string; middleName: string; lastName: string;
  gender: string; dateOfBirth: string; mobileNo: string; emailId: string;
  country: string; state: string; city: string; pinCode: string;
  currentStatus: string; otherStatus: string; selfEmployedDesc: string; employedInJobDesc: string;
  qualificationRows: QualRow[];
  softwareKnowledge: string[]; softwareOther: string;
  specialization: string[]; specializationOther: string;
  priorWorkExperience: string[]; priorWorkOther: string;
  serviceAvailability: string[]; serviceOther: string;
  geographicCoverage: string[];
  linkedinUrl: string; attachment: File | null; savedAttachmentName?: string;
};

const defaultFormData: FormData = {
  firstName: "", middleName: "", lastName: "",
  gender: "", dateOfBirth: "", mobileNo: "", emailId: "",
  country: "", state: "", city: "", pinCode: "",
  currentStatus: "", otherStatus: "", selfEmployedDesc: "", employedInJobDesc: "",
  qualificationRows: [
    { name: "CA", checked: false, year: "", experience: "" },
    { name: "ICMAI", checked: false, year: "", experience: "" },
    { name: "CS", checked: false, year: "", experience: "" },
    { name: "LLB", checked: false, year: "", experience: "" },
    { name: "MBA", checked: false, year: "", experience: "" },
    { name: "BBA", checked: false, year: "", experience: "" },
    { name: "DISA", checked: false, year: "", experience: "" },
    { name: "FAFD", checked: false, year: "", experience: "" },
    { name: "ACCA", checked: false, year: "", experience: "" },
    { name: "CPA", checked: false, year: "", experience: "" },
    { name: "Post Graduate", checked: false, year: "", experience: "" },
    { name: "Graduate", checked: false, year: "", experience: "" },
    { name: "Other", checked: false, year: "", experience: "" },
  ],
  softwareKnowledge: [], softwareOther: "",
  specialization: [], specializationOther: "",
  priorWorkExperience: [], priorWorkOther: "",
  serviceAvailability: [], serviceOther: "",
  geographicCoverage: [],
  linkedinUrl: "", attachment: null,
};

const getSavedFormData = (): FormData => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultFormData, ...JSON.parse(saved), attachment: null };
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }
  return defaultFormData;
};

const CheckboxGroup = ({
  field, checkedValues, options, onChange, otherField, otherValue, onOtherChange,
}: {
  field: string; checkedValues: string[]; options: string[];
  onChange: (field: string, value: string) => void;
  otherField?: string; otherValue?: string;
  onOtherChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5">
    {options.map((option) => (
      <div key={option}>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" checked={checkedValues.includes(option)} onChange={() => onChange(field, option)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
            {option === "Other" ? "Other (specify)" : option}
          </span>
        </label>
        {option === "Other" && checkedValues.includes("Other") && otherField && (
          <input type="text" name={otherField} value={otherValue || ""} onChange={onOtherChange}
            placeholder="Please specify..." className={`mt-1.5 ${inputCls}`} />
        )}
      </div>
    ))}
  </div>
);

const PersonalInformation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(getSavedFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  // Location data
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((r) => r.json())
      .then((d) => {
        const names: string[] = d.data?.map((c: { name: string }) => c.name).sort() ?? [];
        setCountries(names);
      })
      .catch(() => setCountries([]));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const country = formData.country;
    if (!country || country === "__other__") { setStates([]); setCities([]); return; }
    setStatesLoading(true);
    setStates([]); setCities([]);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    })
      .then((r) => r.json())
      .then((d) => {
        const s: string[] = (d.data?.states ?? [])
          .map((st: { name: string }) => st.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
          .sort();
        setStates(s);
      })
      .catch(() => setStates([]))
      .finally(() => setStatesLoading(false));
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    const country = formData.country;
    const state = formData.state;
    if (!country || !state || state === "__other__") { setCities([]); return; }
    setCitiesLoading(true);
    setCities([]);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, state }),
    })
      .then((r) => r.json())
      .then((d) => {
        const c: string[] = (d.data ?? [])
          .map((name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
          .sort();
        setCities(c);
      })
      .catch(() => setCities([]))
      .finally(() => setCitiesLoading(false));
  }, [formData.country, formData.state]);

  // On mount: check session
  // - Logged in → load from DB (clears localStorage draft)
  // - Not logged in → keep localStorage draft (new user who hasn't submitted yet)
  useEffect(() => {
    fetch("/api/personal-information/my-form")
      .then((r) => r.json())
      .then((d) => {
        if (d.redirect === "admin") {
          router.push("/admin/dashboard");
          return;
        }
        if (d.form) {
          setFormData({
            ...defaultFormData,
            ...d.form,
            attachment: null,
            savedAttachmentName: d.form.attachment?.name || undefined,
          });
          localStorage.removeItem(STORAGE_KEY);
        }
        setFormLoading(false);
      })
      .catch(() => setFormLoading(false));
  }, [router]);

  // Auto-save to localStorage
  useEffect(() => {
    const dataToSave = { ...formData, attachment: null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const arr = prev[field as keyof typeof prev] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((i) => i !== value) : [...arr, value] };
    });
  };

  const handleQualificationRow = (index: number, field: "checked" | "year" | "experience", value: string | boolean) => {
    setFormData((prev) => {
      const updated = [...prev.qualificationRows];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, qualificationRows: updated };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify({ ...formData, attachment: null }));
      if (formData.attachment) {
        fd.append("attachment", formData.attachment);
      }

      const res = await fetch("/api/personal-information/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
      toast.success(data.message || "Profile submitted successfully!");
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
  };

  const currentStatusOptions = [
    { label: "Practicing Chartered Accountant", value: "Practicing Chartered Accountant", inputField: "" },
    { label: "Self employed in Business (specify)", value: "Self employed in Business", inputField: "selfEmployedDesc" },
    { label: "Employed with CA Firm", value: "Employed with CA Firm", inputField: "" },
    { label: "Employed in Job (specify Industry)", value: "Employed in Job", inputField: "employedInJobDesc" },
    { label: "Freelancer", value: "Freelancer", inputField: "" },
    { label: "Retired from work", value: "Retired from work", inputField: "" },
    { label: "Other (specify)", value: "Other", inputField: "otherStatus" },
  ];

  if (formLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );

  return (
    <section
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-10"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,255,200,0.35) 0%, rgba(255,255,240,0.2) 40%, rgba(255,255,255,0.05) 80%), linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))",
      }}
    >
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Information Required</h1>
        <p className="text-sm text-gray-500 mt-0.5">Complete your professional profile to get business opportunities</p>
      </div>

      {submitted && (
        <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-700 rounded-xl text-sm flex items-center gap-2">
          <span>✓</span> Profile submitted! Check your email for login credentials to access your profile anytime.
        </div>
      )}



      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Information */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Field label="First Name" required>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First name" className={inputCls} />
            </Field>
            <Field label="Middle Name">
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle name" className={inputCls} />
            </Field>
            <Field label="Last Name">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className={inputCls} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Gender" required>
              <select name="gender" value={formData.gender} onChange={handleChange} required className={inputCls}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Date of Birth" required>
              <DatePicker
                value={formData.dateOfBirth}
                onChange={(val) => setFormData((prev) => ({ ...prev, dateOfBirth: val }))}
              />
            </Field>
            <Field label="Mobile No." required>
              <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className={inputCls} />
            </Field>
            <Field label="Email ID" required>
              <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required placeholder="you@example.com" className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Location */}
        <Section title="Location">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Country">
              <SearchableSelect
                value={formData.country}
                onChange={(val) => setFormData((prev) => ({ ...prev, country: val, state: "", city: "" }))}
                options={countries}
                placeholder="Select country"
              />
            </Field>
            <Field label="State">
              <SearchableSelect
                value={formData.state}
                onChange={(val) => setFormData((prev) => ({ ...prev, state: val, city: "" }))}
                options={states}
                placeholder="Select state"
                loading={statesLoading}
                disabled={!formData.country || formData.country === "__other__"}
              />
            </Field>
            <Field label="City">
              <SearchableSelect
                value={formData.city}
                onChange={(val) => setFormData((prev) => ({ ...prev, city: val }))}
                options={cities}
                placeholder="Select city"
                loading={citiesLoading}
                disabled={!formData.state || formData.state === "__other__"}
              />
            </Field>
            <Field label="Pin Code">
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin code" className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Current Status */}
        <Section title="Current Status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {currentStatusOptions.map((item) => (
              <div key={item.value}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="currentStatus" value={item.value}
                    checked={formData.currentStatus === item.value} onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-400" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">{item.label}</span>
                </label>
                {item.inputField && formData.currentStatus === item.value && (
                  <input type="text" name={item.inputField}
                    value={formData[item.inputField as keyof typeof formData] as string}
                    onChange={handleChange} placeholder="Please specify..."
                    className={`mt-2 ml-6 ${inputCls}`} />
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Qualifications */}
        <Section title="Qualifications & Credentials">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-2.5 w-1/3">Qualification</th>
                  <th className="text-left px-4 py-2.5 w-1/3">Year of qualification</th>
                  <th className="text-left px-4 py-2.5 w-1/3">Experience (yrs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {formData.qualificationRows.map((row, index) => (
                  <tr key={row.name} className="hover:bg-blue-50/30 transition">
                    <td className="px-4 py-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" checked={row.checked}
                          onChange={(e) => handleQualificationRow(index, "checked", e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300" />
                        <span className="text-gray-700">{row.name}</span>
                      </label>
                    </td>
                    <td className="px-4 py-2">
                      <input type="number" min="1950" max="2099" placeholder="YYYY" value={row.year}
                        onChange={(e) => handleQualificationRow(index, "year", e.target.value)}
                        disabled={!row.checked}
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition" />
                    </td>
                    <td className="px-4 py-2">
                      <input type="number" min="0" placeholder="e.g. 5" value={row.experience}
                        onChange={(e) => handleQualificationRow(index, "experience", e.target.value)}
                        disabled={!row.checked}
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile list */}
          <div className="sm:hidden space-y-3">
            {formData.qualificationRows.map((row, index) => (
              <div key={row.name} className="border border-gray-100 rounded-xl p-3">
                <label className="flex items-center gap-2.5 cursor-pointer mb-2">
                  <input type="checkbox" checked={row.checked}
                    onChange={(e) => handleQualificationRow(index, "checked", e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-gray-300" />
                  <span className="text-sm font-medium text-gray-700">{row.name}</span>
                </label>
                {row.checked && (
                  <div className="grid grid-cols-2 gap-2 ml-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Year</p>
                      <input type="number" min="1950" max="2099" placeholder="YYYY" value={row.year}
                        onChange={(e) => handleQualificationRow(index, "year", e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Experience (yrs)</p>
                      <input type="number" min="0" placeholder="e.g. 5" value={row.experience}
                        onChange={(e) => handleQualificationRow(index, "experience", e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Software Knowledge */}
        <Section title="Software Working Knowledge">
          <CheckboxGroup field="softwareKnowledge" checkedValues={formData.softwareKnowledge} onChange={handleCheckboxChange}
            options={["SAP", "Oracle Netsuite", "Microsoft Dynamics 365", "Busy", "Tally", "Joho Books", "Quick Books", "Other"]}
            otherField="softwareOther" otherValue={formData.softwareOther} onOtherChange={handleChange} />
        </Section>

        {/* Specialization */}
        <Section title="Specialization">
          <CheckboxGroup field="specialization" checkedValues={formData.specialization} onChange={handleCheckboxChange}
            options={["Ind AS", "IGAAP", "US GAAP", "ICFR", "Fixed Asset Verification", "Accounts Receivable Process", "Accounts Payable Process", "General Ledger Process", "Financial Statement Closure Process", "Legal Due Diligence", "Capital Market Transaction", "Forensic Audit", "Statutory Audit", "Internal Audit", "Tax Audit", "Indirect Tax", "Direct Tax", "Valuations", "Insolvency", "Stock Audit", "IT Audit", "SEBI Compliances", "Company Law Compliances", "RBI Compliances", "Other"]}
            otherField="specializationOther" otherValue={formData.specializationOther} onOtherChange={handleChange} />
        </Section>

        {/* Prior Work Experience */}
        <Section title="Prior Work Experience">
          <CheckboxGroup field="priorWorkExperience" checkedValues={formData.priorWorkExperience} onChange={handleCheckboxChange}
            options={["Big 4", "Listed Company", "Bank", "NBFC", "Manufacturing Company", "Real Estate Company", "e-Commerce Company", "Pharma Company", "Infrastructure Company", "Other"]}
            otherField="priorWorkOther" otherValue={formData.priorWorkOther} onOtherChange={handleChange} />
        </Section>

        {/* Service Availability */}
        <Section title="Service Availability">
          <CheckboxGroup field="serviceAvailability" checkedValues={formData.serviceAvailability} onChange={handleCheckboxChange}
            options={["Part-time basis (Onsite)", "Part-time basis (Online)", "Full-time basis (Onsite)", "Full-time basis (Online)", "Retainership basis", "Assignment basis", "Virtual consulting", "Other"]}
            otherField="serviceOther" otherValue={formData.serviceOther} onOtherChange={handleChange} />
        </Section>

        {/* Geographic Coverage */}
        <Section title="Geographic Service Coverage (willing to work)">
          <CheckboxGroup field="geographicCoverage" checkedValues={formData.geographicCoverage} onChange={handleCheckboxChange}
            options={["Local city only", "State-wide", "Pan-India", "International remote"]} />
        </Section>

        {/* Additional Info */}
        <Section title="Additional Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="LinkedIn URL">
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile" className={inputCls} />
            </Field>
            <Field label="Attachment (Upto 5MB)">
              <label className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border-0 whitespace-nowrap">Choose File</span>
                <span className="text-gray-500 truncate">
                  {formData.attachment
                    ? formData.attachment.name
                    : formData.savedAttachmentName
                    ? formData.savedAttachmentName
                    : "No file chosen"}
                </span>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
              {formData.savedAttachmentName && !formData.attachment && (
                <p className="text-xs text-gray-400 mt-1">Previously uploaded — select new file to replace</p>
              )}
            </Field>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex flex-wrap items-center gap-3 pt-2 pb-8">
          <button type="submit" disabled={submitLoading}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
            {submitLoading && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {submitLoading ? "Submitting..." : "Submit Profile"}
          </button>
          <button type="button" onClick={handleReset}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all">
            Clear
          </button>
          <p className="text-xs text-gray-400 w-full sm:w-auto sm:ml-auto">* Required fields. Login credentials sent after submission.</p>
        </div>

      </form>
    </section>
  );
};

export default PersonalInformation;
