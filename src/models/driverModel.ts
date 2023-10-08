import { InferSchemaType, Schema, model } from "mongoose";

const driverSchema = new Schema(
  {
    driver_id: { type: String, required: true },
    vehicle_info: { type: String },
    currentLocation: {
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

    availability: { type: Boolean },
    driver_stripe_account_id: { type: String },
  },
  { timestamps: true }
);

type driver = InferSchemaType<typeof driverSchema>;

driverSchema.index({ current_location: "2dsphere" });

export default model<driver>("driver", driverSchema);
