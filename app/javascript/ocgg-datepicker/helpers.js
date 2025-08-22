export default class Helper {
  static capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  static monthNameFrom = (date) => {
    const opts = { month: 'long', year: 'numeric' };
    const monthAndYear = date.toLocaleDateString('fr-FR', opts);
    return this.capitalize(monthAndYear);
  }

  static parsableStringFrom = (date) => {
    const month = this.#pad(date.getMonth() + 1);
    const day = this.#pad(date.getDate());
    const year = this.#pad(date.getFullYear());
    return `${day}-${month}-${year}`;
  }

  static #pad = (number) => (number < 10) ? `0${number}` : number;
}
