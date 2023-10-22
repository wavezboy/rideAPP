"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    driver_id: { type: String, required: true },
    vehicle_info: { type: String },
    currentLocation: {
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
    availability: { type: Boolean },
    driver_stripe_account_id: { type: String },
}, { timestamps: true });
driverSchema.index({ current_location: "2dsphere" });
exports.default = (0, mongoose_1.model)("driver", driverSchema);
