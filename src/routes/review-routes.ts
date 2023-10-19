import express from "express";
import * as reviewController from "../controller/review-controller";

const router = express.Router();

router.post("create-review", reviewController.createReview);

export default router;
