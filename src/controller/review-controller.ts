import { RequestHandler } from "express";
import userModel from "../models/userModel";

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
    const reviewee = await userModel.findById(revieweeId).exec();
  } catch (error) {
    next();
  }
};
