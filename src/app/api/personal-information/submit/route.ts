import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import PersonalInformation from "@/models/PersonalInformation";
import { signToken, COOKIE_NAME, getSession } from "@/lib/auth";
import { sendCredentialsEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

function generatePassword(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function generateProfileId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `FSC-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Parse JSON fields
    const body = JSON.parse(formData.get("data") as string);
    const { emailId, firstName } = body;

    if (!emailId || !firstName) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    // Handle file
    const file = formData.get("attachment") as File | null;
    let attachmentData: { name: string; type: string; size: number; base64: string } | null = null;

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ message: "File size must be under 5MB" }, { status: 400 });
      }
      const buffer = await file.arrayBuffer();
      attachmentData = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: Buffer.from(buffer).toString("base64"),
      };
    }

    await connectDB();

    const session = await getSession();
    let userId = session?.id;
    let isNewUser = false;
    let plainPassword = "";

    if (!userId) {
      const existing = await User.findOne({ email: emailId.toLowerCase() });
      if (!existing) {
        plainPassword = generatePassword();
        const hashed = await bcrypt.hash(plainPassword, 10);
        const newUser = await User.create({
          name: firstName,
          email: emailId.toLowerCase(),
          password: hashed,
          role: "user",
        });
        userId = newUser._id.toString();
        isNewUser = true;
      } else {
        userId = existing._id.toString();
      }
    }

    // Sanitize __other__ sentinel values (user clicked "Other" but didn't type)
    const sanitize = (val: unknown) => (val === "__other__" ? "" : val);
    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([k, v]) => [k, sanitize(v)])
    );

    // Upsert form data
    const updatePayload = {
      ...sanitizedBody,
      userId,
      status: "completed",
      ...(attachmentData && { attachment: attachmentData }),
    };

    // Check if a form already exists for this userId
    const existingForm = await PersonalInformation.findOne({ userId });

    if (existingForm) {
      // Update existing form, keep profileId intact
      await PersonalInformation.findOneAndUpdate(
        { userId },
        { $set: updatePayload },
        { returnDocument: "after" }
      );
    } else {
      // New form — generate a unique profileId with retry
      let profileId = generateProfileId();
      let attempts = 0;
      while (attempts < 5) {
        const conflict = await PersonalInformation.findOne({ profileId });
        if (!conflict) break;
        profileId = generateProfileId();
        attempts++;
      }
      await PersonalInformation.create({ ...updatePayload, profileId });
    }

    if (isNewUser && plainPassword) {
      try {
        await sendCredentialsEmail(emailId, firstName, plainPassword);
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    const user = await User.findById(userId);
    const token = signToken({ id: userId!, email: user.email, role: user.role, name: user.name });

    const res = NextResponse.json({
      message: isNewUser
        ? "Profile submitted! Check your email for login credentials."
        : "Profile updated successfully!",
      isNewUser,
    }, { status: 200 });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
