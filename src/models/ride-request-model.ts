import { InferSchemaType, Schema, model } from "mongoose";

const rideRequestSchema = new Schema(
  {
    passenger_id: { type: String },
    start_location: {
      latitude: { type: String },
      longitude: { type: String },
    },
    end_location: { latitude: { type: String }, longitude: { type: String } },
    status: { type: String },
    driver_id: { type: String },
    estimated_fare: { type: String },
  },
  { timestamps: true }
);

type ride = InferSchemaType<typeof rideRequestSchema>;

export default model<ride>("ride", rideRequestSchema);
