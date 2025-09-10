import { Controller } from "@hotwired/stimulus"
import L from "leaflet"
import "leaflet-css"

export default class extends Controller {
  static targets = ["venuesData", "eventElt"]

  static values = {
    markerIcon: String,
    markerIconHover: String,
  }

  initialize() {
    this.venuesMarkers = {};

    this.map = L.map('map', { attributionControl: false }).setView([47.216671, -1.55], 13);

    this.map.zoomControl.setPosition("bottomright");
    L.control.scale({ position: "bottomright", imperial: false }).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 })
      .addTo(this.map);

    const leafletAttribbution = '<a href="https://leafletjs.com"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag inline"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a>';
    L.control.attribution({ prefix: leafletAttribbution, position: "topright" })
      .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>')
      .addTo(this.map)

    this.markerIcon = L.icon({
      iconUrl: this.markerIconValue,
      className: "hover:cursor-pointer rounded-full",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -19] // relative to iconAnchor
      // shadowUrl: this.markerIconValue,
      // shadowSize: [50, 64],
      // shadowAnchor: [4, 62],
    });
  }

  get markers() { return Object.values(this.venuesMarkers) }

  venuesDataTargetConnected() {
    this.removeMarkers();
    this.createMarkers();
    this.setBoundaries(this.markers);
  }

  removeMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.venuesMarkers = {};
  }

  createMarkers() {
    const venues = JSON.parse(this.venuesDataTarget.value)
    venues.forEach(venue => this.createMarker(venue));
  }

  createMarker(venue) {
    const marker = L.marker([venue.latitude, venue.longitude], { icon: this.markerIcon })
      .bindPopup(`<b>${venue.name}</b><br>${venue.address}`)
      .addTo(this.map)
    marker._icon.addEventListener("mouseover", this.onEventMouseOver.bind(this))
    marker._icon.addEventListener("mouseleave", this.onEventMouseLeave.bind(this))
    marker._icon.dataset.venueId = venue.id;
    this.venuesMarkers[venue.id] = marker;
  }

  setBoundaries(points) {
    if (points.length === 0) return;

    const group = new L.featureGroup(points);
    const opts = {
      maxZoom: 13,
      paddingTopLeft: [384, 0]
    }
    this.map.flyToBounds(group.getBounds().pad(0.5), opts)
  }

  onEventClick(event) {
    const venueId = event.currentTarget.dataset.venueId;
    const venueMarker = this.venuesMarkers[venueId]
    this.setBoundaries([venueMarker])
  }

  onEventMouseOver(event) {
    const venueId = event.target.dataset.venueId
    const marker = this.venuesMarkers[venueId]
    const events = this.eventEltTargets.filter(elt => elt.dataset.venueId == venueId)
    this.addHoverClass(events, marker._icon)
  }

  onEventMouseLeave(event) {
    const venueId = event.target.dataset.venueId
    const marker = this.venuesMarkers[venueId]
    const events = this.eventEltTargets.filter(elt => elt.dataset.venueId == venueId)
    this.removeHoverClass(events, marker._icon)
  }

  addHoverClass(eventElts, markerElt) {
    eventElts.forEach(elt => elt.classList.add("border-yellow"))
    markerElt.classList.add("bg-yellow");
    markerElt.style.zIndex += 250;
  }

  removeHoverClass(eventElts, markerElt) {
    eventElts.forEach(elt => elt.classList.remove("border-yellow"))
    markerElt.classList.remove("bg-yellow");
    markerElt.style.zIndex -= 250;
  }
}
