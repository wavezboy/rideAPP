import express from "express";
import * as rideRequestController from "../controller/rideRequest-controller";

const router = express.Router();

router.post("/create-ride-request", rideRequestController.createRideRequest);
router.post("/match-ride-request", rideRequestController.matchRideRequest);
router.post(
  "/cancel-ride-request/:requestId",
  rideRequestController.cancelRideRequest
);
router.get("get-ride-request", rideRequestController.getRideRequest);
export default router;
