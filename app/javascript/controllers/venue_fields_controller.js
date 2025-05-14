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
    "city"
  ]

  onVenueInput(_) {
    this.showDropdown();
    this.fetchVenues();
  }

  fetchVenues() {
    const url = `/venues?q=${this.searchInputTarget.value}`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venues => {
        this.venues = venues;
        this.noResultTarget.classList.toggle("hidden", !(this.venues.length === 0));
        this.renderVenues();
      });
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
    this.dropdownTarget.classList.add("hidden");
  }

  setSelectedVenue(venueId) {
    const venue = this.venues.find(venue => venue.id == venueId)
    this.setIdInput(venue);
    this.setSearchInput(venue);
    this.displaySelectedVenueInfos(venue);
    this.hideDropdown();
  }

  setIdInput(venue) {
    this.venueIdInputTarget.disabled = false;
    this.venueIdInputTarget.value = venue.id;
  }

  setSearchInput(venue) {
    this.searchInputTarget.value = venue.name;
    this.searchInputTarget.disabled = true;
  }

  displaySelectedVenueInfos(venue) {
    this.addressTarget.innerText = venue.address;
    this.cityTarget.innerText = `${venue.city}`;
  }

  showDropdown() {
    this.dropdownTarget.style.display = "block"
  }

  hideDropdown() {
    this.dropdownTarget.style.display = "none"
  }

  onFocusOut(event) {
    console.log(event)
    if (this.dropdownTarget.contains(event.target)) return;

    this.hideDropdown();
  }
}
