import { getCurrentWeather } from "./api.js";
import { bindSearch, getCityInput, renderMessage, renderWeather } from "./ui.js";

async function handleSearch() {
    const city = getCityInput();
    if (!city) {
        renderMessage("Please enter a city name.");
        return;
    }

    renderMessage("Loading...");

    try {
        const data = await getCurrentWeather(city);
        renderWeather(data);
    } catch (error) {
        renderMessage("Unable to fetch weather. Check the city name or API key.");
    }
}

bindSearch(handleSearch);
renderMessage("Enter a city and press Search.");