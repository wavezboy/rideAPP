import { location } from "../controller/driver-controller";

const toRadians = (degress) => {
  return (degress * Math.PI) / 180;
};

// implementation of this function using the Haversine formula for calculating distances

export const calculateDistance = (cords1: location, cords2: location) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(cords2.latitude - cords1.latitude);
  const dLon = toRadians(cords2.longitude - cords1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(cords1.latitude)) *
      Math.cos(toRadians(cords2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
};
