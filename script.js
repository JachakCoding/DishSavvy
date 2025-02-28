// Get user's real location
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve({ lat, lon });
                },
                () => resolve("Bangalore") // Fallback
            );
        } else {
            resolve("Bangalore");
        }
    });
}

// Convert coordinates to city name using Geocoding API
async function getCityName(lat, lon) {
    const apiKey = "AIzaSyDdz1CqNl49txkPaDcYXM8Yn9EvXksKVss"; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const city = data.results[0]?.address_components.find(comp => comp.types.includes("locality"))?.long_name;
        return city || "Unknown";
    } catch (error) {
        console.log("Geocoding error:", error);
        return "Bangalore";
    }
}

// Fetch recommendations (mock for now)
function fetchRecommendations() {
    const distance = document.getElementById("distance").value;
    const rating = document.getElementById("rating").value;
    const dietary = document.getElementById("dietary").value;
    const cuisine = document.getElementById("cuisine").value;

    const restaurants = [
        { name: "Biryani Blues", rating: 4.5, dish: "Chicken Biryani", cuisine: "indian", dietary: "non-veg" },
        { name: "Truffles", rating: 4.7, dish: "Veg Burger", cuisine: "indian", dietary: "veg" }
    ];

    const filtered = restaurants.filter(r => 
        r.rating >= rating && r.dietary === dietary && r.cuisine === cuisine
    );

    const recDiv = document.getElementById("recommendations");
    recDiv.innerHTML = filtered.map(r => `
        <div class="recommendation">
            <h3>${r.name} (${r.rating}★)</h3>
            <p>Try: ${r.dish}</p>
        </div>
    `).join("");
}

// Initialize on page load
window.onload = async () => {
    const location = await getLocation();
    let locationText;
    if (typeof location === "string") {
        locationText = `Location: ${location} (default)`;
    } else {
        const city = await getCityName(location.lat, location.lon);
        locationText = `Location: ${city}`;
    }
    document.getElementById("location").textContent = locationText;
    fetchRecommendations();
};
