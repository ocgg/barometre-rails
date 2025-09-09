import { Controller } from "@hotwired/stimulus"
import L from "leaflet"
import "leaflet-css"

export default class extends Controller {
  static targets = ["venuesData"]

  static values = {
    markerIcon: String,
  }

  initialize() {
    this.markers = [];
    this.map = L.map('map').setView([47.216671, -1.55], 13);
    this.map.zoomControl.setPosition("bottomright");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.markerIcon = L.icon({
      iconUrl: this.markerIconValue,
      className: "hover:cursor-pointer",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -19] // relative to iconAnchor
      // shadowUrl: this.markerIconValue,
      // shadowSize: [50, 64],
      // shadowAnchor: [4, 62],
    });
  }

  venuesDataTargetConnected() {
    this.removeMarkers();
    this.createMarkers();
    this.addMarkersToMap();
  }

  removeMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  createMarkers() {
    JSON.parse(this.venuesDataTarget.value).forEach(venue => this.createMarker(venue));
  }

  createMarker(venue) {
    const marker = L.marker([venue.latitude, venue.longitude], { icon: this.markerIcon })
      .bindPopup(`<b>${venue.name}</b><br>${venue.address}`)
    this.markers.push(marker)
  }

  addMarkersToMap() {
    this.markers.forEach(marker => marker.addTo(this.map))
  }
}
