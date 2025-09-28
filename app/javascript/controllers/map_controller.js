import { Controller } from "@hotwired/stimulus"
import L from "leaflet"
import "leaflet-css"

export default class extends Controller {
  static targets = [
    "venuesData",
    "eventElt",
    "eventList",
    "dateElt"
  ]

  static values = {
    markerIcon: String,
    locationIcon: String,
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
      .addTo(this.map);

    this.markerIcon = L.icon({
      iconUrl: this.markerIconValue,
      className: "hover:cursor-pointer rounded-full",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -19] // relative to iconAnchor
    });
  }

  get markers() {
    if (this.localized) {
      return [...Object.values(this.venuesMarkers), this.locationMarker]
    }
    else return Object.values(this.venuesMarkers)

  }

  venuesDataTargetConnected() {
    this.removeMarkers();
    this.createMarkers();
    this.fitToMarkers();
  }

  removeMarkers() {
    Object.values(this.venuesMarkers).forEach(marker => marker.remove());
    this.venuesMarkers = {};
  }

  createMarkers() {
    const venues = JSON.parse(this.venuesDataTarget.value);
    venues.forEach(venue => this.createMarker(venue));
  }

  createMarker(venue) {
    const marker = L.marker([venue.latitude, venue.longitude], { icon: this.markerIcon })
      .bindPopup(`<b>${venue.name}</b><br>${venue.address}`)
      .addTo(this.map);
    marker._icon.addEventListener("mouseover", this.onEventMouseOver.bind(this));
    marker._icon.addEventListener("mouseleave", this.onEventMouseLeave.bind(this));
    marker._icon.addEventListener("click", () => this.onMarkerClick(marker));
    marker._icon.dataset.venueId = venue.id;
    this.venuesMarkers[venue.id] = marker;
  }

  fitToMarkers() {
    if (this.markers.length === 0) return;

    const group = new L.featureGroup(this.markers);
    const opts = {
      maxZoom: 13,
      paddingTopLeft: [384, 0]
    };
    this.map.flyToBounds(group.getBounds().pad(0.5), opts);
  }

  panTo(marker) {
    const group = new L.featureGroup([marker]);
    const opts = {
      maxZoom: this.map.getZoom(),
      paddingTopLeft: [384, 0],
    };
    this.map.flyToBounds(group.getBounds().pad(0.5), opts);
  }

  onEventClick(event) {
    const venueId = event.currentTarget.dataset.venueId;
    const venueMarker = this.venuesMarkers[venueId];
    this.panTo(venueMarker);
  }

  onMarkerClick(marker) {
    this.panTo(marker);
    const venueId = marker._icon.dataset.venueId;
    const event = this.eventEltTargets.find(elt => elt.dataset.venueId == venueId);
    const top = event.offsetTop - this.eventListTarget.offsetTop;
    this.eventListTarget.scrollTo({ top: top, behavior: "smooth" });
  }

  onEventMouseOver(event) {
    const venueId = event.target.dataset.venueId;
    const marker = this.venuesMarkers[venueId];
    const events = this.eventEltTargets.filter(elt => elt.dataset.venueId == venueId);
    this.addEventHoverClass(events, marker._icon);
  }

  onEventMouseLeave(event) {
    const venueId = event.target.dataset.venueId;
    const marker = this.venuesMarkers[venueId];
    const events = this.eventEltTargets.filter(elt => elt.dataset.venueId == venueId);
    this.removeEventHoverClass(events, marker._icon);
  }

  addEventHoverClass(eventElts, markerElt) {
    eventElts.forEach(elt => elt.classList.add("border-yellow"));
    markerElt.classList.add("bg-yellow");
    markerElt.style.zIndex += 1000000;
  }

  removeEventHoverClass(eventElts, markerElt) {
    eventElts.forEach(elt => elt.classList.remove("border-yellow"));
    markerElt.classList.remove("bg-yellow");
    markerElt.style.zIndex -= 1000000;
  }

  startEventListDrag(event) {
    event.preventDefault(); // to keep listening when mouse leaves drag elt
    const baseY = event.clientY;
    // TODO: set drag limits & use them in onMove()
    const maxY = 0;
    const minY = 0;
    const onMove = (moveEvt) => {
      // this is broken
      const mouseY = moveEvt.clientY - baseY;
      this.dateEltTarget.style.marginTop = `${mouseY}px`;
    }
    const onUp = (upEvt) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  // called from locationfilter controller
  onLocalization(lat, long) {
    const locationIcon = L.icon({
      iconUrl: this.locationIconValue,
      className: "hover:cursor-pointer rounded-full",
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });
    this.locationMarker = L.marker([lat, long], { icon: locationIcon }).addTo(this.map);
    this.localized = true;
  }

  onDesactivateLocalization() {
    this.locationMarker.remove();
    this.localized = false;
  }
}
