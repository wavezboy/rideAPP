import { RequestHandler } from "express";
import driverModel from "../models/driverModel";

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
    const existingDriver = await driverModel.findOne({});

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
