// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import { WeatherSvg } from "weather-icons-animated";
import moment from "moment";
import "moment-timezone";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Loader from "./Loader";

const App = () => {
  const [isDarkMode, setDarkMode] = useState(true);
  const toggleDarkMode = (checked) => setDarkMode(checked);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [time, setTime] = useState("");
  const [dayName, setDayName] = useState("");
  const [date, setDate] = useState("");
  const [dayNight, setDayNight] = useState("");

  const api = {
    key: "f26ea544dee72277c7a29a742501e2a3",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const searchWeather = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setTimeout(() => {
        fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
          .then((res) => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
          })
          .then((data) => {
            setWeather(data);
            setError(false);
            setPlace("");
          })
          .catch((err) => {
            console.error(err);
            setError(true);
            setWeather({});
            setTime("");
            setDayNight("");
          })
          .finally(() => {
            setLoading(false);
          });
      }, 1000);
    }
  };

  useEffect(() => {
    if (weather.main) {
      getCurrentTime();
      DayOrNight();
      getDayName();
    }
  }, [weather]);

  const getstate = () => {
    if (!weather.weather || weather.weather.length === 0) return "windy";

    const description = weather.weather[0].description.toLowerCase();

    switch (true) {
      case description.includes("clear"):
        return "sunny";
      case description.includes("few clouds") ||
        description.includes("scattered clouds"):
        return "partlycloudy";
      case description.includes("broken clouds"):
        return "cloudy";
      case description.includes("light rain"):
        return "rainy";
      case description.includes("heavy rain"):
        return "pouring";
      case description.includes("thunderstorm with rain"):
        return "lightning-rainy";
      case description.includes("thunderstorm"):
        return "lightning";
      case description.includes("snow"):
        return "snowy";
      case description.includes("mist") ||
        description.includes("fog") ||
        description.includes("haze"):
        return "fog";
      case description.includes("snow with rain"):
        return "snowy-rainy";
      case description.includes("hail"):
        return "hail";
      case description.includes("moderate rain"):
        return "rainy";
      default:
        return "windy";
    }
  };

  const getCurrentTime = () => {
    if (weather.dt && weather.timezone) {
      const utcTime = moment.unix(weather.dt);
      const localTime = utcTime.utcOffset(weather.timezone / 60);
      setTime(localTime.format("HH:mm A"));
    } else {
      setTime("Time not available");
    }
  };

  const greet = () => {
    const currentHour = time;
    if (currentHour < "12:00 AM") return "Good Morning";
    if (currentHour < "16:00 PM") return "Good Afternoon";
    if (currentHour < "19:00 PM") return "Good Evening";
    return "Good Night";
  };

  const getDayName = () => {
    const currentDate = new Date();
    const dayNumber = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

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
    const dateString = `${dayOfMonth < 10 ? "0" : ""}${dayOfMonth}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    setDate(dateString);
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

  const formatTime = (timestamp) =>
    timestamp ? moment.unix(timestamp).format("HH:mm A") : "N/A";

  return (
    <div
      className={`${isDarkMode ? "bg-[#333744]" : "bg-blue-300"}`}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        color: isDarkMode ? "white" : "black",
      }}
    >
      <div className="input-field flex justify-center items-center gap-6 h-[62px]">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          onKeyDown={searchWeather}
          className={`h-12 w-[270px] border ${
            isDarkMode
              ? "bg-[#8b96be] text-white placeholder:text-white border-white"
              : "bg-[#d8e2ee] text-black placeholder:text-black border-black"
          } rounded-2xl pl-4 text-xl font-bold mt-4`}
        />
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={45}
          className="mt-3"
        />
      </div>

      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <Loader />
          </div>
        ) : error ? (
          <p>City not found</p>
        ) : (
          weather.main &&
          weather.weather &&
          weather.weather.length > 0 && (
            <div className="h-[830px] w-[100%] flex justify-center items-center">
              <div
                className={`weather-details h-[780px] w-[96%] border border-slate-300 rounded-lg backdrop-blur-3xl bg-opacity-30 flex flex-col items-center
                  ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
              >
                <div className={`place-date mt-4 flex flex-col items-center
                  ${
                    isDarkMode ? "text-white" : "text-black"
                  }
                  `}>
                  <p className="text-5xl">{weather.name}</p>
                  <p className="mt-2 text-xl">
                    {dayName.toUpperCase()}
                    <span> {time}</span>
                  </p>
                  <p>{date}</p>
                </div>
                <div className="h-[250px] w-[250px]">
                  <WeatherSvg state={getstate()} night={dayNight === "night"} />
                </div>
                <p className={`${
                  isDarkMode ? "text-white" : "text-black"
                }`}>
                  <span className="text-6xl">
                    {Math.round(weather.main.temp)}
                  </span>
                  <span className="relative text-2xl top-[-26px] font-bold">
                    °C
                  </span>
                </p>
                <p className={`opacity-100 mt-2 pr-3 text-2xl 
                  ${
                     isDarkMode ? "text-white" : "text-black"
                  }`}
                  >
                  {weather.weather[0].description.toUpperCase()}
                </p>
                <p className={`text-xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}>{greet()}</p>
                <div
                  className={`h-[240px] w-[94%] attributes flex gap-[25px] mt-6 justify-center mb-3 items-center rounded-xl backdrop-blur-3xl bg-opacity-5 ${
                    isDarkMode
                      ? "border-white bg-white"
                      : "border-black bg-gray-500"
                  }`}
                >
                  <div className="w-[45%] h-[180px] flex flex-col items-start justify-between">
                    <p className="flex gap-2 ml-4 items-center">
                      <img
                        src={
                          isDarkMode
                            ? "./src/assets/feels-like-light.svg"
                            : "./src/assets/feels-like-dark.svg"
                        }
                        alt="feels like"
                        className="h-[35px] w-[35px]"
                      />
                      {Math.round(weather.main.feels_like)} °C
                    </p>

                    <p className="flex gap-2 ml-4 items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/max-temp-light.svg"
                            : "src/assets/max-temp-dark.svg"
                        }
                        alt="max temp"
                        className="h-[35px] w-[35px]"
                      />
                      {Math.round(weather.main.temp_max)} °C
                    </p>
                    <p className="flex gap-2 ml-4 items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/sunrise-light.svg"
                            : "src/assets/sunrise-dark.svg"
                        }
                        alt="Sunrise"
                        className="h-[35px] w-[35px]"
                      />
                      {formatTime(weather.sys.sunrise)}
                    </p>
                    <p className="flex gap-2 ml-4 items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/pressure-light.svg"
                            : "src/assets/pressure-dark.svg"
                        }
                        alt="Pressure"
                        className="h-[35px] w-[35px]"
                      />
                      {Math.round(weather.main.pressure / 1000)} bar
                    </p>
                  </div>
                  <div className="w-[45%] h-[180px] flex flex-col items-start justify-between ">
                    <p className="flex gap-2 ml-[36px] items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/humidity-light.svg"
                            : "src/assets/humidity-dark.svg"
                        }
                        alt="Humidity"
                        className="h-[35px] w-[35px]"
                      />
                      {weather.main.humidity} %
                    </p>
                    <p className="flex gap-2 ml-[36px] items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/min-temp-light.svg"
                            : "src/assets/min-temp-dark.svg"
                        }
                        alt="Min Temp"
                        className="h-[35px] w-[35px]"
                      />
                      {Math.round(weather.main.temp_min)} °C
                    </p>
                    <p className="flex gap-2 ml-[36px] items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/sunset-light.svg"
                            : "src/assets/sunset-dark.svg"
                        }
                        alt="Sunset"
                        className="h-[35px] w-[35px]"
                      />
                      {formatTime(weather.sys.sunset)}
                    </p>
                    <p className="flex gap-2 ml-[36px] items-center">
                      <img
                        src={
                          isDarkMode
                            ? "src/assets/wind-light.svg"
                            : "src/assets/wind-dark.svg"
                        }
                        alt="Wind"
                        className="h-[35px] w-[35px]"
                      />
                      {Math.round(weather.wind.speed)} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
