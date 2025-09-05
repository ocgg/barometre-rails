import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const map = L.map('map', {
      zoomControl: false,
    }).setView([47.216671, -1.55], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.control.zoom({position: "bottomright"}).addTo(map);

    const url = "/api/venues";
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then((data => {
        data.forEach(venue => {
          L.marker([venue.latitude, venue.longitude])
            .bindPopup(`<b>${venue.name}</b><br>${venue.address}`)
            .addTo(map)
        });
      }));
  }
}
