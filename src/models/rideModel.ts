import { InferSchemaType, Schema, model } from "mongoose";

const rideSchema = new Schema(
  {
    driver_id: { type: String },
    passenger_id: { type: String },
    start_time: { type: Date },
    end_time: { type: String },
    fare: { type: String },
    distance: { type: String },
  },
  { timestamps: true }
);

type ride = InferSchemaType<typeof rideSchema>;

export default model<ride>("ride", rideSchema);
