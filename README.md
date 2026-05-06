# Weather App

## Live Demo
[🌐 View Live App](https://weather-app-gold-eight-14.vercel.app/)

## 📌 Overview
This project keeps the code simple and split into small files so you can see the flow clearly.

## ⚙️ Project Structure
- index.html – loads the page, styles, and main JavaScript module
- js/app.js – entry point, handles user input
- js/api.js – handles API calls
- js/ui.js – updates UI
- js/utils.js – helper functions
- config/config.js – API config

## 🔄 How It Works
1. Enter a city and click Get Weather
2. app.js validates input and calls api.js
3. api.js fetches weather data
4. ui.js renders the result

## 🛠 Setup
1. Get API key from https://www.weatherapi.com/
2. Replace `YOUR_WEATHERAPI_KEY` in config/config.js
3. Open index.html or use Live Server