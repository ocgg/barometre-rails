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
    this.startDate = null;
    this.endDate = null;

    // Close datepicker when clicking outside
    //document.addEventListener('click', function (event) {
    //  if (!this.inputTarget.contains(event.target) && !this.this.inputContainer.contains(event.target)) {
    //    this.inputContainer.classList.add('hidden');
    //  }
    //});
  }

  renderCalendar() {
    const year = this.today.getFullYear();
    const month = this.today.getMonth();
    const baseClasses = "flex h-[46px] w-[46px] items-center justify-center rounded-full hover:bg-baro-yellow mb-2 cursor-pointer";

    this.daysContainerTarget.innerHTML = '';

    this.displayMonthName();
    this.renderPrevMonthDays(year, month, baseClasses);
    this.renderCurrentMonthDays(year, month, baseClasses);
  }

  displayMonthName() {
    let monthAndYear = this.today.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    this.currentMonthTarget.textContent = this.capitalize(monthAndYear);
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderPrevMonthDays(year, month, baseClasses) {
    const firstWeekDayOfMonth = new Date(year, month, 0).getDay();

    for (let i = firstWeekDayOfMonth; i > 0; i--) {
      baseClasses += " text-fgcolor-faded"

      const firstCurrentMonthDay = new Date(year, month, 1);
      const dayBefore = new Date(firstCurrentMonthDay);
      dayBefore.setDate(firstCurrentMonthDay.getDate() - i);
      const parsableDate = `${month}-${dayBefore.getDate()}-${year}`;

      this.daysContainerTarget.innerHTML += this.dayDivString(baseClasses, parsableDate, dayBefore.getDate());
    }
  }

  renderCurrentMonthDays(year, month, baseClasses) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const parsableDate = `${month + 1}-${i}-${year}`

      // Highlight start and end dates
      if (this.startDate && day.getTime() === this.startDate.getTime()) {
        baseClasses += " bg-fgcolor text-bgcolor rounded-r-none";
      }
      if (this.endDate && day.getTime() === this.endDate.getTime()) {
        baseClasses += " bg-fgcolor text-bgcolor rounded-l-none";
      }
      // Highlight dates between start and end
      if (this.startDate && this.endDate && day > this.startDate && day < this.endDate) {
        baseClasses += " bg-fgcolor-faded text-bgcolor rounded-none";
      }
      this.daysContainerTarget.innerHTML += this.dayDivString(baseClasses, parsableDate, i);
    }
  }

  dayDivString(classes, parsableDate, dayNumber) {
    return `<div class="${classes}" data-action="click->datefilter#selectDate" data-date="${parsableDate}">${dayNumber}</div>`
  }

  readableDateFrom(date) {
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long"
    })
  }

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
    if (this.startDate && this.endDate && this.startDate.getTime() === this.endDate.getTime()) {
      this.inputTarget.value = this.readableDateFrom(this.startDate);
    }
    else if (this.startDate && this.endDate) {
      this.inputTarget.value = `${this.readableDateFrom(this.startDate)} -> ${this.readableDateFrom(this.endDate)}`;
    }
    else if (this.startDate) {
      this.inputTarget.value = `${this.readableDateFrom(this.startDate)} ->`;
    }
    else {
      this.inputTarget.value = '';
    }
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
