import React, { useState } from "react";

const App = () => {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
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
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        onKeyDown={searchWeather}
      />
      {error ? (
        <p>City not found</p>
      ) : (
        weather.main && (
          <div>
            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
