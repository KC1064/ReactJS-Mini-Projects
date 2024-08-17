import React, { useState, useEffect } from "react";
import "./App.css";
import { WeatherSvg } from "weather-icons-animated";
import moment from "moment";
import "moment-timezone";
import Footer from "./Footer";

const App = () => {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [time, setTime] = useState("");
  const [dayName, setDayName] = useState("");
  const [DayNight, setDayNight] = useState("");

  const api = {
    key: "f26ea544dee72277c7a29a742501e2a3",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const searchWeather = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found");
          }
          return res.json();
        })
        .then((data) => {
          setWeather(data);
          setError(false);
          setPlace("");
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setWeather({});
          setTime("");
          setDayNight("");
        });
    }
  };

  useEffect(() => {
    if (weather.main) {
      getCurrentTime();
      DayOrNight();
    }
    getDayName();
  }, [weather]);

  const getstate = () => {
    if (!weather.weather || weather.weather.length === 0) {
      return "windy";
    }

    const description = weather.weather[0].description.toLowerCase();
    if (description.includes("clear")) return "sunny";
    if (description.includes("few clouds")) return "partlycloudy";
    if (description.includes("scattered clouds")) return "partlycloudy";
    if (description.includes("broken clouds")) return "cloudy";
    if (description.includes("light rain")) return "rainy";
    if (description.includes("rain")) return "pouring";
    if (description.includes("thunderstorm with rain"))
      return "lightning-rainy";
    if (description.includes("thunderstorm")) return "lightning";
    if (description.includes("heavy rain")) return "pouring";
    if (description.includes("snow")) return "snowy";
    if (
      description.includes("mist") ||
      description.includes("fog") ||
      description.includes("haze")
    )
      return "fog";

    return "windy"; // Default case
  };

  const getCurrentTime = () => {
    if (weather.dt && weather.timezone) {
      const utcTime = moment.unix(weather.dt); // Convert UNIX timestamp to UTC
      const localTime = utcTime.utcOffset(weather.timezone / 60); // Adjust with timezone

      const timeString = localTime.format("HH:mm A");
      setTime(timeString);

      console.log(`The current local time in ${weather.name} is ${timeString}`);
    } else {
      setTime("Time not available");
    }
  };

  const greet = () => {
    const currentHour = new Date(`1970-01-01T${time}:00`).getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 16) {
      return "Good Afternoon";
    } else if (currentHour >= 16 && currentHour < 18.5) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const getDayName = () => {
    const currentDate = new Date();
    const dayNumber = currentDate.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayNumber];
    setDayName(dayName);
  };

  const DayOrNight = () => {
    if (weather.sys && weather.dt) {
      const currentTime = weather.dt * 1000;
      const sunriseTime = weather.sys.sunrise * 1000;
      const sunsetTime = weather.sys.sunset * 1000;

      if (currentTime >= sunriseTime && currentTime < sunsetTime) {
        setDayNight("day");
        return "day";
      } else {
        setDayNight("night");
        return "night";
      }
    } else {
      setDayNight("Time of day not available");
    }
  };

  const formatTime = (timestamp) => {
    if (timestamp) {
      return moment.unix(timestamp).format("HH:mm A");
    }
    return "N/A";
  };

  return (
    <div
      className="bg-[#333744]"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        color: "black",
      }}
    >
      <div className="input-field flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          onKeyDown={searchWeather}
          className="h-12 w-[300px] mt-4 border bg-slate-400 border-white rounded-2xl text-blue-50 pl-4 text-xl font-bold"
        />
      </div>
      <div className="h-[780px] w-[100%]">
        {error ? (
          <p>City not found</p>
        ) : (
          weather.main &&
          weather.weather &&
          weather.weather.length > 0 && (
            <div className="">
              <div className="h-[780px] mt-6 w-[100%] flex justify-center items-center">
                <div className="weather-details h-[740px] w-[96%] border border-slate-300 rounded-lg backdrop-blur-xl bg-opacity-30 bg-slate-500 flex flex-col items-center">
                  <div className="place-date text-white mt-4 flex flex-col items-center">
                    <p className="text-5xl">{weather.name}</p>
                    <p className="mt-2 text-xl">
                      {dayName.toUpperCase()}
                      <span> {time}</span>
                    </p>
                  </div>
                  <div className="h-[250px] w-[250px]">
                    <WeatherSvg
                      state={getstate()}
                      night={DayNight === "night"}
                    />
                  </div>
                  <p className="text-white">
                    <span className="text-6xl">{weather.main.temp}</span>
                    <span className="relative text-2xl top-[-26px]">°C</span>
                  </p>
                  <p className="opacity-100 text-white mt-2 pr-3 text-2xl">
                    {weather.weather[0].description.toUpperCase()}
                  </p>
                  <p className="text-lg text-white">{greet()}</p>
                  <div className="h-[200px] w-[94%] attributes border-white flex gap-[70px] mt-6 justify-center items-center">
                    <div className="text-white text-lg flex flex-col gap-2">
                      <p>Feels Like: {weather.main.feels_like}</p>
                      <p>Max Temp: {weather.main.temp_max}</p>
                      <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
                      <p>Pressure: {weather.main.pressure}</p>
                    </div>
                    <div className="text-white text-lg flex flex-col gap-2">
                      <p>Humidity: {weather.main.humidity}</p>
                      <p>Min Temp: {weather.main.temp_min}</p>
                      <p>Sunset: {formatTime(weather.sys.sunset)}</p>
                      <p>Wind Speed: {weather.wind.speed}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
