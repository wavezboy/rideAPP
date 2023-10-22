import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await userModel.findOne({ username });
    if (!user) {
      return done(null, false, { message: "invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: "incorrect password" });
    }

    return done(null, user);
  })
);

export default passport;
