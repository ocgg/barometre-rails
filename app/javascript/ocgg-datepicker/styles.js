export default class Styles {
  constructor() {
    this.base = "flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1";
    this.active = `${this.base} hover:bg-yellow cursor-pointer`;

    this.calendarContainer = "bg-white"
    this.currentMonthDay = this.active
    this.otherMonthDay = `${this.active} text-blue-faded`
    this.selectedDay = `${this.active} bg-blue text-bg-light rounded-none`
    this.selectedStartDay = `${this.active} bg-blue text-bg-light rounded-r-none`
    this.selectedEndDay = `${this.active} bg-blue text-bg-light rounded-l-none`
    this.onlySelectedDay = `${this.active} bg-blue text-bg-light rounded-full`
    this.nonSelectableDay = `${this.base} opacity-15 rounded-none`
  }
}
