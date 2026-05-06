# Weather App

Live demo: https://weather-app-gold-eight-14.vercel.app/

Minimal weather app that fetches current conditions from WeatherAPI and renders them in a clean, responsive UI. The browser never sees the API key because requests go through a Vercel Serverless Function.

## Project Structure

1. `index.html` loads the page, styles, and main JavaScript module.
2. `js/app.js` handles user input and coordinates the UI updates.
3. `js/api.js` calls the serverless endpoint at `/api/weather`.
4. `js/ui.js` renders messages and weather data.
5. `api/weather.js` is the Vercel Serverless Function that talks to WeatherAPI.

## How It Works

- Enter a city and click **Search**.
- The browser calls `/api/weather?city=London`.
- The serverless function fetches WeatherAPI data using `WEATHER_API_KEY` from the environment.
- The UI renders the returned JSON.

## Setup (Local)

1. Get a free API key from https://www.weatherapi.com/
2. Run the project on a local server (Live Server or any static server).

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Add an environment variable:
	- `WEATHER_API_KEY` = your WeatherAPI key
3. Deploy.
