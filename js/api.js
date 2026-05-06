export async function getCurrentWeather(city) {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return response.json();
}