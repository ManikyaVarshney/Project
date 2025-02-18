function getWeather() {
    let city = document.getElementById("city").value;
    let url = `https://wttr.in/${city}?format=%C|%t|%w|%h`;

    fetch(url)
        .then(response => response.text())
        .then(data => {
            let weatherData = data.split("|");
            let weatherCondition = weatherData[0];
            let temperature = weatherData[1];
            let windSpeed = weatherData[2];
            let humidity = weatherData[3];

            document.getElementById("weather-result").innerHTML = `
                <p>🌤️ Condition: ${weatherCondition}</p>
                <p>🌡️ Temperature: ${temperature}</p>
                <p>💨 Wind Speed: ${windSpeed}</p>
                <p>💧 Humidity: ${humidity}</p>
            `;

            changeBackground(weatherCondition);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function changeBackground(condition) {
    let body = document.body;
    if (condition.includes("Clear")) {
        body.style.background = "linear-gradient(to right, #ffcc00, #ff9900)";
    } else if (condition.includes("Cloudy") || condition.includes("Overcast")) {
        body.style.background = "linear-gradient(to right, #808080, #b3b3b3)";
    } else if (condition.includes("Rain") || condition.includes("Drizzle")) {
        body.style.background = "linear-gradient(to right, #0072ff, #00c6ff)";
    } else if (condition.includes("Snow")) {
        body.style.background = "linear-gradient(to right, #ffffff, #c0c0c0)";
    } else {
        body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }
}
