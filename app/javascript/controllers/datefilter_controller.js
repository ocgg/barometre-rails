import { Controller } from "@hotwired/stimulus"
import Datepicker from "datepicker/datepicker"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "button",
    "datepickerContainer",
    "clearInputBtn",
    "mapPrevDayBtn"
  ]

  static values = {
    range: Boolean,
    initialStart: String,
  }

  connect() {
    this.opts = {
      autosubmit: true,
      range: this.rangeValue,
      startInput: {value: this.initialStartValue}
    }
    this.datepicker = new Datepicker(this.datepickerContainerTarget, this.opts);

    this.datepicker.elts.startInput.dataset.action = "change->datefilter#onStartDateSelection"
    if (this.opts.range) this.datepicker.elts.endInput.dataset.action = "change->datefilter#onEndDateSelection"

    if (this.hasMapPrevDayBtnTarget) {
      this.today = new Date();
      this.today.setHours(0, 0, 0, 0);
      this.mapPrevDayBtnTarget.classList.remove("fill-light", "hover:fill-yellow");
      this.mapPrevDayBtnTarget.classList.add("fill-light-faded");
    }

    this.containerClass = "bg-white";
    this.mainContainerTarget.classList.toggle(this.containerClass, this.datepicker.active);
    if (this.initialStartValue) this.onStartDateSelection({target: {value: this.initialStartValue}})
  }

  get visible() { return !this.datepickerContainerTarget.classList.contains("hidden") }

  setVisible(bool) {
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle(this.containerClass, bool || this.datepicker.active);
  }

  onButtonClick(_) { this.setVisible(!this.visible) }

  onStartDateSelection(event) {
    if (!event.target.value) return;

    const date = this.datepicker.dates.start;
    this.startDateString = this.readableStringFrom(date);
    this.buttonTarget.textContent = this.startDateString;
    if (this.opts.range) this.buttonTarget.textContent += " ➞ ...";
    else this.setVisible(false)
    this.clearInputBtnTarget.classList.toggle("hidden", false);
  }

  onEndDateSelection(event) {
    if (!event.target.value) return;

    const date = this.datepicker.dates.end;
    this.endDateString = this.readableStringFrom(date);
    this.buttonTarget.textContent = `${this.startDateString} ➞ ${this.endDateString}`;
    this.setVisible(false);
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

  // only in #map
  onNextDayClick(event) {
    event.stopPropagation(); // don't show calendar
    const current = this.datepicker.dates.start;
    const nextDay = new Date(current);
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay >= this.today) {
      this.mapPrevDayBtnTarget.classList.remove("fill-light-faded");
      this.mapPrevDayBtnTarget.classList.add("fill-light", "hover:fill-yellow");
    }
    this.datepicker.setDates(nextDay);
    this.onStartDateSelection({target: {value: this.initialStartValue}});
    this.datepicker.submit();
  }

  // only in #map
  onPreviousDayClick(event) {
    event.stopPropagation(); // don't show calendar
    const current = this.datepicker.dates.start;
    const prevDay = new Date(current);
    prevDay.setDate(prevDay.getDate() - 1);
    if (prevDay < this.today) return;

    this.datepicker.setDates(prevDay);
    this.onStartDateSelection({target: {value: this.initialStartValue}});
    this.datepicker.submit();
    if (prevDay.getTime() === this.today.getTime()) {
      this.mapPrevDayBtnTarget.classList.remove("fill-light", "hover:fill-yellow");
      this.mapPrevDayBtnTarget.classList.add("fill-light-faded");
    }
  }
}
