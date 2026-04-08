import mongoose, { Schema, Document, models } from "mongoose";

export interface IEmailLog extends Document {
  subject: string;
  content: string;
  sentTo: "all" | "selected";
  recipientCount: number;
  recipients: string[];
  createdAt: Date;
}

const EmailLogSchema = new Schema<IEmailLog>(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sentTo: { type: String, enum: ["all", "selected"] },
    recipientCount: { type: Number, default: 0 },
    recipients: [{ type: String }],
  },
  { timestamps: true }
);

const EmailLog = models.EmailLog || mongoose.model<IEmailLog>("EmailLog", EmailLogSchema);
export default EmailLog;
