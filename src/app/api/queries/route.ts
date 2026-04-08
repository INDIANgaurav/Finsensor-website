import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Query from "@/models/Query";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { sendUpdateEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

// GET — user fetches their own queries
export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ queries: [] });
    await connectDB();
    const queries = await Query.find({ userId: session.id }).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ queries });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST — user submits a new query
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Login required" }, { status: 401 });

    const { subject, content } = await req.json();
    if (!subject?.trim() || !content?.trim()) {
      return NextResponse.json({ message: "Subject and message are required" }, { status: 400 });
    }

    await connectDB();
    const query = await Query.create({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      subject,
      messages: [{ sender: "user", content, createdAt: new Date() }],
    });

    // Notify all admins from DB
    try {
      const admins = await User.find({ role: "admin" }, "email name").lean();
      await Promise.all(admins.map((admin) =>
        sendUpdateEmail(
          admin.email, admin.name || "Admin",
          `New Query: ${subject}`,
          `<p><strong>${session.name}</strong> (${session.email}) submitted a new query:</p>
           <blockquote style="border-left:3px solid #283c91;padding-left:12px;color:#374151;">${content}</blockquote>`
        ).catch(() => {})
      ));
    } catch { /* non-blocking */ }

    return NextResponse.json({ query }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
