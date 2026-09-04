// backend/src/models/Client.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IClientReference {
  title: string;
  items: string[];
}

export interface IClient extends Document {
  name: string;
  logo: string;
  description: string;
  category: string;
  location?: string;
  references: IClientReference[];
}

const ClientReferenceSchema = new Schema<IClientReference>({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    default: [],
  },
});

const ClientSchema = new Schema<IClient>(
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
    category: {
      type: String,
      required: true,
      enum: ["Télécoms", "Informatique", "BTP", "Énergie"],
    },
    location: {
      type: String,
      trim: true,
    },
    references: {
      type: [ClientReferenceSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IClient>("Client", ClientSchema);