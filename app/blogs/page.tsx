import Link from "next/link";
import { Suspense } from "react";
import LogoutButton from "@/app/components/LogoutButton";

import Blogs from "@/app/ui/blogs";
import MyFallback from "../ui/my-fallback";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          {/* Title */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              NEWS & ARTICLES
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              บล็อกข่าวสาร
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              รวมบทความเทคโนโลยี ความรู้ และข่าวสารที่น่าสนใจ
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  d="m15 18-6-6 6-6M9 12h12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              กลับหน้า Admin
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Intro banner */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 px-6 py-8 text-white shadow-lg shadow-blue-900/10 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              Discover something new
            </span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              อ่าน เรียนรู้ และอัปเดตไปพร้อมกัน
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-100/80 sm:text-base">
              ติดตามเรื่องราวและความรู้ใหม่ ๆ ผ่านบทความที่รวบรวมไว้
              เพื่อช่วยให้คุณไม่พลาดข่าวสารและเทคโนโลยีที่สำคัญ
            </p>
          </div>
        </section>

        {/* Articles */}
        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                รายการบทความ
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                เลือกอ่านบทความที่คุณสนใจ
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <Suspense
              fallback={
                <div className="py-10">
                  <MyFallback />
                </div>
              }
            >
              <Blogs />
            </Suspense>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Blogs & Articles · Technology and Knowledge
        </footer>
      </div>
    </main>
  );
}