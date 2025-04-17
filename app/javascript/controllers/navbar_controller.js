import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["main", "dropdown", "icon"];

  connect() {
    this.currentPageFromMenuLinks = this.iconTarget.classList.contains("fill-baro-yellow");
  }

  toggle() {
    if (!this.currentPageFromMenuLinks) {
      this.iconTarget.classList.toggle("fill-baro-yellow");
    }
    this.dropdownTarget.classList.toggle("hidden");
    this.dropdownTarget.classList.toggle("flex");
  }

  hide() {
    if (!this.currentPageFromMenuLinks) {
      this.iconTarget.classList.toggle("fill-baro-yellow");
    }
    this.dropdownTarget.classList.add("hidden");
    this.dropdownTarget.classList.remove("flex");
  }
  
  handleFocusOut(event) {
    if (this.dropdownIsHidden()) return;
    if (!this.clickedOutsideMenu(event)) return;

    this.hide();
  }

  dropdownIsHidden() {
    return this.dropdownTarget.classList.contains("hidden");
  }

  clickedOutsideMenu(event) {
    return !this.mainTarget.contains(event.target);
  }
}
