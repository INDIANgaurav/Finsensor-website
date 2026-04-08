import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { status = "incomplete", ...formData } = body;

    await connectDB();

    const filter = session?.id
      ? { userId: session.id }
      : { emailId: formData.emailId };

    const doc = await PersonalInformation.findOneAndUpdate(
      filter,
      { ...formData, userId: session?.id, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ message: "Saved", id: doc._id }, { status: 200 });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
