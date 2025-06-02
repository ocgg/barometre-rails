import { Controller } from "@hotwired/stimulus";
import Datepicker from "datepicker/datepicker";

// Connects to data-controller="new-event-form"
export default class extends Controller {
  static targets = [
    "datetimeShadow",
    "datetimeBtn",
    "iconsContainer",
    "hourCtn",
    "svg",
    "date",
    "hour",
    "datepickerContainer"
  ]

  static values = {
    start: String,
    time: String,
  }

  connect() {
    const opts = {
      time: true,
      startInput: {
        id: "events__date",
        name: "events[][date]",
        value: this.startValue,
      },
      timeInput: {
        id: "events__time",
        name: "events[][time]",
        value: this.timeValue,
      },
    };
    this.datepicker = new Datepicker(this.datepickerContainerTarget, opts);

    this.datepicker.elts.startInput.dataset.action = "change->event-fields#onDateSelection";
    this.datepicker.elts.timeInput.dataset.action = "change->event-fields#onTimeInput";

    this.updateDatepickerShadowSize();
  }

  get datepickerIsVisible() { return !this.datepickerContainerTarget.classList.contains("hidden") }

  setDatepickerVisible(bool) {
    this.datetimeBtnTarget.classList.toggle("!bg-card-bg", bool);
    this.datetimeBtnTarget.classList.toggle("!text-fgcolor", bool);
    this.iconsContainerTarget.classList.toggle("md:flex-col", !bool);
    this.svgTargets.forEach(svg => svg.classList.toggle("fill-fgcolor", bool));
    this.hourCtnTarget.classList.toggle("md:flex-row", !bool);
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    if (!bool) this.updateDatepickerShadowSize();
  }

  onDatetimeClick(_) { this.setDatepickerVisible(!this.datepickerIsVisible) }

  updateDatepickerShadowSize() {
    const isMdSize = window.innerWidth >= 768;
    const size = this.datetimeBtnTarget.getBoundingClientRect();
    this.datetimeShadowTarget.style.width = isMdSize ? `${Math.floor(size.width)}px` : "100%";
    this.datetimeShadowTarget.style.height = `${Math.floor(size.height)}px`;
  }

  onDateSelection(event) {
    if (!event.target.value) return;

    this.startValue = event.target.value;
    const date = new Date(event.target.value);
    this.dateTarget.textContent = this.readableStringFrom(date);
  }

  onTimeInput(event) {
    if (!event.target.value) return;

    this.timeValue = event.target.value
    this.hourTarget.textContent = event.target.value.replace(":", "h");
  }

  readableStringFrom(date) {
    const opts = { day: "numeric", month: "numeric", year: "2-digit" };
    return date.toLocaleDateString("fr-FR", opts);
  }

  handleDatepickerFocusOut(event) {
    if (!this.datepickerIsVisible) return;
    if (this.datetimeBtnTarget.contains(event.target)) return;

    this.setDatepickerVisible(false);
  }

  onTrashClick(_) {
    this.dispatch("onTrashClick", {detail: {toRemove: this.element}});
  }
}
