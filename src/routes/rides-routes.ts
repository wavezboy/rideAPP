import express from "express";
import * as rideControlerr from "../controller/ride-controller";

const router = express.Router();

router.post("/start-ride/:rideId", rideControlerr.startRide);
router.post("/complete-ride/:rideId", rideControlerr.completRide);
router.post("/get-ride-history", rideControlerr.getRideHistory);

export default router;
