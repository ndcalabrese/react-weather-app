function fetchWeather(zip) {
    fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((geoData) => {
            const locationInfo = {
                latitude: geoData.lat,
                longitude: geoData.lon,
                name: geoData.name,
            };
            fetchDataFromLocation(locationInfo);
        })
        .catch((error) => {
            console.error("Request failed", error);
        });
}

function fetchDataFromLocation({latitude, longitude, name}) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((data) => {
            data.name = name;
            let extractedData = {
                name: data.name,
                date: data.current.dt,
                currentTemp: Math.round(data.current.temp),
                currentConditions: data.current.weather[0].main,
                todaysHigh: Math.round(data.daily[0].temp.max),
                todaysLow: Math.round(data.daily[0].temp.min)
            };
            renderWeatherData(extractedData);
        })
        .catch((error) => {
            console.error("Request failed", error);
        });
}