"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import PersonalInformationPage from "./personal-information/page";
import PostQueries from "./post-queries/page";

function FinSensorConnectInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "personal-information";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to right, #F9F8FC, rgba(220,197,255,0.21))" }}>
      {/* Tab Bar */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex justify-center gap-4 py-3">
          <button
            onClick={() => router.push("/finsensor-connect?tab=personal-information")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === "personal-information" ? "bg-gradient-to-r from-[#283c91] to-purple-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
            Information Required
          </button>
          <button
            onClick={() => router.push("/finsensor-connect?tab=post-queries")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === "post-queries" ? "bg-gradient-to-r from-[#283c91] to-purple-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
            Post Queries
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {tab === "personal-information" ? <PersonalInformationPage /> : <PostQueries />}
    </div>
  );
}

export default function FinSensorConnectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FinSensorConnectInner />
    </Suspense>
  );
}
