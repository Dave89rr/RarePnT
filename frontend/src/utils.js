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

export default parsedUrl;
