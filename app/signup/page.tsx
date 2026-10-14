"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "สมัครสมาชิกไม่สำเร็จ");
        return;
      }

      setSuccess("สมัครสมาชิกสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...");
      setTimeout(() => router.push("/login"), 1000);
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-blue-950/10 md:grid-cols-2">
        {/* Left panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-10 text-white md:flex">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative">
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-bold shadow-lg">
              S
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
              Welcome aboard
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Create your
              <br />
              account.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/80">
              เริ่มต้นใช้งานระบบได้ง่าย ๆ เพียงสร้างบัญชีของคุณ
              เพื่อเข้าถึงฟังก์ชันต่าง ๆ ได้ในที่เดียว
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold">
                Simple. Secure. Convenient.
              </p>
            </div>
            <p className="text-sm leading-6 text-blue-100/70">
              สมัครสมาชิกเพื่อเริ่มต้นประสบการณ์ใช้งานของคุณ
            </p>
          </div>
        </section>

        {/* Signup form */}
        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-12">
          <div className="mx-auto max-w-md">
            <div className="mb-7 md:hidden">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-xl font-bold text-white shadow-lg shadow-blue-700/20">
                S
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Create account
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 hidden text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 md:block">
                Get started today
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                สมัครสมาชิก
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้ใหม่
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  ชื่อ-นามสกุล
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  อีเมล
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="อย่างน้อย 8 ตัวอักษร"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-slate-400">
                  ใช้รหัสผ่านอย่างน้อย 8 ตัวอักษร
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={inputClass}
                />

                <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-700"
                  />
                  แสดงรหัสผ่าน
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    กำลังสมัครสมาชิก...
                  </>
                ) : (
                  "สร้างบัญชี"
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">หรือ</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              มีบัญชีอยู่แล้ว?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-700 transition hover:text-blue-900 hover:underline"
              >
                เข้าสู่ระบบ
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              บัญชีที่สมัครใหม่จะได้รับสิทธิ์ผู้ใช้ทั่วไป
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
