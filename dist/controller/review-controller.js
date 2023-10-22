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
exports.getDriverRatings = exports.createReview = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const review_rating_model_1 = __importDefault(require("../models/review-rating-model"));
const rideModel_1 = __importDefault(require("../models/rideModel"));
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, rating, revieweeId, reviewerId } = req.body;
    try {
        const reviewer = yield userModel_1.default.findById(reviewerId).exec();
        const ride = yield rideModel_1.default.findById(revieweeId).exec();
        if (!ride || !reviewer) {
            return res.status(404).json({ error: "Reviewer or Reviewee not found" });
        }
        const review = yield review_rating_model_1.default.create({
            authour_id: reviewerId,
            comment: comment,
            rating: rating,
            ride_id: ride._id,
            driver_id: revieweeId,
        });
        res.status(200).json({ message: "review created succesfully", review });
    }
    catch (error) {
        next();
    }
});
exports.createReview = createReview;
const getDriverRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { DriverId } = req.params;
    try {
        const driverRatings = yield review_rating_model_1.default.find({ driver_id: DriverId });
        res.status(200).json({ driverRatings });
    }
    catch (error) {
        next(error);
    }
});
exports.getDriverRatings = getDriverRatings;
