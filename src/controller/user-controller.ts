import { RequestHandler } from "express";
import { RegisterBody, validateRegisterInput } from "../utils/registerValidate";
import userModel from "../models/userModel";
import { hashData } from "../utils/dataHashing";
import { email } from "envalid";

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  try {
    //   check validation
    if (isValid) {
      res.status(500).json(errors);
    }

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "a user with that email already existed" });
    }

    const hashedPassword = await hashData(req.body.password);
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
