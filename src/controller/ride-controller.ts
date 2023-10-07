import { RequestHandler } from "express";
import rideModel from "../models/rideModel";
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
    const ride = await rideModel.findOne({ rideId }).exec();

    if (!ride) {
      return res.status(404).json("ride not found");
    }

    ride.start_time = new Date();

    ride.save();

    const rideRequestId = ride.ride_request_id;

    const rideRequest = await rideRequestModel.findOne(rideRequestId);

    if (!rideRequest) {
      return res.status(404).json("associated ride request not found");
    }

    rideRequest.status = "ongoing";

    rideRequest.save();

    res.status(200).json(ride);
  } catch (error) {
    next(error);
  }
};

export const completRide: RequestHandler<
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
  } catch (error) {
    next(error);
  }
};
