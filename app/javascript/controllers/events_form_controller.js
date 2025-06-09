import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  static targets = [
    "eventFields",
    "eventsList",
    "venueDropdown",
    "venueFields",
    "datepickerBtn",
    "trashIcon",
  ]

  connect() {
    this.eventsNumber = this.eventFieldsTargets.length;
    if (this.eventsNumber > 1) {
      this.showTrashIcons();
      this.setDatepickerDropdownsZIndexes();
      this.setVenueFieldsZIndexes();
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
    this.setVenueFieldsZIndexes();
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

  setVenueFieldsZIndexes() {
    this.venueFieldsTargets.forEach((elt, index) => {
      elt.style.zIndex = 15 + (this.eventsNumber - index - 1);
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
    this.eventFieldsTargets.forEach(elt => {
      const controller = this.application.getControllerForElementAndIdentifier(elt, 'event-fields')
      controller.setDatepickerVisible(false);
      controller.updateDatepickerShadowSize();
    })
  }
}
