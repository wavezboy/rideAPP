import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await userModel.findOne({ username });
    if (!user) {
      return;
    }
  })
);

export default passport;
