"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = void 0;
const toRadians = (degress) => {
    return (degress * Math.PI) / 180;
};
// implementation of this function using the Haversine formula for calculating distances
const calculateDistance = (cords1, cords2) => {
    const [lat1, lon1] = cords1;
    const [lat2, lon2] = cords2;
    const earthRadiusKm = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance;
};
exports.calculateDistance = calculateDistance;
