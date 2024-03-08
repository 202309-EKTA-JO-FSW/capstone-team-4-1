let helpers = {};

helpers.converteRates = (value) => {
  let rating = "Good";
  switch (true) {
    case value <= 1:
      rating = "Very Bad";
      break;
    case value > 1 && value <= 2:
      rating = "Bad";
      break;
    case value > 2 && value <= 3:
      rating = "Good";
      break;
    case value > 3 && value <= 4:
      rating = "Good";
      break;
    case value > 4 && value <= 5:
      rating = "Great!";
      break;
    default:
      break;
  }
  return rating;
};
export default helpers;
