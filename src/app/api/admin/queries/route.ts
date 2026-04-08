import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Query from "@/models/Query";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    // Only show queries from active users
    const activeUsers = await User.find({}, "_id").lean();
    const activeUserIds = activeUsers.map((u) => u._id.toString());

    const queries = await Query.find({ userId: { $in: activeUserIds } })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ queries });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
