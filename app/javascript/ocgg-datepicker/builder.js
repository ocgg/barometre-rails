import Styles from "datepicker/styles";
import Helper from "datepicker/helpers";

export default class Builder {
  constructor(main) {
    this.main = main;
    this.config = main.config
    this.dates = main.dates;
    this.css = new Styles();
    this.#buildElements();
  }

  renderCalendar() {
    this.daysContainer.innerHTML = '';
    this.monthName.textContent = Helper.monthNameFrom(this.dates.current);
    const firstDay = this.dates.firstMondayBeforeMonth;
    this.#buildMonthDaysFrom(firstDay);
  }

  updateInputValues() {
    if (this.config.range) this.#updatesInputValuesForRange();
    else this.#updatesInputValuesForSingleDate();
  }

  #updatesInputValuesForRange() {
    if (this.dates.startWithoutEnd) {
      this.startInput.value = Helper.parsableStringFrom(this.dates.start);
      this.endInput.value = Helper.parsableStringFrom(this.dates.start);
    }
    else if (this.dates.startAndEnd) {
      this.startInput.value = Helper.parsableStringFrom(this.dates.start);
      this.endInput.value = Helper.parsableStringFrom(this.dates.end);
    }
    else {
      this.startInput.value = null;
      this.endInput.value = null;
    }
  }

  #updatesInputValuesForSingleDate() {
    this.startInput.value = Helper.parsableStringFrom(this.dates.start);
  }

  #buildMonthDaysFrom(day) {
    const rows = 6;
    const cols = 7;

    for (let i = 0; i < (cols * rows); i++) {
      this.daysContainer.appendChild(this.#dayElementFrom(day))
      day.setDate(day.getDate() + 1);
    }
  }

  #dayElementFrom(date) {
    const classList = this.#classListFor(date);
    const parsableDate = Helper.parsableStringFrom(date);
    const isBeforeToday = this.dates.isBeforeToday(date);

    const dayElt = document.createElement("div");
    dayElt.innerText = date.getDate();
    dayElt.classList.add(...classList.split(" "));
    if (!isBeforeToday) {
      dayElt.dataset.date = parsableDate;
      dayElt.addEventListener("click", this.main.selectDate.bind(this.main));
    }
    return dayElt;
  }

  #buildElements() {
    this.#buildMainContainer();
    this.#buildInputs();
    this.#buildMonthSectionElements();
    this.#buildDaysHeadersElements();
    this.#buildDaysContainer();
    if (this.config.time) this.#buildTimeElements();
  }

  #buildMainContainer() {
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("w-fit");
  }

  #buildInputs() {
    if (this.config.autosubmit) {
      this.submitInput = document.createElement("input");
      this.submitInput.classList.add("hidden");
      this.submitInput.type = "submit";
      this.mainContainer.appendChild(this.submitInput);
    }

    this.startInput = document.createElement("input");
    this.startInput.type = "hidden";
    this.startInput.name = this.config.startInput.name;
    this.startInput.id = this.config.startInput.id;
    this.startInput.value = this.config.startInput.value;
    this.startInput.disabled = !this.startInput.value;
    this.mainContainer.appendChild(this.startInput);

    if (this.config.range) {
      this.endInput = document.createElement("input");
      this.endInput.type = "hidden";
      this.endInput.name = this.config.endInput.name;
      this.endInput.id = this.config.endInput.id;
      this.endInput.value = this.config.endInput.value;
      this.endInput.disabled = !this.endInput.value;
      this.mainContainer.appendChild(this.endInput);
    }
  }

  #buildMonthSectionElements() {
    this.monthSectionContainer = document.createElement("div");
    this.prevMonth = document.createElement("span");
    this.monthName = document.createElement("p");
    this.nextMonth = document.createElement("span");

    this.monthSectionContainer.classList.add("flex", "items-center", "justify-between");

    this.prevMonth.innerHTML = '<svg class="fill-current h-6 hover:fill-baro-yellow hover:cursor-pointer" viewBox="0 0 16 16"><path d="M10.825 14.325C10.675 14.325 10.525 14.275 10.425 14.15L4.77501 8.40002C4.55001 8.17502 4.55001 7.82502 4.77501 7.60002L10.425 1.85002C10.65 1.62502 11 1.62502 11.225 1.85002C11.45 2.07502 11.45 2.42502 11.225 2.65002L5.97501 8.00003L11.25 13.35C11.475 13.575 11.475 13.925 11.25 14.15C11.1 14.25 10.975 14.325 10.825 14.325Z"></path></svg>';
    this.nextMonth.innerHTML = '<svg class="fill-current h-6 hover:fill-baro-yellow hover:cursor-pointer" viewBox="0 0 16 16"><path d="M5.17501 14.325C5.02501 14.325 4.90001 14.275 4.77501 14.175C4.55001 13.95 4.55001 13.6 4.77501 13.375L10.025 8.00003L4.77501 2.65002C4.55001 2.42502 4.55001 2.07502 4.77501 1.85002C5.00001 1.62502 5.35001 1.62502 5.57501 1.85002L11.225 7.60002C11.45 7.82502 11.45 8.17502 11.225 8.40002L5.57501 14.15C5.47501 14.25 5.32501 14.325 5.17501 14.325Z"></path></svg>';
    this.monthSectionContainer.appendChild(this.prevMonth);
    this.monthSectionContainer.appendChild(this.monthName);
    this.monthSectionContainer.appendChild(this.nextMonth);

    this.prevMonth.addEventListener("click", this.main.setPrevMonth.bind(this.main))
    this.nextMonth.addEventListener("click", this.main.setNextMonth.bind(this.main))

    this.mainContainer.appendChild(this.monthSectionContainer);
  }

  #buildDaysHeadersElements() {
    this.daysHeadersContainer = document.createElement("div");
    this.daysHeadersContainer.classList.add("grid", "grid-cols-7", "py-2", "font-normal");

    const headers = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
    headers.forEach(header => {
      const elt = document.createElement("span");
      elt.innerText = header;
      elt.classList.add("flex", "h-[38px]", "w-[38px]", "items-center", "justify-center", "text-sm");
      this.daysHeadersContainer.appendChild(elt);
    });

    this.mainContainer.appendChild(this.daysHeadersContainer);
  }

  #buildDaysContainer() {
    this.daysContainer = document.createElement("div");
    this.daysContainer.classList.add("grid", "grid-cols-7", "text-sm");

    this.mainContainer.appendChild(this.daysContainer);
  }

  #buildTimeElements() {
    this.timeContainer = document.createElement("div");
    this.timeContainer.classList.add("flex", "justify-center", "items-center", "gap-2");

    this.separator = document.createElement("hr");
    this.separator.classList.add("border-fgcolor-faded", "mb-3");

    this.timeIcon = document.createElement("span");
    this.timeIcon.innerHTML = '<svg class="h-5 fill-fgcolor" viewBox="0 0 512 512"> <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>'
    this.timeInput = document.createElement("input");
    this.timeInput.type = "time";
    this.timeInput.name = this.config.timeInput.name;
    this.timeInput.id = this.config.timeInput.id;
    this.timeInput.value = this.config.timeInput.value;

    this.mainContainer.appendChild(this.separator);
    this.timeContainer.appendChild(this.timeIcon);
    this.timeContainer.appendChild(this.timeInput);
    this.mainContainer.appendChild(this.timeContainer);
  }

  #classListFor(date) {
    if (this.config.range) return this.#rangeClassListFor(date);
    else return this.#singleClassListFor(date);
  }

  #rangeClassListFor(date) {
    if (this.dates.isBeforeToday(date)) return this.css.nonSelectableDay;
    else if (this.dates.isStartAndEnd(date)) return this.css.onlySelectedDay;
    else if (this.dates.isStart(date)) return this.css.selectedStartDay;
    else if (this.dates.isEnd(date)) return this.css.selectedEndDay;
    else if (this.dates.isBetween(date)) return this.css.selectedDay;
    else if (this.dates.isInCurrentMonth(date)) return this.css.currentMonthDay;
    else return this.css.otherMonthDay;
  }

  #singleClassListFor(date) {
    if (this.dates.isBeforeToday(date)) return this.css.nonSelectableDay;
    else if (this.dates.isStart(date)) return this.css.onlySelectedDay;
    else if (this.dates.isInCurrentMonth(date)) return this.css.currentMonthDay;
    else return this.css.otherMonthDay;
  }
}
