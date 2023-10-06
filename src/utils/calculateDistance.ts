import { location } from "../controller/driver-controller";

const toRadians = (degress) => {
  return (degress * Math.PI) / 180;
};

export const calculateDistance = (cords1: location, cords2: location) => {
  const earthRadiusKm = 6371;
  const dlat = toRadians(cords2.latitude - cords1.latitude);
};
