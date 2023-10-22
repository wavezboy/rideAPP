import { RequestHandler } from "express";
import { RegisterBody, validateRegisterInput } from "../utils/registerValidate";
import userModel from "../models/userModel";
import { hashData, verifyHashedData } from "../utils/dataHashing";
import { email } from "envalid";
import { loginBody, loginValidate } from "../utils/loginValidate";
import passport from "passport";
import jwt from "jsonwebtoken";

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
    if (!isValid) {
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

export const login: RequestHandler<
  unknown,
  unknown,
  loginBody,
  unknown
> = async (req, res, next) => {
  // form validation

  const { errors, isValid } = loginValidate(req.body);
  try {
    if (!isValid) {
      res.status(500).json(errors);
    }

    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json("no user asscociated with provided email");
    }

    const hashedPassword = user!.password;

    const passwordMatch = await verifyHashedData(
      hashedPassword,
      req.body.password
    );

    if (!passwordMatch) {
      res.status(400).json("Incorrect passwword");
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
