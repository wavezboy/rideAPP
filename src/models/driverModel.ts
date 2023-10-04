import { InferSchemaType, Schema, model } from "mongoose";

const driverSchema = new Schema(
  {
    driver_id: { type: String },
    vehicle_info: { type: String },
    current_location: { type: String },
    availability: { type: Boolean },
  },
  { timestamps: true }
);

type driver = InferSchemaType<typeof driverSchema>;

export default model<driver>("driver", driverSchema);
