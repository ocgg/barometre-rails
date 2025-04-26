import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="datefilter"
export default class extends Controller {
  static targets = [
    "shadowElt",
    "mainContainer",
    "input",
    "button",
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

    this.isVisible = false;

    const colors = {
      bgcolor: "card-bg",
      primary: "fgcolor",
      secondary: "bgcolor",
      faded: "fgcolor-faded",
      highlight: "baro-yellow",
    };
    const dayEltClasses = `hover:bg-${colors.highlight} flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1 cursor-pointer`;

    this.cssClasses = {
      bgcolor: `bg-${colors.bgcolor}`,
      currentMonthDay: dayEltClasses,
      otherMonthDay: `${dayEltClasses} text-${colors.faded}`,
      selectedDay: `${dayEltClasses} bg-${colors.highlight} rounded-none`,
      selectedStartDay: `${dayEltClasses} bg-${colors.highlight} rounded-r-none`,
      selectedEndDay: `${dayEltClasses} bg-${colors.highlight} rounded-l-none`,
      onlySelectedDay: `${dayEltClasses} bg-${colors.highlight} rounded-full`
    }

    this.updateShadowSize();

    // Close datepicker when clicking outside
    //document.addEventListener('click', function (event) {
    //  if (!this.inputTarget.contains(event.target) && !this.this.inputContainer.contains(event.target)) {
    //    this.inputContainer.classList.add('hidden');
    //  }
    //});
  }

  updateShadowSize() {
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
    let inputValue;
    let buttonText;

    if (this.startDateEqualsEndDate()) {
      inputValue = this.parsableDateFrom(this.startDate);
      buttonText = this.readableDateFrom(this.startDate);
    }
    else if (this.startDate && this.endDate) {
      const parsableStart = this.parsableDateFrom(this.startDate);
      const parsableEnd = this.parsableDateFrom(this.endDate);
      const readableStart = this.readableDateFrom(this.startDate);
      const readbleEnd = this.readableDateFrom(this.endDate);
      inputValue = `${parsableStart}; ${parsableEnd}`;
      buttonText = `${readableStart} ➞ ${readbleEnd}`;
    }
    else if (this.startDate) {
      inputValue = `${this.parsableDateFrom(this.startDate)}`;
      buttonText = `${this.readableDateFrom(this.startDate)} ➞`;
    }
    else {
      inputValue = '';
      buttonText = '';
    }
    this.inputTarget.value = inputValue;
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

  toggleHidden() {
    this.isVisible = !this.isVisible;
    this.mainContainerTarget.classList.toggle(this.cssClasses.bgcolor);
    this.datepickerContainerTarget.classList.toggle('hidden');

    if (!this.isVisible) this.updateShadowSize();

    this.renderCalendar();
  }
}
