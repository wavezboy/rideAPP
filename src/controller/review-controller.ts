import { RequestHandler } from "express";
import userModel from "../models/userModel";
import reviewRatingModel from "../models/review-rating-model";
import rideModel from "../models/rideModel";

interface reqBody {
  reviewerId: string;
  revieweeId: string;
  rating: string;
  comment: string;
}

export const createReview: RequestHandler<
  unknown,
  unknown,
  reqBody,
  unknown
> = async (req, res, next) => {
  const { comment, rating, revieweeId, reviewerId } = req.body;
  try {
    const reviewer = await userModel.findById(reviewerId).exec();
    const ride = await rideModel.findById(revieweeId).exec();

    if (!ride || !reviewer) {
      return res.status(404).json({ error: "Reviewer or Reviewee not found" });
    }

    const review = await reviewRatingModel.create({
      authour_id: reviewerId,
      comment: comment,
      rating: rating,
      ride_id: ride._id,
      driver_id: revieweeId,
    });

    res.status(200).json({ message: "review created succesfully", review });
  } catch (error) {
    next();
  }
};

interface paramsBody {
  DriverId: string;
}

export const getDriverRatings: RequestHandler<
  paramsBody,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { DriverId } = req.params;
  try {
    const driverRatings = await reviewRatingModel.find({ driver_id: DriverId });

    res.status(200).json({ driverRatings });
  } catch (error) {
    next(error);
  }
};
