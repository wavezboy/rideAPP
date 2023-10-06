import { RequestHandler } from "express";
import { location } from "./driver-controller";
import rideRequestModel from "../models/ride-request-model";

interface requestBody {
  start_location: location;
  end_location: location;
}

export const createRideRequest: RequestHandler<
  unknown,
  unknown,
  requestBody,
  unknown
> = async (req, res, next) => {
  const passengerId = "";
  const { end_location, start_location } = req.body;
  try {
    const newRequest = await rideRequestModel.create({
      passenger_id: passengerId,
      start_location: start_location,
      end_location: end_location,
      status: "pending",
    });

    res
      .status(201)
      .json({ message: "your ride request have been created", newRequest });
  } catch (error) {
    next(error);
  }
};
