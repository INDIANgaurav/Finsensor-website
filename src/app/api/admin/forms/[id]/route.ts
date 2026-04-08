import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const form = await PersonalInformation.findById(params.id).lean();
    if (!form) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ form }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
