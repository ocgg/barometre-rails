import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="venue-fields"
export default class extends Controller {
  static targets = [
    "searchInput",
    "resultsContainer",
    "resultsList",
    "noResult",
    "template"
  ]

  onVenueInput(event) {
    const query = this.searchInputTarget.value;
    const url = `/venues?q=${query}`;
    const opts = {headers: { "Accept": "application/json" }};

    fetch(url, opts)
      .then(response => response.json())
      .then((venues) => {
        //this.resultsContainerTarget.classList.toggle("hidden", false);
        this.noResultTarget.classList.toggle("hidden", !(venues.length === 0));
        this.resultsListTarget.innerHTML = '';
        venues.forEach(venue => {
          const clone = this.templateTarget.content.cloneNode(true);
          clone.querySelector("li").dataset.venue_id = venue.id;
          clone.querySelector(".venue-name").innerText = venue.name;
          clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
          this.resultsListTarget.appendChild(clone);
        });
      });
  }

  onVenueSelect(event) {
    console.log(event.currentTarget.dataset.venue_id)
  }
}
