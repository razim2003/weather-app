# Weather Now

[Live app](https://weather-app-gold-eight-14.vercel.app/)

Weather Now is an installable progressive web app. It searches current conditions through the WeatherAPI service, keeps the app shell available offline, and can show the last successfully loaded weather for a city when the network is unavailable.

## Run locally

The app uses the Vercel serverless function in `api/weather.js`, so serve it with Vercel's local development server rather than opening `index.html` directly:

1. Install the Vercel CLI.
2. Set the `WEATHER_API_KEY` environment variable using an API key from [WeatherAPI](https://www.weatherapi.com/).
3. Run `vercel dev` from the project directory.

The app can be installed from a supported browser when served over HTTPS (or localhost). On iOS, use the browser's **Add to Home Screen** option. Previously loaded app files and weather searches are available offline; a new city search still requires a network connection.