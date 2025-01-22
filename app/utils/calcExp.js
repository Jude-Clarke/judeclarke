function yearsSince2020() {
  const startDate = new Date("2020-01-01");
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate - startDate;

  // Convert milliseconds to years
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Including leap year adjustments
  const yearsDifference = differenceInMilliseconds / millisecondsPerYear;

  // Round to the nearest whole year
  return Math.round(yearsDifference);
}

export default yearsSince2020;
