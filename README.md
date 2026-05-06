# Weather App (Learning Flow)

This project keeps the code simple and split into small files so you can see the flow clearly.

## Files and Flow

1. `index.html` loads the page, styles, and the main JavaScript module.
2. `js/app.js` is the entry point. It reads user input and coordinates the app.
3. `js/api.js` handles the network call to WeatherAPI.
4. `js/ui.js` updates the page with messages and weather data.
5. `js/utils.js` builds the API URL and checks the API key.
6. `config/config.js` stores your API key and base URL.

## How It Works

- You enter a city and click **Get Weather**.
- `app.js` validates input and calls `api.js`.
- `api.js` fetches weather data from WeatherAPI.
- `ui.js` renders the results on the page.

## Setup

1. Get a free API key from https://www.weatherapi.com/
2. Open `config/config.js` and replace `YOUR_WEATHERAPI_KEY`.
3. Open `index.html` in a browser (or use Live Server).
