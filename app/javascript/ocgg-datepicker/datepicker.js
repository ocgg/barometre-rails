import Builder from "datepicker/builder";
import DatesManager from "datepicker/dates_manager";

export default class Datepicker {
  constructor(element, config = {}) {
    this.#setConfig(config);

    this.dates = new DatesManager();
    this.elts = new Builder(this, this.dates, this.config);

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
    if (this.config.range) this.#rangeDateSelect(selectedDate);
    else this.#singleDateSelect(selectedDate);
  }

  #setConfig(config) {
    const defaultConfig = {
      autosubmit: true,
      range: false,
      startInputId: "start",
      endInputId: "end"
    }
    this.config = {...defaultConfig, ...config};
  }

  #activate() {
    this.elts.startInput.disabled = false;
    this.elts.endInput.disabled = false;
  }

  #desactivate() {
    this.elts.startInput.disabled = true;
    this.elts.endInput.disabled = true;
  }

  #rangeDateSelect(selectedDate) {
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

  #singleDateSelect(selectedDate) {
    this.#updateDates(selectedDate, null);
    if (!this.active) this.#activate();
    this.#submit();
  }

  #updateDates(start, end) {
    this.dates.start = start;
    this.dates.end = end;
    this.elts.updateInputValues();
    this.elts.renderCalendar();
  }

  #submit() {
    if (!this.config.autosubmit) return;

    this.elts.submitInput.click();
  }
}
