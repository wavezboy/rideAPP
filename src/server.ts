import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT, () => {
      console.log(`connected to ${process.env.PORT}`);
    });
  })
  .catch(console.error);
