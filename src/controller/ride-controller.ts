import { RequestHandler } from "express";
import rideModel from "../models/rideModel";

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
    const ride = await rideModel.findOne({ rideId }).exec();

    if (!ride) {
      return res.status(404).json("ride not found");
    }

    ride.start_time = new Date();

    ride.save();

    res.status(200).json(ride);
  } catch (error) {
    next(error);
  }
};
