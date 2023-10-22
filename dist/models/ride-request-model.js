"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rideRequestSchema = new mongoose_1.Schema({
    passenger_id: { type: String },
    startLocation: {
        types: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    endLocation: {
        types: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    status: { type: String },
    driver_id: { type: String },
    estimated_fare: { type: String },
    // ride_id: { type: Types.ObjectId },
}, { timestamps: true });
rideRequestSchema.index({ startLocation: "2dsphere", endLocation: "2dsphere" });
exports.default = (0, mongoose_1.model)("ride", rideRequestSchema);
