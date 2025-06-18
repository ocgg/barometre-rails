import { Controller } from "@hotwired/stimulus";
import Datepicker from "datepicker/datepicker";

// Connects to data-controller="event-fields"
export default class extends Controller {
  static targets = [
    "datepickerShadow",
    "datepickerBtn",
    "iconsContainer",
    "svg",
    "date",
    "datepickerContainer",
    "datetime",
    "hour",
    "minute"
  ]

  static values = {
    start: String,
    uniqueEvent: Boolean
  }

  connect() {
    const opts = {
      startInput: {
        id: "events__date",
        name: this.uniqueEventValue ? "event[date]" : "events[][date]",
        value: this.startValue,
      },
    };
    this.datepicker = new Datepicker(this.datepickerContainerTarget, opts);

    this.datepicker.elts.startInput.dataset.action = "change->event-fields#onDateSelection";

    this.updateDatepickerShadowSize();
  }

  get datepickerIsVisible() { return !this.datepickerContainerTarget.classList.contains("hidden") }

  setDatepickerVisible(bool) {
    this.datepickerBtnTarget.classList.toggle("!bg-card-bg", bool);
    this.datepickerBtnTarget.classList.toggle("!text-fgcolor", bool);
    this.iconsContainerTarget.classList.toggle("md:flex-col", !bool);
    this.svgTarget.classList.toggle("fill-fgcolor", bool);
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    if (!bool) this.updateDatepickerShadowSize();
  }

  onDatepickerClick(_) { this.setDatepickerVisible(!this.datepickerIsVisible) }

  updateDatepickerShadowSize() {
    if (window.innerWidth <= 768) return;
    const size = this.datepickerBtnTarget.getBoundingClientRect();

    this.datepickerShadowTarget.style.width = this.startValue ? `${Math.floor(size.width)}px` : "auto";
    this.datepickerShadowTarget.style.height = `${Math.floor(size.height)}px`;
  }

  onDateSelection(event) {
    if (!event.target.value) return;

    this.startValue = event.target.value;
    const date = new Date(event.target.value);
    this.dateTarget.textContent = this.readableStringFrom(date);
    this.onDateOrTimeInputChange();
  }

  readableStringFrom(date) {
    const opts = { day: "numeric", month: "numeric", year: "2-digit" };
    return date.toLocaleDateString("fr-FR", opts);
  }

  handleDatepickerFocusOut(event) {
    if (!this.datepickerIsVisible) return;
    if (this.datepickerBtnTarget.contains(event.target)) return;

    this.setDatepickerVisible(false);
  }

  onHoursChange(event) {
    const value = event.target.value;
    if (value.length === 2) this.minuteTarget.select();
  }

  onDateOrTimeInputChange() {
    this.datetimeTarget.value = `${this.startValue} ${this.hourTarget.value}:${this.minuteTarget.value}`;
  }

  onTrashClick(_) {
    this.dispatch("onTrashClick", { detail: { toRemove: this.element } });
  }
}
