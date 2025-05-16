import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "addEventBtn",
    "venueDropdown",
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
  }

  onPlusBtnClick(_) {
    const clone = this.lastEventClone();
    this.eventsListTarget.appendChild(clone);
    this.hideAllVenueDropdowns();
  }

  lastEventClone() {
    const clone = this.eventFieldsTargets[this.eventsNumber - 1].cloneNode(true);
    clone.querySelector(".errors")?.remove();
    clone.querySelector(".trash-btn").classList.remove("hidden")
    return clone
  }

  hideAllVenueDropdowns() {
    this.venueDropdownTargets.forEach(dropdown => {
      dropdown.classList.toggle("hidden", true);
    });
  }

  handleVenueDropdownFocusOut(event) {
    if (this.eventTargetIsInsideVenueDropdown(event.target))
    this.hideAllVenueDropdowns();
  }

  eventTargetIsInsideVenueDropdown(target) {
    this.venueDropdownTargets.every(dropdown => dropdown.contains)
  }
}
