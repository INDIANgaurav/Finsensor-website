import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PersonalInformation from "@/models/PersonalInformation";
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

    let users: { firstName: string; emailId: string }[] = [];
    if (recipients === "all") {
      users = await PersonalInformation.find({ emailId: { $exists: true, $ne: "" } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    } else if (Array.isArray(recipients) && recipients.length > 0) {
      users = await PersonalInformation.find({ _id: { $in: recipients } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    }

    if (users.length === 0) return NextResponse.json({ message: "No recipients found" }, { status: 400 });

    const results = await Promise.allSettled(
      users.map((u) => sendUpdateEmail(u.emailId, u.firstName || "User", subject, content))
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;

    // Save log
    await EmailLog.create({
      subject,
      content,
      sentTo: recipients === "all" ? "all" : "selected",
      recipientCount: sent,
      recipients: users.map((u) => u.emailId),
    });

    return NextResponse.json({ message: `Sent: ${sent}`, sent }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
