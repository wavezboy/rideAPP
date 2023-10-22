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
exports.updateDriverLocation = exports.updateDriverAvailaibilty = exports.registerDriver = void 0;
const driverModel_1 = __importDefault(require("../models/driverModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const registerDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { licensePlate, vehicleInfo } = req.body;
    //   set the userId as the driver id
    const driver_id = "";
    try {
        // check existingDriver
        const existingDriver = yield driverModel_1.default.findOne({}).exec();
        if (existingDriver) {
            res.status(500).json("user is already a driver");
        }
        const driver = driverModel_1.default.create({
            driver_id: driver_id,
            vehicle_info: vehicleInfo,
            availability: false,
            current_location: null,
        });
        res.status(201).json(driver);
    }
    catch (error) {
        next(error);
    }
});
exports.registerDriver = registerDriver;
const updateDriverAvailaibilty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedId = "";
    const availability = req.body;
    try {
        const driver = yield driverModel_1.default.findById(authenticatedId).exec();
        if (!driver) {
            res.status(500).json("driver not found");
            throw (0, http_errors_1.default)(500, "driver not found");
        }
        driver.availability = availability;
        const updateDriver = yield driver.save();
        res
            .status(201)
            .json({ message: "driver availaibilty updated", updateDriver });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDriverAvailaibilty = updateDriverAvailaibilty;
const updateDriverLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.body;
    const authenticatedId = "";
    try {
        const driver = yield driverModel_1.default.findById({}).exec();
        if (!driver) {
            res.status(500).json("no driver found");
            throw (0, http_errors_1.default)(500, "no driver found");
        }
        driver.currentLocation = {
            coordinates: [latitude, longitude],
            types: "Point",
        };
        const updatedDriver = yield driver.save();
        res.status(201).json({ message: "driver location updated", updatedDriver });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDriverLocation = updateDriverLocation;
