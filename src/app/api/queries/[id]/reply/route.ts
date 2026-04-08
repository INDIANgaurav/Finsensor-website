import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Query from "@/models/Query";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { sendUpdateEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ message: "Message required" }, { status: 400 });

    await connectDB();
    const query = await Query.findById(params.id);
    if (!query) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const isAdmin = session.role === "admin";

    if (!isAdmin && query.userId !== session.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    query.messages.push({ sender: isAdmin ? "admin" : "user", content, createdAt: new Date() });
    query.status = isAdmin ? "replied" : "open";
    await query.save();

    // Send email notification
    try {
      if (isAdmin) {
        // Notify user
        await sendUpdateEmail(
          query.userEmail, query.userName,
          `Re: ${query.subject}`,
          `<p>Admin has replied to your query <strong>"${query.subject}"</strong>:</p><blockquote style="border-left:3px solid #283c91;padding-left:12px;color:#374151;">${content}</blockquote>`
        );
      } else {
        // Notify all admins from DB
        const admins = await User.find({ role: "admin" }, "email name").lean();
        await Promise.all(admins.map((admin) =>
          sendUpdateEmail(
            admin.email, admin.name || "Admin",
            `Follow-up: ${query.subject} — ${query.userName}`,
            `<p><strong>${query.userName}</strong> (${query.userEmail}) sent a follow-up on query <strong>"${query.subject}"</strong>:</p>
             <blockquote style="border-left:3px solid #e97944;padding-left:12px;color:#374151;">${content}</blockquote>`
          ).catch(() => {})
        ));
      }
    } catch { /* non-blocking */ }

    return NextResponse.json({ query });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
