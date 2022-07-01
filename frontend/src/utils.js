// Degree Decimal to Degree Minutes Seconds format
const ddtodms = (inputNumber) => {
  //   console.log('input', inputNumber);
  const number = parseFloat(inputNumber);
  //   console.log('number', number);
  let degrees = number;
  //   console.log('degrees', degrees);
  if (degrees > 0) {
    degrees = Math.floor(degrees);
  } else {
    degrees = Math.ceil(degrees);
  }
  //   console.log('degreesFloored', degrees);
  let minutes = number - degrees;
  minutes *= 60;
  let seconds = minutes;
  if (minutes > 0) {
    minutes = Math.floor(minutes);
  } else {
    minutes = Math.ceil(minutes);
  }
  seconds -= minutes;
  seconds *= 60;
  seconds = seconds.toFixed(1);
  return {
    d: parseInt(degrees, 10),
    m: Math.abs(minutes),
    s: Math.abs(seconds),
  };
};

const parseGeodetic = (dms, geodeticType) => {
  if (geodeticType === 'lat') {
    if (dms.d > 0) {
      return `${dms.d}°${dms.m}'${dms.s}"N`;
    } else {
      return `${Math.abs(dms.d)}°${dms.m}'${dms.s}"S`;
    }
  }
  if (geodeticType === 'lon') {
    if (dms.d > 0) {
      return `${dms.d}°${dms.m}'${dms.s}"E`;
    } else {
      return `${Math.abs(dms.d)}°${dms.m}'${dms.s}"W`;
    }
  }
};

const parsedUrl = (spot) => {
  const parsedLatitude = parseGeodetic(ddtodms(spot.latitude), 'lat');
  const parsedLongitude = parseGeodetic(ddtodms(spot.longitude), 'lon');

  const baseUrl = 'https://www.google.com/maps/place/';
  return `${baseUrl}${parsedLatitude}+${parsedLongitude}`;
};

// parsedLatitude = parseDegrees(ddtodms(spot.latitude), 'lat');
// parsedLongitude = parseDegrees(ddtodms(spot.longitude), 'lon');

// return `${baseUrl}${latitude}+${longitude}`;
//https://www.google.com/maps/place/44°16'42.2"N+124°06'48.6"W

export const calcAvgRating = (reviewObj) => {
  let avg = 0;
  const reviews = Object.values(reviewObj);
  if (reviews.length > 0) {
    reviews.forEach((review) => {
      avg += parseInt(review.rating, 10);
    });
    return `${(avg / reviews.length).toFixed(2)} `;
  }
  return 'New ';
};

export const calcDistance = (userCoords, spotCoords) => {
  if (userCoords === undefined) return '';
  let userLatRads = (userCoords.yourLat * Math.PI) / 180;
  let userLonRads = (userCoords.yourLon * Math.PI) / 180;
  let spotLatRads = (spotCoords.lat * Math.PI) / 180;
  let spotLonRads = (spotCoords.lon * Math.PI) / 180;

  let latDiff = spotLatRads - userLatRads;
  let lonDiff = spotLonRads - userLonRads;

  const a =
    Math.pow(Math.sin(latDiff / 2), 2) +
    Math.cos(userLatRads) *
      Math.cos(spotLonRads) *
      Math.pow(Math.sin(lonDiff / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(Math.abs(a)));
  const r = 6371; // radius of earth mi
  const distance = (r * c).toFixed(0);
  if (distance !== 'NaN') {
    return `Approx. ${parseInt(distance, 10)} miles away`;
  } else {
    return '';
  }
};

export default parsedUrl;
