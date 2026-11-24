export async function getCurrentWeather(city) {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
        throw new Error(response.status === 503
            ? "Weather is unavailable offline. Search again when you have a connection."
            : "Unable to fetch weather. Check the city name or API key.");
    }

    return {
        data: await response.json(),
        isOffline: response.headers.get("X-Weather-Offline") === "true",
        cachedAt: response.headers.get("X-Weather-Cached-At")
    };
}