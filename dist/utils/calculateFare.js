"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calulateFare = void 0;
const calulateFare = (distance) => {
    const ratePerKilometer = 0.1;
    const fare = distance * ratePerKilometer;
    return fare;
};
exports.calulateFare = calulateFare;
