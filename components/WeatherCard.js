import { fetchWeather } from "../helper";
import {
  CloudIcon,
  EyeIcon,
  LightBulbIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

const WeatherCard = () => {
  const [weather, setWeather] = useState("");

  const getWeather = async () => {
    setWeather(await fetchWeather());
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setWeather(await fetchWeather(lat, long));
    });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div
      className="shadow-base dark:shadow-none bg-[#fff] dark:bg-card rounded-[2rem]
     transition-all duration-300 ease-in-out min-h-[250px] sm:grid sm:grid-cols-3 w-full pb-10 sm:pb-0
      "
    >
      <div className="flex items-center justify-center col-span-1">
        <div className="relative w-[140px] h-[140px] lg:w-[180px] lg:h-[180px]">
          <Image
            src={`http://openweathermap.org/img/wn/${
              weather ? weather?.weather[0]?.icon : "/images/weather/sunny.svg"
            }@4x.png`}
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center items-center col-span-2">
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 sm:gap-x-5">
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[22px] h-[22px]">
              <Image
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-temperature-plants-flaticons-lineal-color-flat-icons-3.png"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather ? (weather.main.temp - 272).toFixed(2) : ""} °C
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[20px] h-[20px]">
              <Image
                src="https://img.icons8.com/material-two-tone/24/000000/visible.png"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather && weather.visibility / 1000} K.m.
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="https://img.icons8.com/office/64/000000/marker.png"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather && weather.name}
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-cloud-vacation-planning-cycling-tour-flaticons-lineal-color-flat-icons.png"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather && weather.weather[0]?.main}
            </h1>
          </div>{" "}
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="https://img.icons8.com/external-phatplus-lineal-color-phatplus/64/000000/external-wind-power-energy-phatplus-lineal-color-phatplus.png"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather && weather.wind.speed} kmph
            </h1>
          </div>{" "}
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-humidity-weather-justicon-lineal-color-justicon-1.png"
                layout="fill"
                className="object-cover"
              />
            </div>

            <h1 className="text-[#7e7e7e] dark:text-base-text-dark font-semibold">
              {weather && weather.main.humidity} %
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
