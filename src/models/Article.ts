import mongoose, { Schema, Document, models } from "mongoose";

export interface IArticle extends Document {
  title: string;
  content: string;
  sentTo: "all" | "selected";
  recipientCount: number;
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    sentTo: { type: String, enum: ["all", "selected"], default: "all" },
    recipientCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Article = models.Article || mongoose.model<IArticle>("Article", ArticleSchema);
export default Article;
