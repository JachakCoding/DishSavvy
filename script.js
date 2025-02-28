// Simulate location detection (replace with real API later)
function getLocation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Bangalore"), 1000); // Mock delay
    });
}

// Fetch recommendations based on filters
function fetchRecommendations() {
    const distance = document.getElementById("distance").value;
    const rating = document.getElementById("rating").value;
    const dietary = document.getElementById("dietary").value;
    const cuisine = document.getElementById("cuisine").value;

    // Mock data (replace with Google Maps API later)
    const restaurants = [
        { name: "Biryani Blues", rating: 4.5, dish: "Chicken Biryani", cuisine: "indian", dietary: "non-veg" },
        { name: "Truffles", rating: 4.7, dish: "Veg Burger", cuisine: "indian", dietary: "veg" },
        { name: "Meghana Foods", rating: 4.3, dish: "Andhra Meal", cuisine: "south-indian", dietary: "non-veg" }
    ];

    // Filter results
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
    document.getElementById("location").textContent = `Location: ${location}`;
    fetchRecommendations(); // Initial load
};
