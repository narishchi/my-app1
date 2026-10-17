
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const studentId = Number(id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return NextResponse.json(
        { message: "รหัสนักศึกษาไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        studentCode: body.studentCode,
        name: body.name,
        email: body.email || null,
        major: body.major,
        year: Number(body.year),
        status: body.status === undefined ? true : Boolean(body.status),
      },
    });

    return NextResponse.json(student);
  } catch (error) {
  console.error("PUT /api/students/[id] error:", error);

  return NextResponse.json(
    { message: "ไม่สามารถแก้ไขข้อมูลนักศึกษาได้" },
    { status: 400 },
  );
}
  }
export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const studentId = Number(id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return NextResponse.json(
        { message: "รหัสนักศึกษาไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    const student = await prisma.student.delete({
      where: { id: studentId },
    });

    return NextResponse.json({
      message: "ลบข้อมูลนักศึกษาสำเร็จ",
      student,
    });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);

    return NextResponse.json(
      { message: "ไม่สามารถลบข้อมูลนักศึกษาได้" },
      { status: 400 },
    );
  }
}
