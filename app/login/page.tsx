
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      // ให้ Server ตรวจสอบ Role แล้วพาไปหน้าที่ถูกต้อง
      router.replace("/auth/redirect");
      router.refresh();
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl md:grid-cols-2">
        {/* Left panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-10 text-white md:flex">
          <div className="absolute -right-16 top-24 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-32 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-bold">
              M
            </div>
            <p className="mt-5 text-sm font-medium tracking-[0.2em] text-blue-200">
              MY WORKSPACE
            </p>
          </div>

          <div className="relative my-12">
            <p className="mb-4 text-sm font-medium text-blue-200">
              ยินดีต้อนรับ
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              เข้าถึงพื้นที่
              <br />
              ทำงานของคุณ
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-blue-100/80">
              เข้าสู่ระบบเพื่อจัดการข้อมูลและติดตามข่าวสารได้ในที่เดียว
            </p>
          </div>

          <p className="relative text-xs text-blue-200/70">
            Secure access · Simple experience
          </p>
        </section>

        {/* Login form */}
        <section className="p-6 sm:p-10 md:p-12">
          <div className="mx-auto max-w-sm">
            <div className="mb-8 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                M
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-blue-600">
                WELCOME BACK
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                เข้าสู่ระบบ
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                กรอกข้อมูลของคุณเพื่อเข้าสู่บัญชี
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  placeholder="name@example.com"
                  required
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
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">
                หรือเข้าสู่ระบบด้วย
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/auth/redirect",
                })
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              Login with GitHub
            </button>

            <p className="mt-8 text-center text-sm text-slate-500">
              ยังไม่มีบัญชี?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                สมัครสมาชิก
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
