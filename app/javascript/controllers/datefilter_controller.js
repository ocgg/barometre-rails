import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "shadowElt",
    "mainContainer",
    "startDateInput",
    "endDateInput",
    "button",
    "datepickerContainer",
    "daysContainer",
    "currentMonth", "prevMonth", "nextMonth",
    "toggleBtn"
  ]

  connect() {
    const dayElementCssClasses = `hover:bg-baro-yellow flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1 cursor-pointer`;
    this.cssClasses = {
      bgColor: `bg-card-bg`,
      currentMonthDay: dayElementCssClasses,
      otherMonthDay: `${dayElementCssClasses} text-fgcolor-faded`,
      selectedDay: `${dayElementCssClasses} bg-baro-yellow rounded-none`,
      selectedStartDay: `${dayElementCssClasses} bg-baro-yellow rounded-r-none`,
      selectedEndDay: `${dayElementCssClasses} bg-baro-yellow rounded-l-none`,
      onlySelectedDay: `${dayElementCssClasses} bg-baro-yellow rounded-full`
    }

    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);

    this.startDate = this.dateFromInputValue(this.startDateInputTarget);
    this.endDate = this.dateFromInputValue(this.endDateInputTarget);

    this.updateInputValueAndButtonText();
    this.updateShadowElementSize();
  }
  
  dateFromInputValue(input) {
    return !input.value ? null : new Date(input.value)
  }

  get isVisible() {
    return !this.datepickerContainerTarget.classList.contains("hidden");
  }

  set isVisible(bool) {
    this.datepickerContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle(this.cssClasses.bgColor, bool);
    if (!bool) this.close();
  }

  close() {
    this.updateShadowElementSize();
  }

  updateShadowElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.shadowEltTarget.style.width = `${Math.floor(size.width)}px`
    this.shadowEltTarget.style.height = `${Math.floor(size.height)}px`
  }

  renderCalendar() {
    this.daysContainerTarget.innerHTML = '';
    this.displayMonthName();
    this.renderDays();
  }

  displayMonthName() {
    const opts = { month: 'long', year: 'numeric' };
    let monthAndYear = this.currentDate.toLocaleDateString('fr-FR', opts);
    this.currentMonthTarget.textContent = this.capitalize(monthAndYear);
  }

  capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  renderDays() {
    const firstMonthDate = new Date(this.currentDate)
    firstMonthDate.setDate(0)
    const firstWeekDayOfMonth = firstMonthDate.getDay()
    const day = new Date(this.currentDate)
    day.setDate(1 - firstWeekDayOfMonth)

    for (let i = 1; i <= (7 * 6); i++) {
      this.daysContainerTarget.innerHTML += this.makeDayElementFrom(day);
      day.setDate(day.getDate() + 1)
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
    if (this.isStartAndEnd(date)) return this.cssClasses.onlySelectedDay;
    else if (this.isStartDate(date)) return this.cssClasses.selectedStartDay;
    else if (this.isEndDate(date)) return this.cssClasses.selectedEndDay;
    else if (this.isBetween(date)) return this.cssClasses.selectedDay;
    else if (this.isCurrentMonth(date)) return this.cssClasses.currentMonthDay;
    else return this.cssClasses.otherMonthDay;
  }

  isStartAndEnd(date) { return this.startDateEqualsEndDate() && date.getTime() === this.startDate.getTime(); }
  isStartDate(date) { return this.startDate && date.getTime() === this.startDate.getTime(); }
  isEndDate(date) { return this.endDate && date.getTime() === this.endDate.getTime(); }
  isBetween(date) { return this.startDate && this.endDate && date > this.startDate && date < this.endDate; }
  isCurrentMonth(date) { return date.getMonth() === this.currentDate.getMonth(); }

  selectDate(event) {
    event.stopPropagation();

    const selectedDate = new Date(event.currentTarget.dataset.date);

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = selectedDate;
      this.endDate = null;
    } else {
      if (selectedDate < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = selectedDate;
      } else {
        this.endDate = selectedDate;
      }
    }
    this.updateInputValueAndButtonText();
    this.renderCalendar();
  }

  updateInputValueAndButtonText() {
    let startDateInputValue;
    let endDateInputValue;
    let buttonText;

    if (this.startDateEqualsEndDate()) {
      startDateInputValue = this.parsableDateFrom(this.startDate);
      endDateInputValue = "";
      buttonText = this.readableDateFrom(this.startDate);
    }
    else if (this.startDate && this.endDate) {
      const readableStart = this.readableDateFrom(this.startDate);
      const readbleEnd = this.readableDateFrom(this.endDate);
      startDateInputValue = this.parsableDateFrom(this.startDate);
      endDateInputValue = this.parsableDateFrom(this.endDate);
      buttonText = `${readableStart} ➞ ${readbleEnd}`;
    }
    else if (this.startDate) {
      startDateInputValue = this.parsableDateFrom(this.startDate);
      endDateInputValue = "";
      buttonText = `${this.readableDateFrom(this.startDate)} ➞`;
    }
    else {
      startDateInputValue = '';
      endDateInputValue = '';
      buttonText = '';
    }
    this.startDateInputTarget.value = startDateInputValue;
    this.endDateInputTarget.value = endDateInputValue;
    this.buttonTarget.textContent = buttonText;
  }

  startDateEqualsEndDate() {
    return (
      this.startDate && this.endDate
      && this.startDate.getTime() === this.endDate.getTime()
    );
  }

  readableDateFrom(date) {
    const opts = { day: "numeric", month: "long" }
    return date.toLocaleDateString("fr-FR", opts)
  }

  setPrevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  setNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
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
}
