import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [time, setTime] = useState("");
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
          console.log(data);
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
        });
    }
  };

  useEffect(() => {
    if (weather.main) {
      getCurrentTime();
      DayOrNight();
    }
  }, [weather]); // Run these functions whenever the weather state changes

  const getVideoSource = () => {
    if (!place || !weather.weather || weather.weather.length === 0) {
      return "src/assets/default-2.mp4";
    } else {
      const description = weather.weather[0].description.toLowerCase();
      if (description.includes("rain")) {
        return "src/assets/rainy-weather.mp4";
      } else if (description.includes("clear")) {
        return "src/assets/clear-sky.mp4";
      } else {
        return "src/assets/default.mp4";
      }
    }
  };

  const getCurrentTime = () => {
    if (weather.dt && weather.timezone) {
      const timestamp = weather.dt * 1000;
      const localTime = new Date(timestamp + weather.timezone * 1000);
      setTime(localTime.toLocaleString());
    } else {
      setTime("Time not available");
    }
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

  // ---------------------------------------------------------------
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        color: "black",
      }}
    >
      <video autoPlay muted loop className="video-background">
        <source src={getVideoSource()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="input-field flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          onKeyDown={searchWeather}
          className="h-8 w-[300px] mt-2 border border-slate-950 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      {error ? (
        <p>City not found</p>
      ) : (
        weather.main && (
          <div className="h-[700px] w-[100%] flex justify-center items-center">
            <div className="weather-details h-[200px] w-[300px] bg-slate-600 backdrop-blur-xl bg-opacity-30 border border-slate-300 rounded-lg flex flex-col justify-center items-center">
              <p className="opacity-100 text-white">
                <span className="text-6xl">{weather.main.temp}</span>
                <span className="relative text-2xl top-[-26px]">°C</span>
              </p>
              <p>{weather.name},{weather.sys.country}</p>
              <p className="opacity-100 text-white mt-2 pr-3">
                {weather.weather[0].description.toUpperCase()}
              </p>
              <p className="opacity-100 text-white">Current Time: {time}</p>
              {/* <p>Now it's {DayNight}</p> */}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default App;

// NOTE:
// - Add different bgs according to weather
// - Add styling
// - Thinking of adding magical Ui
// - will use tailwind

// Different weather conditions:
// 1. Clear sky
// 2. few clouds
// 3. scattered clouds
// 4. broken clouds
// 5. light rain
// 6. rain
// 7. thunderstorm
// 8. thunderstorm with rain
// 9. heavy rain
// 10. snow
// 11. mist/fog

//Extra Details
// 1. Sunrise
// 2. Sunset
// 3. Max TEmp
// 4. Min Temp
// 5. Humidity
// 6. Wind Speed