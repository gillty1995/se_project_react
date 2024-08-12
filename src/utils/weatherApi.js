import { processServerRequest } from "./utils";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    return processServerRequest(res);
  });
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  const tempValue = parseInt(temperature, 10);
  if (tempValue > 86) {
    return "hot";
  } else if (tempValue >= 66 && tempValue <= 86) {
    return "warm";
  } else {
    return "cold";
  }
};

export const processWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: `${Math.round(data.main.temp)}°F`,
    C: `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`,
  };
  result.type = getWeatherType(result.temp.F);
  result.condition =
    data.weather && data.weather[0]
      ? data.weather[0].main.toLowerCase()
      : "unknown";
  result.isDay = isDay(data.sys, Date.now());
  console.log(result.temp);
  console.log(data.weather);
  return result;
};
