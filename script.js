// Get user's real location using Geolocation API
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve({ lat, lon }); // Return coordinates
                },
                (error) => {
                    console.log("Geolocation error:", error.message);
                    resolve("Bangalore"); // Fallback if user denies permission
                }
            );
        } else {
            console.log("Geolocation not supported by browser");
            resolve("Bangalore"); // Fallback if browser doesn't support it
        }
    });
}

// Fetch recommendations based on filters and location
function fetchRecommendations() {
    const distance = document.getElementById("distance").value;
    const rating = document.getElementById("rating").value;
    const dietary = document.getElementById("dietary").value;
    const cuisine = document.getElementById("cuisine").value;

    // Mock data (replace with Google Maps API later)
    const restaurants = [
        { name: "Biryani Blues", rating: 4.5, dish: "Chicken Biryani", cuisine: "indian", dietary: "non-veg", lat: 12.9716, lon: 77.5946 },
        { name: "Truffles", rating: 4.7, dish: "Veg Burger", cuisine: "indian", dietary: "veg", lat: 12.9716, lon: 77.5946 },
        { name: "Meghana Foods", rating: 4.3, dish: "Andhra Meal", cuisine: "south-indian", dietary: "non-veg", lat: 12.9716, lon: 77.5946 }
    ];

    // For now, filter only by rating, dietary, and cuisine (distance will need real API)
    const filtered = restaurants.filter(r => 
        r.rating >= rating && 
        r.dietary === dietary && 
        r.cuisine === cuisine
    );

    // Display results
    const recDiv = document.getElementById("recommendations");
    recDiv.innerHTML = "";
    filtered.forEach(r => {
        recDiv.innerHTML += `
            <div class="recommendation">
                <h3>${r.name} (${r.rating}★)</h3>
                <p>Try: ${r.dish}</p>
            </div>
        `;
    });
}

// Initialize location on page load
window.onload = async () => {
    const location = await getLocation();
    let locationText;
    if (typeof location === "string") {
        locationText = `Location: ${location} (default)`;
    } else {
        locationText = `Location: Lat ${location.lat.toFixed(2)}, Lon ${location.lon.toFixed(2)}`;
        // Eventually, use these coordinates with Google Maps API
    }
    document.getElementById("location").textContent = locationText;
    fetchRecommendations(); // Initial load
};
