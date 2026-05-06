const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weatherDisplay");

export function bindSearch(handler) {
    getWeatherButton.addEventListener("click", handler);
    cityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handler();
        }
    });
}

export function getCityInput() {
    return cityInput.value.trim();
}

export function renderMessage(message) {
    weatherDisplay.innerHTML = `<div class="message">${message}</div>`;
}

export function renderWeather(data) {
    const location = data.location?.name || "Unknown";
    const region = data.location?.region || "";
    const country = data.location?.country || "";
    const tempC = data.current?.temp_c ?? "--";
    const condition = data.current?.condition?.text || "";
    const iconPath = data.current?.condition?.icon || "";
    const iconUrl = iconPath ? `https:${iconPath}` : "";
    const humidity = data.current?.humidity ?? "--";
    const windKph = data.current?.wind_kph ?? "--";
    const locationLine = `${location}${region ? ", " + region : ""}${country ? ", " + country : ""}`;
    const iconMarkup = iconUrl
        ? `<img class="weather-icon" src="${iconUrl}" alt="${condition}">`
        : "";

    weatherDisplay.innerHTML = `
        <div class="weather">
            <div class="weather-main">
                ${iconMarkup}
                <div class="weather-temp">${tempC}&deg;C</div>
            </div>
            <div class="weather-condition">${condition}</div>
            <div class="weather-location">${locationLine}</div>
            <div class="details">
                <div class="detail">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                <div class="detail">
                    <div class="detail-label">Wind</div>
                    <div class="detail-value">${windKph} kph</div>
                </div>
            </div>
        </div>
    `;
}