// backend/src/models/Partner.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logo: string;
  description: string;
  location?: string;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPartner>("Partner", PartnerSchema);