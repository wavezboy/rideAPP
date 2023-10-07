import { RequestHandler } from "express";
import { location } from "./driver-controller";
import rideRequestModel from "../models/ride-request-model";
import CreateHttpError from "http-errors";
import driverModel from "../models/driverModel";
import rideModel from "../models/rideModel";

import { calculateDistance } from "../utils/calculateDistance";

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
      startLocation: {
        types: "Point",
        coordinates: [start_location.latitude, start_location.longitude],
      },
      endLocation: {
        types: "Point",
        coordinates: [end_location.latitude, end_location.longitude],
      },
      status: "pending",
    });

    res
      .status(201)
      .json({ message: "your ride request have been created", newRequest });
  } catch (error) {
    next(error);
  }
};

export const matchRideRequest: RequestHandler = async (req, res, next) => {
  const passenger_id = "";
  const rideRequest = await rideRequestModel.findOne({ passenger_id }).exec();
  try {
    if (!rideRequest) {
      res.status(500).json("ride request not found or already mathched");
      throw CreateHttpError(500, "ride request not found or already mathched");
    }

    // Find available drivers within a certain radius of the passenger's start location
    const maxDistanceInMeters = 5000; // Maximum distance for matching

    const availableDrivers = await driverModel.find({
      availability: true,
      currentLocation: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: rideRequest.startLocation,
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
    });

    // Implement logic to choose the best-matched driver
    let bestMatchedDriver = await driverModel.findById({}).exec();
    let bestMatchedDistance = Number.MAX_VALUE;

    for (const driver of availableDrivers) {
      // calculating the distance between driver and request
      const driverLocation = driver.currentLocation?.coordinates;
      const passengerLocation = rideRequest!.startLocation?.coordinates;

      if (!(driverLocation && passengerLocation)) {
        throw CreateHttpError(
          404,
          "driver location or passenger location not available"
        );
      }

      const distance = calculateDistance(passengerLocation, driverLocation);

      // check if distance is closer to the request than the current best match

      if (distance < bestMatchedDistance) {
        bestMatchedDistance = distance;
        bestMatchedDriver = driver;
      }
    }

    //  update the match request with selected driver

    if (bestMatchedDriver) {
      rideRequest.driver_id = bestMatchedDriver.driver_id;
      rideRequest.status = "matched";

      await rideRequest.save();
      res
        .status(200)
        .json({ message: "driver macthed succesfully ", rideRequest });
    } else {
      res
        .status(404)
        .json({ error: "no available driver within specified range" });
    }
  } catch (error) {
    next(error);
  }
};

interface reqBody {
  requestId: string;
}

export const cancelRideRequest: RequestHandler<
  reqBody,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const passengerId = "";
  const requestId = req.params.requestId;
  try {
    const rideRequest = await rideRequestModel.findOne({
      passenger_id: passengerId,
      _id: requestId,
    });

    if (!rideRequest) {
      return res.status(404).json("ride request not found");
    }

    rideRequest.status = "canceled";

    await rideRequest.save();
    res
      .status(200)
      .json({ message: "ride request can canceled succesfully", rideRequest });
  } catch (error) {
    next(error);
  }
};

export const getRideRequest: RequestHandler = async (req, res, next) => {
  const driverId = "";
  try {
    const rideRequests = await rideRequestModel.findOne({
      driver_id: driverId,
      status: "matched",
    });

    if (!rideRequests) {
      return res.status(404).json("no request available");
    }

    res.status(200).json({ rideRequests });
  } catch (error) {
    next(error);
  }
};

interface RidereqBody {
  rideRequestId: string;
}

export const acceptRideRequest: RequestHandler<
  RidereqBody,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const rideRequestId = req.params.rideRequestId;
  try {
    const rideRequest = await rideRequestModel.findOne({ _id: rideRequestId });

    if (!rideRequest) {
      return res.status(404).json("ride not found");
    }

    const ride = await rideModel.create({
      driver_id: rideRequest.driver_id,
      passenger_id: rideRequest.passenger_id,
    });

    res.status(200).json(ride);
  } catch (error) {
    next(error);
  }
};
