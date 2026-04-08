import mongoose, { Schema, Document, models } from "mongoose";

export interface IMessage {
  sender: "user" | "admin";
  content: string;
  createdAt: Date;
}

export interface IQuery extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: "open" | "replied" | "closed";
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ["user", "admin"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuerySchema = new Schema<IQuery>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ["open", "replied", "closed"], default: "open" },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Query = models.Query || mongoose.model<IQuery>("Query", QuerySchema);
export default Query;
