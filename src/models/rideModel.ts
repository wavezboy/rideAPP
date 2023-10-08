import { InferSchemaType, Schema, Types, model } from "mongoose";

const rideSchema = new Schema(
  {
    driver_id: { type: String },
    passenger_id: { type: String },
    start_time: { type: Date },
    end_time: { type: Date },
    fare: { type: Number },
    distance: { type: String },
    ride_request_id: { type: Types.ObjectId },
  },
  { timestamps: true }
);

type ride = InferSchemaType<typeof rideSchema>;

export default model<ride>("ride", rideSchema);
