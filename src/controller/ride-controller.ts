import { RequestHandler } from "express";
import rideModel from "../models/rideModel";
import rideRequestModel from "../models/ride-request-model";
import { calulateFare } from "../utils/calculateFare";
import stripe from "stripe";
import driverModel from "../models/driverModel";

const stripeSecretKeys = "";

const stripeClient = new stripe(stripeSecretKeys, {
  apiVersion: "2023-08-16",
});
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

  // i have to include the driver account in the driver model

  try {
    const ride = await rideModel.findOne({ rideId }).exec();

    if (!ride) {
      return res.status(404).json("ride not found");
    }

    const driverId = ride.driver_id;

    const driver = await driverModel.findById(driverId).exec();

    if (!driver) {
      return res.status(500).json("no driver found");
    }
    const fare = calulateFare(1000);
    ride.end_time = new Date();
    ride.fare = fare;

    const charge = await stripeClient.charges.create({
      amount: fare,
      currency: "usd",
      source: "stripe-token",
      description: "payment for a ride",
    });
    if (!charge) {
      return res.status(500).json("payment could not be proceed");
    }

    const payout = await stripeClient.payouts.create({
      amount: fare * 10,
      currency: "usd",
      destination: driver.driver_stripe_account_id,
    });

    if (!payout) {
      return res.status(500).json("transaction failed");
    }
  } catch (error) {
    next(error);
  }
};

export const getRideHistory: RequestHandler = async (req, res, next) => {
  const userId = "";
  try {
    const rides = await rideModel
      .find({ $or: [{ passenger_id: userId }, { driver_id: userId }] })
      .populate("passenger_id", "name email")
      .populate("driver_id", "name email");

    if (!rides || rides.length == 0) {
      return res.status(500).json("you havent order any ride yet");
    }

    res.status(200).json({ rides });
  } catch (error) {
    next(error);
  }
};
