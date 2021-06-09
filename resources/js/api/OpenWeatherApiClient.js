/* eslint-env browser */

// Tragen Sie hier Ihren persönlichen API-Key für die Anfragen an die OpenWeatherMap-API ein
const API_KEY = "3983ba09a0569569fd1d1e03bc407ff4",

    // Über diese URL erhalten Sie die Wetterdaten für die angegebene Stadt ein (ersetzen Sie vor dem Aufruf $CITY und $API_KEY durch die entsprechenden Werte)
    FETCH_CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=$CITY,DE&appid=${API_KEY}&lang=DE&units=metric`;

/*class WeatherData {
    constructor(name, currentTemp, minTemp, maxTemp) {
        this.name = name;
        this.currentTemp = currentTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        Object.freeze(this);
    }
}*/

class APIClient {
    async fetchWeatherDataForLocation(location) {
        return await fetch(FETCH_CURRENT_WEATHER_URL.replace("$CITY", location));
    }
}

export default APIClient;