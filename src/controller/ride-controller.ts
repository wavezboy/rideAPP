import { RequestHandler } from "express";
import rideRequestModel from "../models/ride-request-model";

interface rideReqBody {
  rideId: string;
}

export const startRide: RequestHandler<
  rideReqBody,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const rideId = req.params.rideId;
  try {
    const ride = await rideRequestModel.findOne({ rideId }).exec();
  } catch (error) {
    next(error);
  }
};
