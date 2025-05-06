export default class Renderer {
  constructor(dates) {
    this.dates = dates;

    const baseDayClassList = "hover:bg-baro-yellow flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1 cursor-pointer";
    this.css = {
      calendarContainer: "bg-card-bg",
      currentMonthDay: baseDayClassList,
      otherMonthDay: `${baseDayClassList} text-fgcolor-faded`,
      selectedDay: `${baseDayClassList} bg-baro-yellow rounded-none`,
      selectedStartDay: `${baseDayClassList} bg-baro-yellow rounded-r-none`,
      selectedEndDay: `${baseDayClassList} bg-baro-yellow rounded-l-none`,
      onlySelectedDay: `${baseDayClassList} bg-baro-yellow rounded-full`,
    };
  }

  get monthName() {
    const opts = { month: 'long', year: 'numeric' };
    const monthAndYear = this.dates.current.toLocaleDateString('fr-FR', opts);
    return this.capitalize(monthAndYear);
  }

  get parsableStart() { return this.parsableStringFrom(this.dates.start) }

  get parsableEnd() { return this.parsableStringFrom(this.dates.end) }

  get readableStart() { return this.readableStringFrom(this.dates.start) }

  get readableEnd() { return this.readableStringFrom(this.dates.end) }

  capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  parsableStringFrom(date) {
    const month = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    return `${month}-${dayNumber}-${year}`;
  }

  readableStringFrom(date) {
    const opts = { day: "numeric", month: "long" };
    return date.toLocaleDateString("fr-FR", opts);
  }

  dateFromString(string) { return string ? new Date(string) : null }

  dayElements() {
    let result = "";
    const day = this.dates.firstMondayBeforeMonth;
    const rows = 6;
    const cols = 7;

    for (let i = 0; i < (cols * rows); i++) {
      result += this.dayElementFrom(day);
      day.setDate(day.getDate() + 1);
    }
    return result;
  }

  dayElementFrom(date) {
    const classList = this.classListFor(date);
    const parsableDate = this.parsableStringFrom(date);
    return `<div class="${classList}" data-action="click->datefilter#selectDate" data-date="${parsableDate}">${date.getDate()}</div>`;
  }

  classListFor(date) {
    if (this.dates.isStartAndEnd(date)) return this.css.onlySelectedDay;
    else if (this.dates.isStart(date)) return this.css.selectedStartDay;
    else if (this.dates.isEnd(date)) return this.css.selectedEndDay;
    else if (this.dates.isBetween(date)) return this.css.selectedDay;
    else if (this.dates.isInCurrentMonth(date)) return this.css.currentMonthDay;
    else return this.css.otherMonthDay;
  }
}
