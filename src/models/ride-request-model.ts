import { InferSchemaType, Schema, model } from "mongoose";

const rideRequestSchema = new Schema(
  {
    passenger_id: { type: String },
    startLocation: {
      types: {
        type: String,
        enum: ["Point"], // Specify the type as 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Store [longitude, latitude]
        required: true,
      },
    },
    endLocation: {
      types: {
        type: String,
        enum: ["Point"], // Specify the type as 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Store [longitude, latitude]
        required: true,
      },
    },
    status: { type: String },
    driver_id: { type: String },
    estimated_fare: { type: String },
    // ride_id: { type: Types.ObjectId },
  },
  { timestamps: true }
);

type ride = InferSchemaType<typeof rideRequestSchema>;

rideRequestSchema.index({ startLocation: "2dsphere", endLocation: "2dsphere" });

export default model<ride>("ride", rideRequestSchema);
