// backend/src/models/News.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: "draft" | "published";
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Informatique", "Télécoms", "BTP", "Entreprise", "Événement"],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
NewsSchema.pre("save", function (this: INews) {
  if (this.isNew && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});

export default mongoose.model<INews>("News", NewsSchema);