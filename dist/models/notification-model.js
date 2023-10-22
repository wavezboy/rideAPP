"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    user_id: { type: String },
    message: { type: String },
    isRead: { type: Boolean },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("notification", notificationSchema);
