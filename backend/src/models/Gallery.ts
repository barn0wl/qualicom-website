// backend/src/models/Gallery.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  url: string;
  caption: string;
  category: string;
  date?: string;
}

const GallerySchema = new Schema<IGallery>(
  {
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Réseaux & Télécoms", "Informatique", "BTP", "Énergie"],
    },
    date: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGallery>("Gallery", GallerySchema);
