import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="new-event-form"
export default class extends Controller {
  static targets = ["eventFields", "eventsList", "addEventBtn"]

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
}
