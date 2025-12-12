
let map, marker;

// Open Map When Input Clicked
document.getElementById("custlocation").addEventListener("click", () => {
  document.getElementById("mapModal").style.display = "flex";

  if (!map) initializeMap();
});

function initializeMap() {
  map = L.map("map").setView([0.3476, 32.5825], 13); // Kampala center

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  marker = L.marker(map.getCenter(), { draggable: true }).addTo(map);
  
  marker.on("dragend", updateLocation);
  map.on("moveend", () => {
    marker.setLatLng(map.getCenter());
    updateLocation();
  });

  updateLocation();
}

// Search Location
document.getElementById("searchBox").addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      map.setView([data[0].lat, data[0].lon], 16);
    }
  }
});

// Update Location Info
async function updateLocation() {
  const lat = marker.getLatLng().lat;
  const lng = marker.getLatLng().lng;

  // Reverse geocode
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  const json = await res.json();

  const address = json.display_name;

  document.getElementById("locationInput").value = address;
  document.getElementById("locationInput").dataset.lat = lat;
  document.getElementById("locationInput").dataset.lng = lng;
}

// Close Map
document.getElementById("closeMap").addEventListener("click", () => {
  document.getElementById("mapModal").style.display = "none";
});
