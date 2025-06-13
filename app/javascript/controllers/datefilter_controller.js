import { Controller } from "@hotwired/stimulus"
import Datepicker from "datepicker/datepicker"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "button",
    "datepickerContainer",
    "clearInputBtn",
  ]

  connect() {
    const opts = { autosubmit: true, range: true }
    this.datepicker = new Datepicker(this.datepickerContainerTarget, opts);

    this.datepicker.elts.startInput.dataset.action = "change->datefilter#onStartDateSelection"
    this.datepicker.elts.endInput.dataset.action = "change->datefilter#onEndDateSelection"

    this.containerClass = "bg-card-bg";
    this.mainContainerTarget.classList.toggle(this.containerClass, this.datepicker.active);
    this.updateElementSize();
  }

  get visible() { return !this.datepickerContainerTarget.classList.contains("hidden") }

  setVisible(bool) {
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle("max-md:translate-x-[-25%]", bool);
    this.mainContainerTarget.classList.toggle(this.containerClass, bool || this.datepicker.active);
    if (!bool) this.updateElementSize();
  }

  updateElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.element.style.width = `${Math.floor(size.width)}px`;
    this.element.style.height = `${Math.floor(size.height)}px`;
  }

  onButtonClick(_) { this.setVisible(!this.visible) }

  onStartDateSelection(event) {
    if (!event.target.value) return;

    const date = new Date(event.target.value);
    this.startDateString = this.readableStringFrom(date);
    this.buttonTarget.textContent = `${this.startDateString} ➞ ...`;
    this.clearInputBtnTarget.classList.toggle("hidden", false)
  }

  onEndDateSelection(event) {
    if (!event.target.value) return;

    const date = new Date(event.target.value);
    this.endDateString = this.readableStringFrom(date);
    this.buttonTarget.textContent = `${this.startDateString} ➞ ${this.endDateString}`;
  }

  readableStringFrom(date) {
    const opts = { day: "numeric", month: "long" };
    return date.toLocaleDateString("fr-FR", opts);
  }

  clearInput(event) {
    event.stopPropagation();
    this.datepicker.reset();
    this.resetButton()
    this.setVisible(false);
    this.datepicker.submit();
  }

  resetButton() {
    this.buttonTarget.textContent = "Filtrer par dates";
    this.clearInputBtnTarget.classList.toggle("hidden", true)
  }

  handleFocusOut(event) {
    if (!this.visible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.setVisible(false);
  }
}
