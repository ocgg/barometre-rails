import { Controller } from "@hotwired/stimulus"
import DatesManager from "datepicker/dates_manager"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "startDateInput",
    "endDateInput",
    "button",
    "datepickerContainer",
    "daysContainer",
    "currentMonth", "prevMonth", "nextMonth",
    "clearInputBtn"
  ]

  connect() {
    this.dates = new DatesManager;

    const dayElementCssClasses = `hover:bg-baro-yellow flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1 cursor-pointer`;
    this.cssClasses = {
      calendarContainer: "bg-card-bg",
      currentMonthDay: dayElementCssClasses,
      otherMonthDay: `${dayElementCssClasses} text-fgcolor-faded`,
      selectedDay: `${dayElementCssClasses} bg-baro-yellow rounded-none`,
      selectedStartDay: `${dayElementCssClasses} bg-baro-yellow rounded-r-none`,
      selectedEndDay: `${dayElementCssClasses} bg-baro-yellow rounded-l-none`,
      onlySelectedDay: `${dayElementCssClasses} bg-baro-yellow rounded-full`
    }
    this.baseButtonText = "Filtrer par date";
    this.buttonTarget.innerText = this.baseButtonText;

    this.dates.start = this.dateFromString(this.startDateInputTarget.value);
    this.dates.end =this.dateFromString(this.endDateInputTarget.value);

    this.updateInputValueAndButtonText();
  }

  dateFromString(string) {
    return string ? new Date(string) : null
  }

  get isVisible() {
    return !this.datepickerContainerTarget.classList.contains("hidden");
  }

  set isVisible(bool) {
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle("max-md:translate-x-[-25%]", bool);
    this.mainContainerTarget.classList.toggle(this.cssClasses.calendarContainer, bool);
    if (!bool) this.updateElementSize();
  }

  updateElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.element.style.width = `${Math.floor(size.width)}px`
    this.element.style.height = `${Math.floor(size.height)}px`
  }

  renderCalendar() {
    this.daysContainerTarget.innerHTML = '';
    this.displayMonthName();
    this.renderDays();
  }

  displayMonthName() {
    this.currentMonthTarget.textContent = this.capitalize(this.dates.monthAndYear);
  }

  capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  renderDays() {
    const day = this.dates.firstMondayBeforeMonth;
    const rows = 6;
    for (let i = 0; i < (7 * rows); i++) {
      this.daysContainerTarget.innerHTML += this.makeDayElementFrom(day);
      day.setDate(day.getDate() + 1);
    }
  }

  makeDayElementFrom(date) {
    const classes = this.cssClassesFor(date);
    const parsableDate = this.parsableDateFrom(date);
    return `<div class="${classes}" data-action="click->datefilter#selectDate" data-date="${parsableDate}">${date.getDate()}</div>`;
  }

  parsableDateFrom(date) {
    const month = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    return `${month}-${dayNumber}-${year}`;
  }

  cssClassesFor(date) {
    if (this.dates.isStartAndEnd(date)) return this.cssClasses.onlySelectedDay;
    else if (this.dates.isStart(date)) return this.cssClasses.selectedStartDay;
    else if (this.dates.isEnd(date)) return this.cssClasses.selectedEndDay;
    else if (this.dates.isBetween(date)) return this.cssClasses.selectedDay;
    else if (this.dates.isInCurrentMonth(date)) return this.cssClasses.currentMonthDay;
    else return this.cssClasses.otherMonthDay;
  }

  selectDate(event) {
    event.stopPropagation();

    const selectedDate = new Date(event.currentTarget.dataset.date);

    if (!this.dates.start || this.dates.startAndEnd) {
      this.updateCalendarWithDates(selectedDate, null)
    } else {
      if (selectedDate < this.dates.start) {
        this.updateCalendarWithDates(selectedDate, this.dates.start)
      } else {
        this.updateCalendarWithDates(this.dates.start, selectedDate)
      }
    }
  }

  updateCalendarWithDates(start, end) {
    this.dates.start = start;
    this.dates.end = end;

    this.updateInputValueAndButtonText();
    this.renderCalendar();
  }

  updateInputValueAndButtonText() {
    let startDateInputValue;
    let endDateInputValue;
    let buttonText;

    if (this.dates.startEqualsEnd) {
      startDateInputValue = this.dates.parsableStart
      endDateInputValue = null;
      buttonText = this.dates.readableStart;
    }
    else if (this.dates.start && this.dates.end) {
      startDateInputValue = this.dates.parsableStart;
      endDateInputValue = this.dates.parsableEnd;
      buttonText = `${this.dates.readableStart} ➞ ${this.dates.readableEnd}`;
    }
    else if (this.dates.start) {
      startDateInputValue = this.dates.parsableStart;
      endDateInputValue = null;
      buttonText = `${this.dates.readableStart}`;
    }
    else {
      startDateInputValue = null;
      endDateInputValue = null;
      buttonText = null;
    }
    this.startDateInputTarget.value = startDateInputValue;
    this.endDateInputTarget.value = endDateInputValue;
    if (buttonText) {
      this.buttonTarget.textContent = buttonText;
      this.clearInputBtnTarget.classList.toggle("hidden", false)
    }
    else {
      this.buttonTarget.textContent = this.baseButtonText;
      this.clearInputBtnTarget.classList.toggle("hidden", true)
    }
    if (!this.isVisible) this.updateElementSize();
  }

  setPrevMonth() {
    this.dates.toPrevMonth();
    this.renderCalendar();
  }

  setNextMonth() {
    this.dates.toNextMonth();
    this.renderCalendar();
  }

  toggle() {
    this.isVisible = !this.isVisible;
    this.renderCalendar();
  }

  handleFocusOut(event) {
    if (!this.isVisible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.isVisible = false;
  }

  selectMonth() {
    const start = this.dates.firstDateOfMonth;
    const end = this.dates.lastDateOfMonth;
    this.updateCalendarWithDates(start, end);
  }

  clearInput(event) {
    event.stopPropagation();
    this.updateCalendarWithDates(null, null);
  }
}
