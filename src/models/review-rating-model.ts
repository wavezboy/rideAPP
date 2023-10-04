import { InferSchemaType, Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    ride_id: { type: String },
    authour_id: { type: String },
    rating: { type: String },
    comment: { type: String },
  },
  { timestamps: true }
);

type review = InferSchemaType<typeof reviewSchema>;

export default model<review>("review", reviewSchema);
