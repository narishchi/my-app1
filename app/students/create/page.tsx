
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { studentSchema } from "../validation";
import CreateStudentForm from "./create-student-form";

type FormState = {
  success: boolean;
  errors?: {
    studentCode?: string[];
    name?: string[];
    email?: string[];
    major?: string[];
    year?: string[];
  };
};

async function createStudent(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const result = studentSchema.safeParse({
    studentCode: formData.get("studentCode"),
    name: formData.get("name"),
    email: formData.get("email"),
    major: formData.get("major"),
    year: Number(formData.get("year")),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.student.create({
      data: result.data,
    });
  } catch {
    return {
      success: false,
      errors: {
        studentCode: ["รหัสนักศึกษานี้มีอยู่แล้ว"],
      },
    };
  }

  redirect("/students");
}

export default function CreateStudentPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-medium tracking-[0.2em] text-blue-200">
            MY WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            เพิ่มนักศึกษา
          </h1>

          <p className="mt-2 text-sm leading-6 text-blue-100">
            กรอกข้อมูลเพื่อเพิ่มนักศึกษาใหม่เข้าสู่ระบบ
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

        {/* Form container */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🎓
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  ข้อมูลนักศึกษา
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  กรุณากรอกข้อมูลให้ครบถ้วน
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <CreateStudentForm action={createStudent} />
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-slate-400">
          Student Management · My Workspace
        </p>
      </div>
    </main>
  );
}
