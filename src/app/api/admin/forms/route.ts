import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // Get all active user IDs
    const activeUsers = await User.find({}, "_id").lean();
    const activeUserIds = activeUsers.map((u) => u._id.toString());

    const filter: Record<string, unknown> = { userId: { $in: activeUserIds } };
    if (status) filter.status = status;

    const forms = await PersonalInformation.find(filter)
      .select("firstName lastName emailId mobileNo country state city currentStatus status profileId createdAt updatedAt")
      .sort({ updatedAt: -1 });

    return NextResponse.json({ forms }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
