import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";
import SearchForm from "./search-form";
import Link from "next/link";

type StudentsPageProps = {
  searchParams: Promise<{
    search?: string;
    major?: string;
    status?: string;
  }>;
};

export default async function StudentsPage({
  searchParams,
}: StudentsPageProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";
  const major = params.major ?? "";
  const status = params.status ?? "";

  const where = {
    ...(search
      ? {
          OR: [
            { studentCode: { contains: search } },
            { name: { contains: search } },
          ],
        }
      : {}),
    ...(major ? { major } : {}),
    ...(status === "active"
      ? { status: true }
      : status === "inactive"
        ? { status: false }
        : {}),
  };

  const [students, totalStudents] = await Promise.all([
    prisma.student.findMany({
      where,
      orderBy: { id: "asc" },
    }),
    prisma.student.count(),
  ]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white shadow-lg">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium tracking-wider text-blue-200">
                MY WORKSPACE
              </p>
              <h1 className="mt-2 text-3xl font-bold">
                Student Management
              </h1>
              <p className="mt-2 text-sm text-blue-100">
                ระบบจัดการข้อมูลนักศึกษา
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                ← กลับหน้า Admin
              </Link>
              <Link
                href="/students/create"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50"
              >
                + เพิ่มนักศึกษา
              </Link>
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              🎓
            </div>
            <div>
              <p className="text-sm text-slate-500">
                {search || major || status
                  ? "จำนวนผลการค้นหา"
                  : "จำนวนนักศึกษาทั้งหมด"}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {students.length} คน
                {(search || major || status) && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    จากทั้งหมด {totalStudents} คน
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        <SearchForm search={search} major={major} status={status} />

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-800">
              รายชื่อนักศึกษา
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ดูและจัดการข้อมูลนักศึกษาที่ตรงกับเงื่อนไข
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {[
                    "ID",
                    "รหัสนักศึกษา",
                    "ชื่อ",
                    "Email",
                    "สาขา",
                    "ชั้นปี",
                    "สถานะ",
                    "จัดการ",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-4 font-semibold"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-slate-100 transition hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                        {student.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-700">
                        {student.studentCode}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">
                        {student.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                        {student.email ?? "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                        {student.major}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                        {student.year}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        {student.status ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            กำลังศึกษา
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            ไม่ใช้งาน
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/students/${student.id}/edit`}
                            className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
                          >
                            แก้ไข
                          </Link>
                          <DeleteButton id={student.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      ไม่พบข้อมูลนักศึกษาที่ตรงกับเงื่อนไข
                      <div className="mt-3">
                        <Link
                          href="/students"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          ล้างตัวกรองและดูข้อมูลทั้งหมด →
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-6 text-center text-sm text-slate-400">
          Student Management · My Workspace
        </footer>
      </div>
    </main>
  );
}
