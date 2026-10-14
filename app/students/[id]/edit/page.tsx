
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStudent(
  studentId: number,
  formData: FormData,
) {
  "use server";

  const studentCode = String(formData.get("studentCode") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const major = String(formData.get("major") ?? "").trim();
  const year = Number(formData.get("year"));

  if (
    !studentCode ||
    !name ||
    !major ||
    !Number.isInteger(year) ||
    year < 1 ||
    year > 8
  ) {
    throw new Error("กรุณากรอกข้อมูลให้ถูกต้อง");
  }

  await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;
  const studentId = Number(id);

  if (!Number.isInteger(studentId) || studentId <= 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">⚠️</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            ไม่พบข้อมูลนักศึกษา
          </h1>
          <p className="mt-2 text-slate-500">
            รหัสข้อมูลที่ต้องการแก้ไขไม่ถูกต้อง
          </p>
          <Link
            href="/students"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            กลับหน้ารายชื่อนักศึกษา
          </Link>
        </section>
      </main>
    );
  }

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">🔎</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            ไม่พบข้อมูลนักศึกษา
          </h1>
          <p className="mt-2 text-slate-500">
            อาจมีการลบข้อมูลนี้ออกจากระบบแล้ว
          </p>
          <Link
            href="/students"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            กลับหน้ารายชื่อนักศึกษา
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-medium tracking-[0.2em] text-blue-200">
            MY WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            แก้ไขข้อมูลนักศึกษา
          </h1>

          <p className="mt-2 text-sm leading-6 text-blue-100">
            แก้ไขรายละเอียดและบันทึกข้อมูลล่าสุดของนักศึกษา
          </p>

          <div className="mt-6">
            <Link
              href="/students"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <span aria-hidden="true">←</span>
              กลับหน้ารายชื่อนักศึกษา
            </Link>
          </div>
        </header>

        {/* Student summary */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              🎓
            </div>

            <div>
              <p className="text-sm text-slate-500">
                กำลังแก้ไขข้อมูลของ
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-800">
                {student.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Student ID: {student.id}
              </p>
            </div>
          </div>
        </section>

        {/* Edit form */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <h2 className="text-lg font-bold text-slate-800">
              ข้อมูลนักศึกษา
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ตรวจสอบข้อมูลก่อนกดบันทึกการแก้ไข
            </p>
          </div>

          <form
            action={async (formData) => {
              "use server";
              await updateStudent(studentId, formData);
            }}
            className="space-y-5 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="studentCode"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  รหัสนักศึกษา <span className="text-red-500">*</span>
                </label>
                <input
                  id="studentCode"
                  type="text"
                  name="studentCode"
                  defaultValue={student.studentCode}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={student.name}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                  name="email"
                  defaultValue={student.email ?? ""}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="major"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  สาขา <span className="text-red-500">*</span>
                </label>
                <input
                  id="major"
                  type="text"
                  name="major"
                  defaultValue={student.major}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  ชั้นปี <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  defaultValue={String(student.year)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((year) => (
                    <option key={year} value={year}>
                      ชั้นปีที่ {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/students"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ยกเลิก
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                <span aria-hidden="true">✓</span>
                บันทึกการแก้ไข
              </button>
            </div>
          </form>
        </section>

        <footer className="mt-6 text-center text-sm text-slate-400">
          Student Management · My Workspace
        </footer>
      </div>
    </main>
  );
}
