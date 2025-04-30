export default class DatesManager {
  constructor() {
    this.current = new Date();
    this.current.setHours(0, 0, 0, 0);

    this.start = null;
    this.end = null;
  }

  get monthAndYear() {
    const opts = { month: 'long', year: 'numeric' };
    return this.current.toLocaleDateString('fr-FR', opts);
  }

  get firstDateOfMonth() {
    const date = new Date(this.current)
    date.setDate(1)
    return date
  }

  get lastDateOfMonth() {
    const date = new Date(this.current);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date
  }

  get firstMondayBeforeMonth() {
    let firstWeekDayNumber = this.firstDateOfMonth.getDay();
    if (firstWeekDayNumber === 0) firstWeekDayNumber += 7;

    const firstMonday = new Date(this.current);
    firstMonday.setDate(1 - (firstWeekDayNumber - 1));
    return firstMonday
  }

  get startAndEnd() { return !!(this.start && this.end) }

  get parsableStart() { return this.parsableStringFrom(this.start) }

  get parsableEnd() { return this.parsableStringFrom(this.end) }

  get readableStart() { return this.readableStringFrom(this.start) }

  get readableEnd() { return this.readableStringFrom(this.end) }

  get startEqualsEnd() {
    return (this.startAndEnd && this.start.getTime() === this.end.getTime());
  }

  parsableStringFrom(date) {
    const month = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    return `${month}-${dayNumber}-${year}`;
  }

  readableStringFrom(date) {
    const opts = { day: "numeric", month: "long" }
    return date.toLocaleDateString("fr-FR", opts)
  }

  isStartAndEnd(date) {
    return this.startEqualsEnd && date.getTime() === this.start.getTime();
  }

  isStart(date) {
    return this.start && date.getTime() === this.start.getTime();
  }

  isEnd(date) {
    return this.end && date.getTime() === this.end.getTime();
  }

  isBetween(date) {
    return this.startAndEnd && date > this.start && date < this.end;
  }

  isInCurrentMonth(date) {
    return date.getMonth() === this.current.getMonth();
  }

  toPrevMonth() {
    this.current.setMonth(this.current.getMonth() - 1);
  }

  toNextMonth() {
    this.current.setMonth(this.current.getMonth() + 1);
  }
}
