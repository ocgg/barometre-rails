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
    this.hideVenueFieldsDropdowns();
  }

  lastEventClone() {
    const clone = this.eventFieldsTargets[this.eventsNumber - 1].cloneNode(true);
    clone.querySelector(".errors")?.remove();
    clone.querySelector(".trash-btn").classList.remove("hidden")
    return clone
  }

  handleVenueDropdownFocusOut(event) {
    if (this.eventTargetIsInsideVenueDropdown(event.target)) return;
    this.hideVenueFieldsDropdowns();
  }

  eventTargetIsInsideVenueDropdown(target) {
    return this.venueDropdownTargets.some(dropdown => dropdown.contains(target));
  }

  hideVenueFieldsDropdowns() {
    this.venueDropdownTargets.forEach(dropdown => {
      dropdown.classList.toggle("hidden", true);
    });
  }
}
