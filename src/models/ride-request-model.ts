import { InferSchemaType, Schema, model } from "mongoose";

const rideRequestSchema = new Schema(
  {
    passenger_id: { type: String },
    start_location: { type: String },
    end_location: { type: String },
    status: { type: String },
    driver_id: { type: String },
    estimated_fare: { type: String },
  },
  { timestamps: true }
);

type ride = InferSchemaType<typeof rideRequestSchema>;

export default model<ride>("ride", rideRequestSchema);
