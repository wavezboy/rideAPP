export const calulateFare = (distance: number) => {
  const ratePerKilometer = 0.1;

  const fare = distance * ratePerKilometer;

  return fare;
};
