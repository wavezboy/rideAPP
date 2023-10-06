import { RequestHandler } from "express";

interface driverBody {
  vehicleInfo: string;
  licensePlate: string;
}

export const registerDriver: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};
