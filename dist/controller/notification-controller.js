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
exports.getNotification = exports.sendNotification = void 0;
const notification_model_1 = __importDefault(require("../models/notification-model"));
const sendNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "";
    const message = req.body;
    // Logic to send a real-time notification to the user with userId
    // Example: Send the notification through WebSockets or a notification service
    try {
        const newNotification = yield notification_model_1.default.create({
            user_id: userId,
            message: message,
            isRead: false,
        });
        res
            .status(200)
            .json({ message: "notification sent succesfully", newNotification });
    }
    catch (error) {
        next(error);
    }
});
exports.sendNotification = sendNotification;
const getNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const notification = notification_model_1.default
            .find({ user_id: userId })
            .sort({ timestamp: -1 });
        if (!notification || (yield notification).length == 0) {
            return res.status(404).json("no notification found for this user");
        }
        res.status(200).json({ notification });
    }
    catch (error) {
        next(error);
    }
});
exports.getNotification = getNotification;
