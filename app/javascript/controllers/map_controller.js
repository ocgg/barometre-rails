import { Controller } from "@hotwired/stimulus"
import "leaflet"
import "leaflet-css"

// Connects to data-controller="map"
export default class extends Controller {
  connect(){
    var map = L.map('map').setView([47.22, -1.55], 12);

    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  disconnect(){
    this.map.remove()
  }
}
