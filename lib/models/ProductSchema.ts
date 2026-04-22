import mongoose, { Schema, Document, Model } from "mongoose";


const NoteItemSchema = new Schema(
  {
    name:  { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const SizeSchema = new Schema(
  {
    slug:      { type: String, required: true, unique: true },
    label:     { type: String, required: true },
    ml:        { type: Number, required: true },
    price:     { type: Number, required: true },
    onSale:    { type: Boolean, default: false },
    salePrice: { type: Number, default: null },
    sku:       { type: String, required: true, unique: true },
    in_stock:  { type: Boolean, default: true },
    stock:     { type: Number, required: true, min: 0 },
    images:    [{ type: String }],
  },
  { _id: false }
);


export interface IPerfume extends Document {
  slug:        string;
  name:        string;
  categories:  string[];
  tagline:     string;
  description: string;
  mainImage:   string;
  gender:      "men" | "women" | "unisex";
  longevity:   string;
  notes: {
    top:   { name: string; image: string }[];
    heart: { name: string; image: string }[];
    base:  { name: string; image: string }[];
  };
  sizes: {
    slug:      string;
    label:     string;
    ml:        number;
    price:     number;
    onSale:    boolean;
    salePrice: number | null;
    sku:       string;
    in_stock:  boolean;
    stock:     number;
    images:    string[];
  }[];
}

const PerfumeSchema = new Schema<IPerfume>(
  {
    slug:        { type: String, required: true, unique: true },
    name:        { type: String, required: true },
    categories:  [{ type: String }],
    tagline:     { type: String },
    description: { type: String },
    mainImage:   { type: String, required: true },
    gender:      { type: String, enum: ["men", "women", "unisex"], required: true },
    longevity:   { type: String },
    notes: {
      top:   [NoteItemSchema],
      heart: [NoteItemSchema],
      base:  [NoteItemSchema],
    },
    sizes: [SizeSchema],
  },
  { timestamps: true }
);


PerfumeSchema.index({ slug: 1 });
PerfumeSchema.index({ categories: 1 });
PerfumeSchema.index({ gender: 1 });
PerfumeSchema.index({ "sizes.sku": 1 });


const Perfume: Model<IPerfume> =
  mongoose.models.Perfume ?? mongoose.model<IPerfume>("Perfume", PerfumeSchema);

export default Perfume;