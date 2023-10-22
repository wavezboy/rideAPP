"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importStar(require("http-errors"));
const rides_routes_1 = __importDefault(require("./routes/rides-routes"));
const ride_request_routes_1 = __importDefault(require("./routes/ride-request-routes"));
const driver_routes_1 = __importDefault(require("./routes/driver-routes"));
const review_routes_1 = __importDefault(require("./routes/review-routes"));
const notification_routes_1 = __importDefault(require("./routes/notification-routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("api/ride", rides_routes_1.default);
app.use("api/ride-request", ride_request_routes_1.default);
app.use("api/driver", driver_routes_1.default);
app.use("api/review", review_routes_1.default);
app.use("api/notification", notification_routes_1.default);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.log(error);
    let errorMesage = "an unknown error has occured";
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMesage = error.message;
        res.status(statusCode).json(errorMesage);
    }
});
app.use((req, res, next) => {
    res.status(404).json("endpoint not found");
    next((0, http_errors_1.default)(404, "endpoint not found"));
});
exports.default = app;
