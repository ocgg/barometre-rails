import Builder from "datepicker/builder";
import DatesManager from "datepicker/dates_manager";
import Renderer from "datepicker/renderer";

export default class Datepicker {
  constructor(element, opts = {}) {
    this.config = opts;
    this.dates = new DatesManager();
    this.elts = new Builder(this, this.dates, this.config);
    // this.render = new Renderer(this.dates);

    this.elts.renderCalendar(this.dates);
    element.appendChild(this.elts.mainContainer)
  }

  get active() { return !this.elts.startInput.disabled }

  setPrevMonth(_) {
    this.dates.toPrevMonth();
    this.elts.renderCalendar();
  }

  setNextMonth(_) {
    this.dates.toNextMonth();
    this.elts.renderCalendar();
  }

  selectDate(event) {
    event.stopPropagation();

    const selectedDate = new Date(event.currentTarget.dataset.date);
    if (this.config.range) this.#selectDateForRange(selectedDate);
    else this.#selectSingleDate(selectedDate);
  }

  #activate() {
    this.elts.startInput.disabled = false;
    this.elts.endInput.disabled = false;
  }

  #desactivate() {
    this.elts.startInput.disabled = true;
    this.elts.endInput.disabled = true;
  }

  #selectDateForRange(selectedDate) {
    if (!this.dates.start || this.dates.startAndEnd) {
      this.#updateDates(selectedDate, null);
      if (this.active) this.#desactivate();
    }
    else if (selectedDate < this.dates.start) {
      this.#updateDates(selectedDate, this.dates.start);
      if (!this.active) this.#activate();
      this.#submit();
    }
    else {
      this.#updateDates(this.dates.start, selectedDate);
      if (!this.active) this.#activate();
      this.#submit();
    }
  }

  #updateDates(start, end) {
    this.dates.start = start;
    this.dates.end = end;
    this.elts.updateInputValues();
    this.elts.renderCalendar();
  }

  #selectSingleDate(selectedDate) {
    this.#updateDates(selectedDate, selectedDate);
    if (!this.active) this.#activate();
    this.#submit();
  }

  #submit() {
    this.elts.submitInput.click();
  }
}
