import { Controller } from "@hotwired/stimulus"
import "leaflet"
import "leaflet-css"

export default class extends Controller {
  static values = { markerIcon: String }
  connect() {
    this.initMap();
    this.fetchVenues();
  }

  initMap() {
    this.map = L.map('map', {
      zoomControl: false,
    }).setView([47.216671, -1.55], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.markerIcon = L.icon({
      iconUrl: this.markerIconValue,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -19] // relative to iconAnchor
      // shadowUrl: this.markerIconValue,
      // shadowSize: [50, 64],
      // shadowAnchor: [4, 62],
    });

    L.control.zoom({ position: "bottomright" }).addTo(this.map);
  }

  fetchVenues() {
    const url = "/api/venues";
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then((data => {
        data.forEach(venue => {
          L.marker([venue.latitude, venue.longitude], { icon: this.markerIcon })
            .bindPopup(`<b>${venue.name}</b><br>${venue.address}`)
            .addTo(this.map)
        });
      }));
  }
}
