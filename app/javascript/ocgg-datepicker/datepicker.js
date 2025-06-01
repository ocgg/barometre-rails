import Builder from "datepicker/builder";
import DatesManager from "datepicker/dates_manager";

export default class Datepicker {
  constructor(element, config = {}) {
    this.#setConfig(config);

    this.dates = new DatesManager(this.config.startInput.value, this.config.endInput.value);
    this.elts = new Builder(this);

    this.elts.renderCalendar(this.dates);
    element.innerHTML = "";
    element.appendChild(this.elts.mainContainer);
  }

  get active() { return !this.elts.startInput.disabled }

  reset() {
    this.setDates(null, null);
    this.#desactivate();
  }

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

  submit() {
    if (!this.config.autosubmit) return;

    this.elts.submitInput.click();
  }

  setDates(start, end) {
    const startChanged = !(this.dates.start === start)
    const endChanged = !(this.dates.end === end)

    this.dates.start = start;
    this.dates.end = end;
    this.elts.updateInputValues();

    if (startChanged) this.elts.startInput.dispatchEvent(new Event('change'));
    if (endChanged) this.elts.endInput.dispatchEvent(new Event('change'));

    this.elts.renderCalendar();
  }

  #setConfig(config) {
    const defaultConfig = {
      autosubmit: false,
      range: false,
      time: false,
      startInput: { id: "start", name: "start", value: null },
      endInput: { id: "end", name: "end", value: null },
      timeInput: { id: "time", name: "time", value: null }
    }
    this.config = { ...defaultConfig, ...config };
  }

  #activate() {
    this.elts.startInput.disabled = false;
    if (this.config.range) this.elts.endInput.disabled = false;
  }

  #desactivate() {
    this.elts.startInput.disabled = true;
    if (this.config.range) this.elts.endInput.disabled = true;
  }

  #rangeDateSelect(selectedDate) {
    if (!this.dates.start || this.dates.startAndEnd) {
      this.setDates(selectedDate, null);
      if (this.active) this.#desactivate();
    }
    else if (selectedDate < this.dates.start) {
      this.setDates(selectedDate, this.dates.start);
      if (!this.active) this.#activate();
      this.submit();
    }
    else {
      this.setDates(this.dates.start, selectedDate);
      if (!this.active) this.#activate();
      this.submit();
    }
  }

  #singleDateSelect(selectedDate) {
    this.setDates(selectedDate, null);
    if (!this.active) this.#activate();
    this.submit();
  }
}
