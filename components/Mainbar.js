import React, { useEffect, useState } from "react";
import { fetchWeather } from "../helper";
import {
  CloudIcon,
  EyeIcon,
  LightBulbIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

const Mainbar = () => {
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

  console.log(weather);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
      <div
        className="shadow-equal-shadow dark:bg-card col-span-1 m-8 hover:scale-[1.02] rounded-sm
      h-[350px] transform transition-transform duration-300 ease-in-out
      "
      >
        <h1
          className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1
        dark:bg-[#333333]
        "
        >
          Weather
        </h1>
        <div className="">
          {/* <CloudIcon className="w-full h-[100px] dark:text-primary-text" /> */}
          <div className="relative w-full h-[200px]">
            <Image
              src="https://64.media.tumblr.com/8b2bc17500a6efc8b1f89f58ac237b6d/tumblr_n0noh8dELa1r9mp00o2_500.gifv"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex justify-around mt-5">
            <div className="space-y-2">
              <h1 className="dark:text-primary-text font-light flex items-center">
                <LightBulbIcon className="w-4 h-4 text-yellow-500 mr-1" />
                {weather ? (weather.main.temp - 272).toFixed(2) : ""} °C
              </h1>

              <p className="dark:text-secondary-text  font-light flex items-center">
                <EyeIcon className="w-4 h-4 text-green-500 mr-1" />
                {weather && weather.visibility / 1000} K.m.
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="dark:text-primary-text flex items-center">
                <LocationMarkerIcon className="w-4 h-4 mr-1 text-blue-500" />
                {weather && weather.name}
              </h1>
              <h1 className="dark:text-primary-text flex items-center">
                <LightningBoltIcon className="w-4 h-4 mr-1 text-yellow-400" />
                {weather && weather.weather[0].description}{" "}
                {weather && weather?.weather[1]?.description ? "/" : ""}
                {weather && weather?.weather[1]?.description}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-span-1 row-span-1  shadow-shadow-base 
      m-8 hover:scale-[1.02]  rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1
            className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1 
          dark:bg-[#333333]"
          >
            Tasks
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            <span className="text-gray-900 font-semibold dark:text-primary-text">
              1.
            </span>{" "}
            Task karna hai ye
          </h1>
        </div>
      </div>
      <div
        className="col-span-1 row-span-1  shadow-shadow-base hover:shadow-shadow-medium 
      m-8 hover:scale-[1.02]  rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1
            className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1 
          dark:bg-[#333333]"
          >
            Birthday
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            Akash Sharma
          </h1>
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            Shubham Sharma
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
