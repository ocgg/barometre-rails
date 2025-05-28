export default class Helper {
  static prout() {
    console.log("prout")
  }
  
  static capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  static parsableStringFrom(date) {
    const month = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    return `${month}-${dayNumber}-${year}`;
  }

  static monthNameFrom(date) {
    const opts = { month: 'long', year: 'numeric' };
    const monthAndYear = date.toLocaleDateString('fr-FR', opts);
    return this.capitalize(monthAndYear);
  }

  static parsableStringFrom(date) {
    const month = date.getMonth() + 1;
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    return `${month}-${dayNumber}-${year}`;
  }
}
