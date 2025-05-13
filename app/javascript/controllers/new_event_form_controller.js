import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="new-event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "addEventBtn",
    "venueInput",
    "venueResults",
    "resultsContainer",
    "noResult",
    "venueTemplate"
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
  }

  onPlusBtnClick(_) {
    const clone = this.lastEventClone();
    this.eventsListTarget.appendChild(clone);
  }

  lastEventClone() {
    const length = this.eventFieldsTargets.length;
    const clone = this.eventFieldsTargets[length - 1].cloneNode(true);
    clone.querySelector(".errors")?.remove();
    clone.querySelector(".trash-btn").classList.remove("hidden")
    return clone
  }

  onVenueInput(event) {
    const query = this.venueInputTarget.value;
    const url = `/venues?q=${query}`;
    const opts = {headers: { "Accept": "application/json" }};

    fetch(url, opts)
      .then(response => response.json())
      .then((venues) => {
        //this.venueResultsTarget.classList.toggle("hidden", false);
        this.noResultTarget.classList.toggle("hidden", !(venues.length === 0));
        this.resultsContainerTarget.innerHTML = '';
        venues.forEach(venue => {
          const clone = this.venueTemplateTarget.content.cloneNode(true);
          clone.querySelector(".venue-name").innerText = venue.name;
          clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
          clone.querySelector("div").dataset.venue_id = venue.id;
          this.resultsContainerTarget.appendChild(clone);
        });
      });
  }

  onVenueSelect(event) {
    console.log(event.currentTarget.dataset.venue_id)
  }
}
