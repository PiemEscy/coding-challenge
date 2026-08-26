
// Challenge: Weather-Adjusted Delivery Risk Report

// You run logistics for a delivery company. You have a local list of scheduled deliveries, each tied to a city. You need to fetch current weather for each unique city (using the free Open-Meteo API, no key required), tag each delivery with a "risk level" based on wind speed/precipitation, and produce a summary report of at-risk deliveries.

// API: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m,precipitation

// Requirements
// fetchWeather(lat, lon) — fetches current weather for one coordinate pair, throws on non-ok response.
// deliveries() — returns a hardcoded array of delivery objects, each with id, city, lat, lon, packageValue.
// getUniqueCities(deliveryList) — dedupes deliveries by city so you don't fetch the same city's weather twice (this is the twist — your invoice version fetched rates once for all currencies in one call; here you must avoid redundant calls per city).
// assignRiskLevel(weatherData) — given wind speed + precipitation, return "low", "medium", or "high" risk (you decide thresholds, e.g. wind > 40km/h or precip > 5mm = high).
// enrichDeliveries(deliveryList, weatherByCity) — maps each delivery to include its city's weather + risk level.
// calculateExposedValue(enrichedList) — sums packageValue for all deliveries with "high" risk only (a filtered reduce, not a plain total — the twist on your calculateOutstandingGbpBalance).
// result(enrichedList) — returns { deliveries: enrichedList, highRiskCount, totalExposedValue }.
// Extra constraints to push you further than the original:
// You must fetch weather for each unique city in parallel using Promise.all, not sequentially in a loop.
// Handle the case where one city's fetch fails without crashing the whole report (use Promise.allSettled or try/catch per fetch, and mark that city's deliveries as "unknown" risk).


function deliveries() {
    const deliveryList = `[
        {
            "id": 1,
            "city": "London",
            "lat": 51.5074,
            "lon": -0.1278,
            "packageValue": 320.00
        },
        {
            "id": 2,
            "city": "Manchester",
            "lat": 53.4808,
            "lon": -2.2426,
            "packageValue": 145.50
        },
        {
            "id": 3,
            "city": "London",
            "lat": 51.5074,
            "lon": -0.1278,
            "packageValue": 780.25
        },
        {
            "id": 4,
            "city": "Edinburgh",
            "lat": 55.9533,
            "lon": -3.1883,
            "packageValue": 99.99
        },
        {
            "id": 5,
            "city": "Manchester",
            "lat": 53.4808,
            "lon": -2.2426,
            "packageValue": 210.00
        },
        {
            "id": 6,
            "city": "Bristol",
            "lat": 51.4545,
            "lon": -2.5879,
            "packageValue": 55.75
        },
        {
            "id": 7,
            "city": "Edinburgh",
            "lat": 55.9533,
            "lon": -3.1883,
            "packageValue": 640.00
        },
        {
            "id": 8,
            "city": "London",
            "lat": 51.5074,
            "lon": -0.1278,
            "packageValue": 15.20
        }
    ]`;

    const data = JSON.parse(deliveryList);
    return data;
}

function getUniqueCities(deliveryList) {
    
}