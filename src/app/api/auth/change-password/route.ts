import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword)
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    if (newPassword.length < 6)
      return NextResponse.json({ message: "New password must be at least 6 characters" }, { status: 400 });

    await connectDB();

    let user = null;

    // Try session first, fallback to email
    const session = await getSession();
    if (session) {
      user = await User.findById(session.id);
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
