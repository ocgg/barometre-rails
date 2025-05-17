import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "venueDropdown",
    "trashIcon",
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
  }

  onPlusBtnClick(_) {
    this.cloneLastEvent();
    this.eventsNumber++;
    this.showTrashIcons();
  }

  cloneLastEvent() {
    const clone = this.eventFieldsTargets[this.eventsNumber - 1].cloneNode(true);
    clone.querySelector(".errors")?.remove();
    this.eventsListTarget.appendChild(clone);
  }

  handleVenueDropdownFocusOut(event) {
    if (this.eventTargetIsInsideVenueDropdown(event.target)) return;
    this.hideVenueFieldsDropdowns();
  }

  eventTargetIsInsideVenueDropdown(target) {
    return this.venueDropdownTargets.some(dropdown => dropdown.contains(target));
  }

  hideVenueFieldsDropdowns() {
    this.venueDropdownTargets.forEach(dropdown => dropdown.classList.toggle("hidden", true));
  }

  onEventFieldsTrash({detail: {toRemove: eventFields}}) {
    eventFields.remove();
    this.eventsNumber--;
    if (this.eventsNumber === 1) this.hideTrashIcon();
  }

  hideTrashIcon() {
    this.trashIconTarget.classList.add("hidden");
  }

  showTrashIcons() {
    this.trashIconTargets.forEach(icon => icon.classList.toggle("hidden", false))
  }
}
