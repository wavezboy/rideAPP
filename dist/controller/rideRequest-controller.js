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
exports.acceptRideRequest = exports.getRideRequest = exports.cancelRideRequest = exports.matchRideRequest = exports.createRideRequest = void 0;
const ride_request_model_1 = __importDefault(require("../models/ride-request-model"));
const http_errors_1 = __importDefault(require("http-errors"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
const rideModel_1 = __importDefault(require("../models/rideModel"));
const calculateDistance_1 = require("../utils/calculateDistance");
const createRideRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const passengerId = "";
    const { end_location, start_location } = req.body;
    try {
        const newRequest = yield ride_request_model_1.default.create({
            passenger_id: passengerId,
            startLocation: {
                types: "Point",
                coordinates: [start_location.latitude, start_location.longitude],
            },
            endLocation: {
                types: "Point",
                coordinates: [end_location.latitude, end_location.longitude],
            },
            status: "pending",
        });
        res
            .status(201)
            .json({ message: "your ride request have been created", newRequest });
    }
    catch (error) {
        next(error);
    }
});
exports.createRideRequest = createRideRequest;
const matchRideRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const passenger_id = "";
    const rideRequest = yield ride_request_model_1.default.findOne({ passenger_id }).exec();
    try {
        if (!rideRequest) {
            res.status(500).json("ride request not found or already mathched");
            throw (0, http_errors_1.default)(500, "ride request not found or already mathched");
        }
        // Find available drivers within a certain radius of the passenger's start location
        const maxDistanceInMeters = 5000; // Maximum distance for matching
        const availableDrivers = yield driverModel_1.default.find({
            availability: true,
            currentLocation: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: rideRequest.startLocation,
                    },
                    $maxDistance: maxDistanceInMeters,
                },
            },
        });
        // Implement logic to choose the best-matched driver
        let bestMatchedDriver = yield driverModel_1.default.findById({}).exec();
        let bestMatchedDistance = Number.MAX_VALUE;
        for (const driver of availableDrivers) {
            // calculating the distance between driver and request
            const driverLocation = (_a = driver.currentLocation) === null || _a === void 0 ? void 0 : _a.coordinates;
            const passengerLocation = (_b = rideRequest.startLocation) === null || _b === void 0 ? void 0 : _b.coordinates;
            if (!(driverLocation && passengerLocation)) {
                throw (0, http_errors_1.default)(404, "driver location or passenger location not available");
            }
            const distance = (0, calculateDistance_1.calculateDistance)(passengerLocation, driverLocation);
            // check if distance is closer to the request than the current best match
            if (distance < bestMatchedDistance) {
                bestMatchedDistance = distance;
                bestMatchedDriver = driver;
            }
        }
        //  update the match request with selected driver
        if (bestMatchedDriver) {
            rideRequest.driver_id = bestMatchedDriver.driver_id;
            rideRequest.status = "matched";
            yield rideRequest.save();
            res
                .status(200)
                .json({ message: "driver macthed succesfully ", rideRequest });
        }
        else {
            res
                .status(404)
                .json({ error: "no available driver within specified range" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.matchRideRequest = matchRideRequest;
const cancelRideRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const passengerId = "";
    const requestId = req.params.requestId;
    try {
        const rideRequest = yield ride_request_model_1.default.findOne({
            passenger_id: passengerId,
            _id: requestId,
        });
        if (!rideRequest) {
            return res.status(404).json("ride request not found");
        }
        rideRequest.status = "canceled";
        yield rideRequest.save();
        res
            .status(200)
            .json({ message: "ride request can canceled succesfully", rideRequest });
    }
    catch (error) {
        next(error);
    }
});
exports.cancelRideRequest = cancelRideRequest;
const getRideRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = "";
    try {
        const rideRequests = yield ride_request_model_1.default.findOne({
            driver_id: driverId,
            status: "matched",
        });
        if (!rideRequests) {
            return res.status(404).json("no request available");
        }
        res.status(200).json({ rideRequests });
    }
    catch (error) {
        next(error);
    }
});
exports.getRideRequest = getRideRequest;
const acceptRideRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rideRequestId = req.params.rideRequestId;
    try {
        const rideRequest = yield ride_request_model_1.default.findOne({ _id: rideRequestId });
        if (!rideRequest) {
            return res.status(404).json("ride not found");
        }
        const ride = yield rideModel_1.default.create({
            driver_id: rideRequest.driver_id,
            passenger_id: rideRequest.passenger_id,
            ride_request_id: rideRequest._id,
        });
        rideRequest.status = "accepted";
        res.status(200).json(ride);
    }
    catch (error) {
        next(error);
    }
});
exports.acceptRideRequest = acceptRideRequest;
