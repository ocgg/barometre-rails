export default class CssManager {
  constructor() {
    this.calendarContainer = "bg-card-bg"
    this.currentMonthDay =  "hover:bg-baro-yellow flex h-[46px] w-[46px] items-center justify-center rounded-full mb-1 cursor-pointer"
    this.otherMonthDay = `${this.currentMonthDay} text-fgcolor-faded`
    this.selectedDay = `${this.currentMonthDay} bg-baro-yellow rounded-none`
    this.selectedStartDay = `${this.currentMonthDay} bg-baro-yellow rounded-r-none`
    this.selectedEndDay = `${this.currentMonthDay} bg-baro-yellow rounded-l-none`
    this.onlySelectedDay = `${this.currentMonthDay} bg-baro-yellow rounded-full`
  }
}
