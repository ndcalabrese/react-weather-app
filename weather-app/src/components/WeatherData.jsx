function WeatherData({ data }) {
    console.log(data);
    return (
        <div id="location-weather">
            <div className="location-navbar">
                <div className="location-heading">
                    <h2 className="location-name">{data.name}</h2>
                    <p className="weather-location-date">{data.date}</p>
                </div>
            </div>
            <div className="location-body">
                <div className="location-temperature">
                    <p className="current-temp">
                        Currently: {data.currentTemp} &#176;F
                    </p>
                </div>
                <div className="location-conditions">
                    <p className="current-condition">
                        {data.currentConditions}
                    </p>
                    <p className="high-low-temp">
                        High: {data.todaysHigh} &#176;F
                    </p>
                    <p className="high-low-temp">
                        Low: {data.todaysLow} &#176;F
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeatherData;
