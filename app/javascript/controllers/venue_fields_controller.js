import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="venue-fields"
export default class extends Controller {
  static targets = [
    "venueIdInput",
    "searchInput",
    "resultsList",
    "noResult",
    "template",
    "dropdown",
    "address",
    "city",
    "clearInputBtn",
  ]

  onVenueInput(_) {
    this.clearInputBtnTarget.classList.toggle("hidden", !this.searchInputTarget.value.length);
    this.show(this.dropdownTarget);
    this.fetchVenues();
  }

  fetchVenues() {
    const url = `/venues?q=${this.searchInputTarget.value}`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venues => this.setAndRenderVenues(venues));
  }

  setAndRenderVenues(venues) {
    this.venues = venues;
    this.noResultTarget.classList.toggle("hidden", !(this.venues.length === 0));
    this.renderVenues();
  }

  renderVenues() {
    this.resultsListTarget.innerHTML = '';
    this.venues.forEach(venue => this.renderVenue(venue));
  }

  renderVenue(venue) {
    const clone = this.templateTarget.content.cloneNode(true);
    const li = clone.querySelector("li");
    li.dataset.id = venue.id;
    li.dataset.name = venue.name;
    clone.querySelector(".venue-name").innerText = venue.name;
    clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
    this.resultsListTarget.appendChild(clone);
  }

  onVenueSelect(event) {
    const venue_data = event.currentTarget.dataset;
    this.setSelectedVenue(venue_data.id);
    this.hide(this.dropdownTarget);
  }

  setSelectedVenue(venueId) {
    const venue = this.venues.find(venue => venue.id == venueId);
    this.enableIdInput(venue);
    this.disableSearchInput(venue);
    this.displayAddressAndCity(venue);
    this.hide(this.dropdownTarget);
  }

  enableIdInput(venue) {
    this.venueIdInputTarget.disabled = false;
    this.venueIdInputTarget.value = venue.id;
  }

  disableIdInput() {
    this.venueIdInputTarget.disabled = true;
    this.venueIdInputTarget.value = "";
  }

  resetSearchInput() {
    this.hideAddressAndCity();
    this.searchInputTarget.disabled = false;
    this.searchInputTarget.value = "";
    this.hide(this.clearInputBtnTarget);
    this.hide(this.dropdownTarget);
    this.searchInputTarget.focus();
  }

  disableSearchInput(venue) {
    this.searchInputTarget.disabled = true;
    this.searchInputTarget.value = venue.name;
    this.show(this.clearInputBtnTarget);
  }

  displayAddressAndCity(venue) {
    this.addressTarget.innerText = venue.address;
    this.cityTarget.innerText = `${venue.city}`;
    this.show(this.addressTarget);
    this.show(this.cityTarget);
  }

  hideAddressAndCity() {
    this.hide(this.addressTarget);
    this.hide(this.cityTarget);
  }

  hide(element) { element.classList.add("hidden") }

  show(element) { element.classList.remove("hidden") }

  onClearBtnClick() {
    this.resetSearchInput();
  }
}
