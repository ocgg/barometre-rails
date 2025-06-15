import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    var map = L.map('map').setView([47.216671, -1.55], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const url = "/api/venues";
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then((data => {
        data.forEach(venue => {
          L.marker([venue.latitude, venue.longitude])
            .addTo(map)
            .bindPopup(`<b>${venue.name}</b><br>${venue.address}`);
        });
      }));
  }
}
