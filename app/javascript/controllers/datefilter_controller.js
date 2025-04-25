import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "inputContainer",
    "input",
    "datepickerContainer",
    "daysContainer",
    "currentMonth", "prevMonth", "nextMonth",
    "toggleDatepicker"
  ]

  connect() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();

    this.startDate = null;
    this.endDate = null;

    const dayEltClasses = "flex h-[46px] w-[46px] items-center justify-center rounded-full hover:bg-baro-yellow mb-2 cursor-pointer"

    this.cssClasses = {
      currentMonthDay: dayEltClasses,
      prevMonthDay: dayEltClasses + " text-fgcolor-faded",
      selectedDay: dayEltClasses + " bg-fgcolor-faded text-bgcolor rounded-none",
      selectedStartDay: dayEltClasses + " bg-fgcolor text-bgcolor rounded-r-none",
      selectedEndDay: dayEltClasses + " bg-fgcolor text-bgcolor rounded-l-none",
    }

    // Close datepicker when clicking outside
    //document.addEventListener('click', function (event) {
    //  if (!this.inputTarget.contains(event.target) && !this.this.inputContainer.contains(event.target)) {
    //    this.inputContainer.classList.add('hidden');
    //  }
    //});
  }

  renderCalendar() {
    this.daysContainerTarget.innerHTML = '';
    this.displayMonthName();
    this.renderPrevMonthDays();
    this.renderCurrentMonthDays();
  }

  displayMonthName() {
    const opts = { month: 'long', year: 'numeric' };
    let monthAndYear = this.today.toLocaleDateString('fr-FR', opts);
    this.currentMonthTarget.textContent = this.capitalize(monthAndYear);
  }

  capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  renderPrevMonthDays() {
    const firstWeekDayOfMonth = new Date(this.year, this.month, 0).getDay();

    for (let i = firstWeekDayOfMonth; i > 0; i--) {
      const firstCurrentMonthDay = new Date(this.year, this.month, 1);
      const dayBefore = new Date(firstCurrentMonthDay);
      dayBefore.setDate(firstCurrentMonthDay.getDate() - i);
      const parsableDate = `${this.month}-${dayBefore.getDate()}-${this.year}`;
      const dayNumber = dayBefore.getDate();
      const day = new Date(this.year, this.month - 1, dayNumber);


      this.daysContainerTarget.innerHTML += this.makeDayElement(day, parsableDate, dayNumber);
    }
  }

  renderCurrentMonthDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(this.year, this.month, i);
      const parsableDate = `${this.month + 1}-${i}-${this.year}`

      this.daysContainerTarget.innerHTML += this.makeDayElement(day, parsableDate, i);
    }
  }

  makeDayElement(day, parsableDate, dayNumber) {
    const classes = this.cssClassesFor(day)
    return `<div class="${classes}" data-action="click->datefilter#selectDate" data-date="${parsableDate}">${dayNumber}</div>`
  }

  cssClassesFor(day) {
    if (this.isStartDate(day)) { return this.cssClasses.selectedStartDay; }
    else if (this.isEndDate(day)) { return this.cssClasses.selectedEndDay; }
    else if (this.isBetweenStartAndEnd(day)) { return this.cssClasses.selectedDay; }
    else if (this.isPreviousMonth(day)) { return this.cssClasses.prevMonthDay; }
    else { return this.cssClasses.currentMonthDay; }
  }

  isStartDate(day) { return this.startDate && day.getTime() === this.startDate.getTime(); }
  isEndDate(day) { return this.endDate && day.getTime() === this.endDate.getTime(); }
  isBetweenStartAndEnd(day) { return this.startDate && this.endDate && day > this.startDate && day < this.endDate; }
  isPreviousMonth(day) { return day.getMonth() < this.month; }

  selectDate(event) {
    event.stopPropagation();

    const selectedDate = new Date(event.currentTarget.dataset.date);

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = selectedDate;
      this.endDate = null;
    } else {
      if (new Date(selectedDate) < new Date(this.startDate)) {
        this.endDate = this.startDate;
        this.startDate = selectedDate;
      } else {
        this.endDate = selectedDate;
      }
    }
    this.updateInput();
    this.renderCalendar();
  }

  updateInput() {
    if (this.startDateEqualsEndDate()) { this.inputTarget.value = this.readableDateFrom(this.startDate); }
    else if (this.startDate && this.endDate) { this.inputTarget.value = `${this.readableDateFrom(this.startDate)} -> ${this.readableDateFrom(this.endDate)}`; }
    else if (this.startDate) { this.inputTarget.value = `${this.readableDateFrom(this.startDate)} ->`; }
    else { this.inputTarget.value = ''; }
  }

  startDateEqualsEndDate() { return this.startDate && this.endDate && this.startDate.getTime() === this.endDate.getTime() }

  readableDateFrom(date) {
    const opts = { weekday: "short", day: "numeric", month: "long" }
    return date.toLocaleDateString("fr-FR", opts)
  }

  setPrevMonth() {
    this.today.setMonth(this.today.getMonth() - 1);
    this.renderCalendar();
  }

  setNextMonth() {
    this.today.setMonth(this.today.getMonth() + 1);
    this.renderCalendar();
  }

  toggleHidden() {
    this.datepickerContainerTarget.classList.toggle('hidden');
    this.renderCalendar();
  }
}
