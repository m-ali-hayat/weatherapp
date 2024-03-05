import React, { useRef, useState } from "react";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import drizzle_icon from "../assets/drizzle.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const WeatherApp = () => {
  const inputValue = useRef();
  const [temp, setTemp] = useState(24);
  const [humidity, setHumidity] = useState(64);
  const [windSpeed, setWindSpeed] = useState(18);
  const [cityName, setCityName] = useState("London");
  const [wIcon, setWIcon] = useState(cloud_icon);

  const api_key = "fb9a35db54819ed47d21214423f96401";

  const search = async () => {
    if (inputValue.current.value === "") {
      alert("Please enter a city name");
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.current.value}&appid=${api_key}&units=metric`;
    // console.log(inputValue.current.value);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setTemp(Math.floor(data.main.temp));
    setHumidity(data.main.humidity);
    setWindSpeed(Math.floor(data.wind.speed));
    setCityName(data.name);
    inputValue.current.value = "";

    // weather icon based on weather condition
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWIcon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWIcon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWIcon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWIcon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWIcon(snow_icon);
    } else {
      setWIcon(clear_icon);
    }
  };

  return (
    <div
      id="container"
      className="w-[607px] pb-4 m-auto my-[75px] rounded-xl bg-gradient-to-b from-[#130754] from-0% to-[#3b2f80] to-100%"
    >
      <div
        id="top-bar"
        className="flex justify-center items-center gap-[14px] pt-[60px]"
      >
        <input
          type="text"
          name=""
          id="cityInput"
          placeholder="Enter City Name"
          className="flex w-[362px] h-[78px] bg-[#ebfffc] outline-none border-none rounded-full pl-[40px] text-[#626262] text-[20px] font-normal"
          ref={inputValue}
        />
        <div
          id="search-Icon"
          className="flex justify-center items-center rounded-full cursor-pointer w-[78px] h-[78px] bg-[#ebfffc]"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div id="weather-image" className="mt-[29px] flex justify-center">
        <img src={wIcon} alt="" />
      </div>
      <div
        id="weather-temp"
        className=" flex justify-center text-white text-[120px] font-normal"
      >
        {temp}&deg;C
      </div>
      <div
        id="weather-location"
        className="flex justify-center text-white font-normal text-[60px]"
      >
        {cityName}
      </div>
      <div
        id="data-container"
        className="flex justify-around mt-[50px] text-white"
      >
        <div id="element" className="flex items-start gap-3">
          <img src={humidity_icon} alt="" id="icon" className="mt-[10px]" />
          <div
            id="data"
            className="flex flex-col justify-center items-center text-[34px] font-normal"
          >
            <div id="humidity-percent">{humidity}%</div>
            <div id="text" className="text-[20px] font-normal">
              Humidity
            </div>
          </div>
        </div>

        <div id="element" className="flex items-start gap-3">
          <img src={wind_icon} alt="" id="icon" className="mt-[10px]" />
          <div
            id="data"
            className="flex flex-col justify-center items-center text-[34px] font-normal"
          >
            <div id="wind-speed">{windSpeed} km/h</div>
            <div id="text" className="text-[20px] font-normal">
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
