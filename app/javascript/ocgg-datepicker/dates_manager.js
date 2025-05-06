export default class DatesManager {
  constructor(start_str, end_str) {
    this.start = start_str ? new Date(start_str) : null;
    this.end = end_str ? new Date(end_str) : null;

    this.current = this.start ? new Date(this.start) : new Date();
    this.current.setHours(0, 0, 0, 0);

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  get firstDateOfMonth() {
    const date = new Date(this.current);
    date.setDate(1);
    return date;
  }

  get lastDateOfMonth() {
    const date = new Date(this.current);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date;
  }

  get firstMondayBeforeMonth() {
    let firstWeekDayNumber = this.firstDateOfMonth.getDay();
    if (firstWeekDayNumber === 0) firstWeekDayNumber += 7;

    const firstMonday = new Date(this.current);
    firstMonday.setDate(1 - (firstWeekDayNumber - 1));
    return firstMonday;
  }

  get startAndEnd() { return !!(this.start && this.end) }

  get startWithoutEnd() { return !!(this.start && !this.end) }

  get startEqualsEnd() {
    return this.startAndEnd && this.start.getTime() === this.end.getTime();
  }

  isStartAndEnd(date) {
    return this.startEqualsEnd && date.getTime() === this.start.getTime();
  }

  isStart(date) { return this.start && date.getTime() === this.start.getTime() }

  isEnd(date) { return this.end && date.getTime() === this.end.getTime() }

  isBetween(date) { return this.startAndEnd && date > this.start && date < this.end }

  isInCurrentMonth(date) { return date.getMonth() === this.current.getMonth() }

  isBeforeToday(date) { return date < this.today }

  toPrevMonth() { this.current.setMonth(this.current.getMonth() - 1) }

  toNextMonth() { this.current.setMonth(this.current.getMonth() + 1) }
}
