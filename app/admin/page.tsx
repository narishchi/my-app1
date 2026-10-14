
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";

export default async function AdminPage() {
  const session = await auth();

  // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ไปหน้า Login
  if (!session?.user) {
    redirect("/login");
  }

  // ถ้าไม่ใช่ ADMIN ให้ไปหน้า Unauthorized
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white shadow-lg sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-200">
              MY WORKSPACE
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              จัดการระบบและข้อมูลนักศึกษา
            </p>
          </div>

          <LogoutButton />
        </header>

        {/* Welcome */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            ยินดีต้อนรับ {session.user.name || "Admin"}
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 break-all font-medium text-slate-800">
                {session.user.email}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-1 font-semibold text-blue-700">
                {session.user.role}
              </p>
            </div>
          </div>
        </section>

        {/* Management Menu */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            เมนูจัดการระบบ
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Student Management */}
            <Link
              href="/students"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                👨‍🎓
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800 group-hover:text-blue-700">
                จัดการข้อมูลนักศึกษา
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ดูรายชื่อนักศึกษา เพิ่มข้อมูล แก้ไข และจัดการข้อมูลนักศึกษา
              </p>

              <div className="mt-5 font-semibold text-blue-700">
                เข้าสู่หน้าจัดการนักศึกษา →
              </div>
            </Link>

            {/* Blogs */}
            <Link
              href="/blogs"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                📰
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800 group-hover:text-indigo-700">
                ดูหน้า Blogs
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                เปิดดูหน้าข่าวสารและเนื้อหาของระบบ
              </p>

              <div className="mt-5 font-semibold text-indigo-700">
                ไปยังหน้า Blogs →
              </div>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-400">
          Admin Dashboard · My Workspace
        </footer>
      </div>
    </main>
  );
}
