export default class Styles {
  constructor() {
    this.base = "flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1";
    this.active = `${this.base} hover:bg-baro-yellow cursor-pointer`;

    this.calendarContainer = "bg-card-bg"
    this.currentMonthDay = this.active
    this.otherMonthDay = `${this.active} text-fgcolor-faded`
    this.selectedDay = `${this.active} bg-fgcolor text-bgcolor rounded-none`
    this.selectedStartDay = `${this.active} bg-fgcolor text-bgcolor rounded-r-none`
    this.selectedEndDay = `${this.active} bg-fgcolor text-bgcolor rounded-l-none`
    this.onlySelectedDay = `${this.active} bg-fgcolor text-bgcolor rounded-full`
    this.nonSelectableDay = `${this.base} opacity-15 rounded-none`
  }
}
