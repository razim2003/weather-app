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
        const result = await getCurrentWeather(city);
        renderWeather(result.data, result);
    } catch (error) {
        renderMessage(error.message || "Unable to fetch weather. Check your connection or try again.");
    }
}

bindSearch(handleSearch);
renderMessage("Enter a city and press Search.");

const installButton = document.getElementById("installApp");
let installPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    installPrompt = null;
    installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.error("Service worker registration failed:", error);
    });
}