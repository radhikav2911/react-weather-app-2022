import { useState, useEffect } from "react";

import Loader from "./Loader";

const api = {
  key: "d6a1242e4fb7d7b5d17cc1f071627167",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [location, setLocation] = useState("stockholm");
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLocationInfo(result);
        setLocation("");
        setLoading(false);
        console.log(result);
      });
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetchData();
    }
  };

  const getCurrentDate = () => {
    let newDate = new Date();
    let day = newDate.toLocaleDateString("en-US", { weekday: "long" });
    let date = newDate.getDate();
    let month = newDate.toLocaleString("default", { month: "long" });
    let year = newDate.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  const bgImage = (climate) => {
    if (climate === "Clouds") {
      return "container clouds";
    } else if (climate === "Rain") {
      return "rain";
    } else if (climate === "Mist") {
      return "mist";
    } else if (climate === "Sunny") {
      return "warm";
    } else if (climate === "Snow") {
      return "snow";
    } else if (climate === "Clear") {
      return "clear";
    }
  };

  return (
    <div
      className={
        typeof locationInfo.main !== "undefined"
          ? bgImage(locationInfo.weather[0].main)
          : "container"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search with city..."
            value={location}
            onKeyPress={search}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader />
        ) : locationInfo && locationInfo.cod !== "404" ? (
          locationInfo.weather ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {locationInfo.name}, {locationInfo.sys.country}
                </div>

                <div className="date">{getCurrentDate()}</div>
              </div>
              <div className="weather-box">
                <div className="temperature">
                  {" "}
                  {Math.round(locationInfo.main.temp)}°c
                </div>
                <div className="climate">{locationInfo.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          <div className="notFound"> Sorry! City not found</div>
        )}
      </main>
    </div>
  );
}

export default App;
