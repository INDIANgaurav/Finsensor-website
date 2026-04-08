import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Query from "@/models/Query";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const query = await Query.findById(params.id);
    if (!query) return NextResponse.json({ message: "Not found" }, { status: 404 });

    query.status = "closed";
    await query.save();

    return NextResponse.json({ query });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
