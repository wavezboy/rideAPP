"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    ride_id: { type: String },
    payer_id: { type: String },
    amount: { type: String },
    payment_status: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("payment", paymentSchema);
