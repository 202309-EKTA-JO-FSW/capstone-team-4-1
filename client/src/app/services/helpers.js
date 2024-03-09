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

helpers.getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

helpers.deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
export default helpers;
