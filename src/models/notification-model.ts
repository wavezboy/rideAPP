import { InferSchemaType, Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    user_id: { type: String },
    message: { type: String },
    isRead: { type: Boolean },
  },
  { timestamps: true }
);

type notification = InferSchemaType<typeof notificationSchema>;

export default model<notification>("notification", notificationSchema);
