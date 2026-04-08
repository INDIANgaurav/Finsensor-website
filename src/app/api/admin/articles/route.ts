import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Article from "@/models/Article";
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
    const articles = await Article.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { title, content, recipients } = await req.json();
    if (!title?.trim() || !content?.trim()) return NextResponse.json({ message: "Title and content required" }, { status: 400 });

    await connectDB();

    let users: { firstName: string; emailId: string }[] = [];
    if (recipients === "all") {
      users = await PersonalInformation.find({ emailId: { $exists: true, $ne: "" } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    } else if (Array.isArray(recipients) && recipients.length > 0) {
      users = await PersonalInformation.find({ _id: { $in: recipients } }).select("firstName emailId").lean() as { firstName: string; emailId: string }[];
    }

    const results = await Promise.allSettled(
      users.map((u) => sendUpdateEmail(u.emailId, u.firstName || "User", title, content))
    );
    const sent = results.filter((r) => r.status === "fulfilled").length;

    const article = await Article.create({ title, content, sentTo: recipients === "all" ? "all" : "selected", recipientCount: sent });

    await EmailLog.create({
      subject: title, content, sentTo: recipients === "all" ? "all" : "selected",
      recipientCount: sent, recipients: users.map((u) => u.emailId),
    });

    return NextResponse.json({ article, sent }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
