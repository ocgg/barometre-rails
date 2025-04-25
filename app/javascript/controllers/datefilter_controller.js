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
    this.inputTarget.value = '';
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);

    this.startDate = null;
    this.endDate = null;

    const colors = {
      primary: "fgcolor",
      secondary: "bgcolor",
      faded: "fgcolor-faded",
      highlight: "baro-yellow",
    }
    const dayEltClasses = `flex h-[46px] w-[46px] items-center justify-center rounded-full hover:bg-${colors.highlight} mb-1 cursor-pointer`

    this.cssClasses = {
      currentMonthDay: dayEltClasses,
      otherMonthDay: `${dayEltClasses} text-${colors.faded}`,
      selectedDay: `${dayEltClasses} bg-${colors.primary} text-${colors.secondary} rounded-none`,
      selectedStartDay: `${dayEltClasses} bg-${colors.primary} text-${colors.secondary} rounded-r-none`,
      selectedEndDay: `${dayEltClasses} bg-${colors.primary} text-${colors.secondary} rounded-l-none`,
      onlySelectedDay: `${dayEltClasses} bg-${colors.primary} text-${colors.secondary} rounded-full`
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
      this.daysContainerTarget.innerHTML += this.makeDayElement(day);
      day.setDate(day.getDate() + 1)
    }
  }

  makeDayElement(day) {
    const classes = this.cssClassesFor(day);
    const month = day.getMonth() + 1;
    const dayNumber = day.getDate();
    const year = day.getFullYear();
    const parsableDate = `${month}-${dayNumber}-${year}`;
    return `<div class="${classes}" data-action="click->datefilter#selectDate" data-date="${parsableDate}">${dayNumber}</div>`;
  }

  cssClassesFor(day) {
    if (this.isStartAndEnd(day)) return this.cssClasses.onlySelectedDay;
    else if (this.isStartDate(day)) return this.cssClasses.selectedStartDay; 
    else if (this.isEndDate(day)) return this.cssClasses.selectedEndDay; 
    else if (this.isBetween(day)) return this.cssClasses.selectedDay; 
    else if (this.isCurrentMonth(day)) return this.cssClasses.currentMonthDay; 
    else return this.cssClasses.otherMonthDay; 
  }

  isStartAndEnd(day) { return this.startDateEqualsEndDate() && day.getTime() === this.startDate.getTime(); }
  isStartDate(day) { return this.startDate && day.getTime() === this.startDate.getTime(); }
  isEndDate(day) { return this.endDate && day.getTime() === this.endDate.getTime(); }
  isBetween(day) { return this.startDate && this.endDate && day > this.startDate && day < this.endDate; }
  isCurrentMonth(day) { return day.getMonth() === this.currentDate.getMonth(); }

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
    this.updateInput();
    this.renderCalendar();
  }

  updateInput() {
    if (this.startDateEqualsEndDate()) this.inputTarget.value = this.readableDateFrom(this.startDate); 
    else if (this.startDate && this.endDate) this.inputTarget.value = `${this.readableDateFrom(this.startDate)} -> ${this.readableDateFrom(this.endDate)}`; 
    else if (this.startDate) this.inputTarget.value = `${this.readableDateFrom(this.startDate)} ->`; 
    else this.inputTarget.value = ''; 
  }

  startDateEqualsEndDate() { return this.startDate && this.endDate && this.startDate.getTime() === this.endDate.getTime() }

  readableDateFrom(date) {
    const opts = { weekday: "short", day: "numeric", month: "short" }
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

  toggleHidden() {
    this.datepickerContainerTarget.classList.toggle('hidden');
    this.renderCalendar();
  }
}
