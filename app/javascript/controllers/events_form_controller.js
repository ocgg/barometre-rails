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

  // Prevent form to be submitted on Enter key press
  onPressEnter(e) {
    e.preventDefault();
  }

  onPlusBtnClick(_) {
    this.cloneLastEvent();
    this.eventsNumber++;
    this.showTrashIcons();
  }

  cloneLastEvent() {
    const clone = this.eventFieldsTargets[this.eventsNumber - 1].cloneNode(true);
    this.eventsListTarget.appendChild(clone);
  }

  handleVenueDropdownFocusOut(event) {
    this.venueDropdownTargets.forEach(dropdown => {
      if (dropdown.parentNode.contains(event.target)) return;

      dropdown.classList.toggle("hidden", true);
    });
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

  handleWindowResize(_) {
    this.eventFieldsTargets.forEach(elt => {
      const controller = this.application.getControllerForElementAndIdentifier(elt, 'event-fields');
      controller.setDatepickerVisible(false);
      controller.updateDatepickerShadowSize();
    })
  }
}
