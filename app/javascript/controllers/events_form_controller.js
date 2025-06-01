import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "venueDropdown",
    "datepickerDropdown",
    "trashIcon",
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
    if (this.eventsNumber > 1) {
      this.showTrashIcons();
      this.setDatepickerDropdownsZIndexes();
    }
  }

  onPlusBtnClick(_) {
    this.cloneLastEvent();
    this.eventsNumber++;
    this.setDatepickerDropdownsZIndexes();
    this.showTrashIcons();
  }

  cloneLastEvent() {
    const clone = this.eventFieldsTargets[this.eventsNumber - 1].cloneNode(true);
    this.eventsListTarget.appendChild(clone);
  }

  setDatepickerDropdownsZIndexes() {
    this.datepickerDropdownTargets.forEach((elt, index) => {
      elt.style.zIndex = 20 + (this.eventsNumber - index - 1);
    })
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
