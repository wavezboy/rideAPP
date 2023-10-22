"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.Schema({
    driver_id: { type: String },
    passenger_id: { type: String },
    start_time: { type: Date },
    end_time: { type: Date },
    fare: { type: Number },
    distance: { type: String },
    ride_request_id: { type: mongoose_1.Types.ObjectId },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("ride", rideSchema);
