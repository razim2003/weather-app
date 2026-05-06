export default async function handler(request, response) {
    const city = String(request.query.city || "").trim();

    if (!city) {
        response.status(400).json({ error: "Missing city parameter" });
        return;
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        response.status(500).json({ error: "Server misconfigured" });
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            response.status(apiResponse.status).json({ error: data.error?.message || "Request failed" });
            return;
        }

        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: "Weather service unavailable" });
    }
}
