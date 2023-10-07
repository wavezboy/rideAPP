const toRadians = (degress) => {
  return (degress * Math.PI) / 180;
};

// implementation of this function using the Haversine formula for calculating distances

export const calculateDistance = (cords1: number[], cords2: number[]) => {
  const [lat1, lon1] = cords1;
  const [lat2, lon2] = cords2;

  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
};
