import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name:      string;
  message:   string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name:      { type: String, required: true, trim: true },
    message:   { type: String, required: true, trim: true },
  },
  { timestamps: true }
);


const Review: Model<IReview> =
  mongoose.models.Review ?? mongoose.model<IReview>("Review", ReviewSchema);

export default Review;