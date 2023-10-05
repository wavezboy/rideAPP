import { InferSchemaType, Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    ride_id: { type: String },
    payer_id: { type: String },
    amount: { type: String },
    payment_status: { type: String },
  },
  { timestamps: true }
);

type payment = InferSchemaType<typeof paymentSchema>;

export default model<payment>("payment", paymentSchema);
