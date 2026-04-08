import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ form: null }, { status: 200 });
    if (session.role === "admin") return NextResponse.json({ redirect: "admin" }, { status: 200 });

    await connectDB();
    const form = await PersonalInformation.findOne({ userId: session.id });
    return NextResponse.json({ form: form || null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
