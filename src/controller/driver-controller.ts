import { RequestHandler } from "express";
import driverModel from "../models/driverModel";
import CreateHttpError from "http-errors";

interface driverBody {
  vehicleInfo: string;
  licensePlate: string;
}

export const registerDriver: RequestHandler<
  unknown,
  unknown,
  driverBody,
  unknown
> = async (req, res, next) => {
  const { licensePlate, vehicleInfo } = req.body;
  //   set the userId as the driver id
  const driver_id = "";
  try {
    // check existingDriver
    const existingDriver = await driverModel.findOne({}).exec();

    if (existingDriver) {
      res.status(500).json("user is already a driver");
    }

    const driver = driverModel.create({
      driver_id: driver_id,
      vehicle_info: vehicleInfo,
      availability: false,
      current_location: null,
    });

    res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
};

export const updateDriverAvailaibilty: RequestHandler = async (
  req,
  res,
  next
) => {
  const authenticatedId = "";
  const availability = req.body;
  try {
    const driver = await driverModel.findById(authenticatedId).exec();

    if (!driver) {
      res.status(500).json("driver not found");
      throw CreateHttpError(500, "driver not found");
    }

    driver.availability = availability;

    const updateDriver = await driver.save();

    res
      .status(201)
      .json({ message: "driver availaibilty updated", updateDriver });
  } catch (error) {
    next(error);
  }
};

export interface location {
  latitude: number;
  longitude: number;
}

export const updateDriverLocation: RequestHandler<
  unknown,
  unknown,
  location,
  unknown
> = async (req, res, next) => {
  const { latitude, longitude } = req.body;
  const authenticatedId = "";
  try {
    const driver = await driverModel.findById({}).exec();

    if (!driver) {
      res.status(500).json("no driver found");
      throw CreateHttpError(500, "no driver found");
    }

    driver.currentLocation = {
      coordinates: [latitude, longitude],
      types: "Point",
    };

    const updatedDriver = await driver.save();

    res.status(201).json({ message: "driver location updated", updatedDriver });
  } catch (error) {
    next(error);
  }
};
