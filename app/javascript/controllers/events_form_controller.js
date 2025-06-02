import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "venueDropdown",
    "datepickerBtn",
    "trashIcon",
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
    if (this.eventsNumber > 1) {
      this.showTrashIcons();
      this.setDatepickerDropdownsZIndexes();
    }
    this.mediaQuery = window.matchMedia('(min-width: 768px)');
    this.mediaCallback = this.handleWindowResize.bind(this);
    this.mediaQuery.addEventListener('change', this.mediaCallback);
  }

  disconnect() {
    this.mediaQuery.removeEventListener("change", this.mediaCallback);
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
    this.datepickerBtnTargets.forEach((elt, index) => {
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

  onEventFieldsTrash({ detail: { toRemove: eventFields } }) {
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

  handleWindowResize(event) {
    const toMdSize = event.matches;
    this.datepickerBtnTargets.forEach(elt => {
      const size = elt.getBoundingClientRect();
      elt.parentNode.style.width = toMdSize ? `${Math.floor(size.width)}px` : "100%";
      elt.parentNode.style.height = `${Math.floor(size.height)}px`;
    })
  }
}
