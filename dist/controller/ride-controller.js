"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRideHistory = exports.completRide = exports.startRide = void 0;
const rideModel_1 = __importDefault(require("../models/rideModel"));
const ride_request_model_1 = __importDefault(require("../models/ride-request-model"));
const calculateFare_1 = require("../utils/calculateFare");
const stripe_1 = __importDefault(require("stripe"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
const stripeSecretKeys = "";
const stripeClient = new stripe_1.default(stripeSecretKeys, {
    apiVersion: "2023-08-16",
});
const startRide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    try {
        const ride = yield rideModel_1.default.findOne({ rideId }).exec();
        if (!ride) {
            return res.status(404).json("ride not found");
        }
        ride.start_time = new Date();
        ride.save();
        const rideRequestId = ride.ride_request_id;
        const rideRequest = yield ride_request_model_1.default.findOne(rideRequestId);
        if (!rideRequest) {
            return res.status(404).json("associated ride request not found");
        }
        rideRequest.status = "ongoing";
        rideRequest.save();
        res.status(200).json(ride);
    }
    catch (error) {
        next(error);
    }
});
exports.startRide = startRide;
const completRide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    // i have to include the driver account in the driver model
    try {
        const ride = yield rideModel_1.default.findOne({ rideId }).exec();
        if (!ride) {
            return res.status(404).json("ride not found");
        }
        const driverId = ride.driver_id;
        const driver = yield driverModel_1.default.findById(driverId).exec();
        if (!driver) {
            return res.status(500).json("no driver found");
        }
        const fare = (0, calculateFare_1.calulateFare)(1000);
        ride.end_time = new Date();
        ride.fare = fare;
        const charge = yield stripeClient.charges.create({
            amount: fare,
            currency: "usd",
            source: "stripe-token",
            description: "payment for a ride",
        });
        if (!charge) {
            return res.status(500).json("payment could not be proceed");
        }
        const payout = yield stripeClient.payouts.create({
            amount: fare * 10,
            currency: "usd",
            destination: driver.driver_stripe_account_id,
        });
        if (!payout) {
            return res.status(500).json("transaction failed");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.completRide = completRide;
const getRideHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "";
    try {
        const rides = yield rideModel_1.default
            .find({ $or: [{ passenger_id: userId }, { driver_id: userId }] })
            .sort({ start_time: -1 })
            .populate("passenger_id", "name email")
            .populate("driver_id", "name email");
        if (!rides || rides.length == 0) {
            return res.status(500).json("you havent order any ride yet");
        }
        res.status(200).json({ rides });
    }
    catch (error) {
        next(error);
    }
});
exports.getRideHistory = getRideHistory;
