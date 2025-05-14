import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="venue-fields"
export default class extends Controller {
  static targets = [
    "venueIdInput",
    "searchInput",
    "resultsContainer",
    "resultsList",
    "noResult",
    "template"
  ]

  onVenueInput(_) {
    const url = `/venues?q=${this.searchInputTarget.value}`;
    this.fetchVenues(url);
  }

  fetchVenues(url) {
    const opts = {headers: { "Accept": "application/json" }};
    fetch(url, opts)
      .then(response => response.json())
      .then(venues => this.renderVenues(venues));
  }

  renderVenues(venues) {
    this.noResultTarget.classList.toggle("hidden", !(venues.length === 0));
    this.resultsListTarget.innerHTML = '';
    venues.forEach(venue => this.renderVenue(venue));
  }

  renderVenue(venue) {
    const clone = this.templateTarget.content.cloneNode(true);
    clone.querySelector("li").dataset.venue_id = venue.id;
    clone.querySelector(".venue-name").innerText = venue.name;
    clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
    this.resultsListTarget.appendChild(clone);
  }

  onVenueSelect(event) {
    const venueId = event.currentTarget.dataset.venue_id;
    this.venueIdInputTarget.value = venueId;
  }
}
