import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
import User from "@/models/User";
import EmailLog from "@/models/EmailLog";
import { getSession } from "@/lib/auth";
import { sendUpdateEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await connectDB();
    const logs = await EmailLog.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { subject, content, recipients } = await req.json();
    if (!subject?.trim() || !content?.trim()) {
      return NextResponse.json({ message: "Subject and content are required" }, { status: 400 });
    }

    await connectDB();

    // Get admin emails to exclude
    const adminUsers = await User.find({ role: "admin" }).select("email").lean();
    const adminEmails = adminUsers.map((u) => u.email.toLowerCase());

    let users: { firstName: string; emailId: string }[] = [];
    if (recipients === "all") {
      users = await PersonalInformation.find({ emailId: { $exists: true, $ne: "" } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    } else if (Array.isArray(recipients) && recipients.length > 0) {
      users = await PersonalInformation.find({ _id: { $in: recipients } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    }

    // Filter out admin emails and deduplicate
    const uniqueEmails = new Set<string>();
    const filteredUsers = users.filter((u) => {
      const email = u.emailId.toLowerCase();
      if (adminEmails.includes(email)) return false; // Exclude admins
      if (uniqueEmails.has(email)) return false; // Exclude duplicates
      uniqueEmails.add(email);
      return true;
    });

    if (filteredUsers.length === 0) return NextResponse.json({ message: "No recipients found" }, { status: 400 });

    const results = await Promise.allSettled(
      filteredUsers.map((u) => sendUpdateEmail(u.emailId, u.firstName || "User", subject, content))
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;

    // Save log
    await EmailLog.create({
      subject,
      content,
      sentTo: recipients === "all" ? "all" : "selected",
      recipientCount: sent,
      recipients: filteredUsers.map((u) => u.emailId),
    });

    return NextResponse.json({ message: `Sent: ${sent}`, sent }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
