import express from "express";
import * as driverContrller from "../controller/driver-controller";

const router = express.Router();

router.post("/register", driverContrller.registerDriver);
router.post("/update-availability", driverContrller.updateDriverAvailaibilty);
router.post("/update-location", driverContrller.updateDriverLocation);

export default router;
