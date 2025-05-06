import { Controller } from "@hotwired/stimulus"
import DatesManager from "datepicker/dates_manager"
import Renderer from "datepicker/renderer"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "startDateInput",
    "endDateInput",
    "button",
    "calendarContainer",
    "daysContainer",
    "monthName", "prevMonth", "nextMonth",
    "clearInputBtn",
    "dayTemplate"
  ]

  connect() {
    this.dates = new DatesManager(
      this.startDateInputTarget.value,
      this.endDateInputTarget.value
    );
    this.render = new Renderer(this.dates);

    this.updateValuesAndText()

    this.renderCalendar();
    this.updateElementSize();
  }

  get active() { return !this.startDateInputTarget.disabled }

  get visible() { return !this.calendarContainerTarget.classList.contains("hidden") }

  get startDate() { return this.startDateInputTarget.value }

  get endDate() { return this.endDateInputTarget.value }

  renderCalendar() {
    this.daysContainerTarget.innerHTML = '';
    this.monthNameTarget.textContent = this.render.monthName;
    this.daysContainerTarget.innerHTML = this.render.dayElements();
  }

  activate() {
    this.startDateInputTarget.disabled = false;
    this.endDateInputTarget.disabled = false;
  }

  desactivate() {
    this.startDateInputTarget.disabled = true;
    this.endDateInputTarget.disabled = true;
  }

  updateElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.element.style.width = `${Math.floor(size.width)}px`
    this.element.style.height = `${Math.floor(size.height)}px`
  }

  setVisible(bool) {
    this.calendarContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle("max-md:translate-x-[-25%]", bool);
    this.mainContainerTarget.classList.toggle(this.render.css.calendarContainer, bool);
    if (!bool) this.updateElementSize();
  }

  resetButtonText() {
    this.buttonTarget.textContent = "Filtrer par date";
    this.clearInputBtnTarget.classList.toggle("hidden", true);
  }

  updateDates(start, end) {
    this.dates.start = start;
    this.dates.end = end;
    this.updateValuesAndText();
    this.renderCalendar();
  }

  updateValuesAndText() {
    if (this.dates.startEqualsEnd) {
      this.startDateInputTarget.value = this.render.parsableStart;
      this.endDateInputTarget.value = this.render.parsableEnd;
      this.buttonTarget.textContent = this.render.readableStart;
      this.clearInputBtnTarget.classList.toggle("hidden", false);
    }
    else if (this.dates.startWithoutEnd) {
      this.startDateInputTarget.value = this.render.parsableStart;
      this.endDateInputTarget.value = this.render.parsableStart;
      this.buttonTarget.textContent = this.render.readableStart;
      this.clearInputBtnTarget.classList.toggle("hidden", false);
    }
    else if (this.dates.startAndEnd) {
      this.startDateInputTarget.value = this.render.parsableStart;
      this.endDateInputTarget.value = this.render.parsableEnd;
      this.buttonTarget.textContent = `${this.render.readableStart} ➞ ${this.render.readableEnd}`;
      this.clearInputBtnTarget.classList.toggle("hidden", false);
    }
    else {
      this.startDateInputTarget.value = null;
      this.endDateInputTarget.value = null;
      this.resetButtonText();
    }
  }

  onButtonClick(_) { this.setVisible(!this.visible) }

  selectDate(event) {
    event.stopPropagation();
    if (!this.active) this.activate();
    const selectedDate = new Date(event.currentTarget.dataset.date);

    if (!this.dates.start || this.dates.startAndEnd) {
      this.updateDates(selectedDate, null);
    }
    else if (selectedDate < this.dates.start) {
      this.updateDates(selectedDate, this.dates.start);
    }
    else {
      this.updateDates(this.dates.start, selectedDate);
    }
  }

  setPrevMonth(_) {
    this.dates.toPrevMonth();
    this.renderCalendar();
  }

  setNextMonth(_) {
    this.dates.toNextMonth();
    this.renderCalendar();
  }

  selectMonth(_) {
    if (!this.active) this.activate();
    const start = this.dates.firstDateOfMonth;
    const end = this.dates.lastDateOfMonth;
    this.updateDates(start, end);
  }

  clearInput(event) {
    event.stopPropagation();
    this.updateDates(null, null);
    this.desactivate();
    if (!this.visible) this.updateElementSize();
  }

  handleFocusOut(event) {
    if (!this.visible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.setVisible(false);
  }
}
