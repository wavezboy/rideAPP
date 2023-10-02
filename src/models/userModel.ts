import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

type user = InferSchemaType<typeof userSchema>;

export default model<user>("user", userSchema);
