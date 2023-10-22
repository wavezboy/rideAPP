"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    ride_id: { type: String },
    authour_id: { type: String },
    rating: { type: String },
    comment: { type: String },
    driver_id: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("review", reviewSchema);
