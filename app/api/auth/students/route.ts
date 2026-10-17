import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(students);
  } catch {
    return NextResponse.json(
      { message: "ไม่สามารถดึงข้อมูลนักศึกษาได้" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const student = await prisma.student.create({
      data: {
        studentCode: body.studentCode,
        name: body.name,
        email: body.email || null,
        major: body.major,
        year: Number(body.year),
        status: body.status === undefined ? true : Boolean(body.status),
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("POST /api/students error:", error);

    return NextResponse.json(
      { message: "ไม่สามารถเพิ่มข้อมูลนักศึกษาได้ กรุณาตรวจสอบข้อมูล" },
      { status: 400 },
    );
  }
}

