import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="navbar-dropdown"
export default class extends Controller {
  static targets = ["menu", "icon"]

  connect() {
    this.currentActionFromMenu = this.iconTarget.classList.contains("fill-baro-yellow")
  }

  toggle() {
    if (!this.currentActionFromMenu) {
      this.iconTarget.classList.toggle("fill-baro-yellow");
    }
    this.menuTarget.classList.toggle("hidden");
    this.menuTarget.classList.toggle("flex");
  }

  hide(event) {
    if (event.relatedTarget) return;

    if (!this.currentActionFromMenu) {
      this.iconTarget.classList.toggle("fill-baro-yellow");
    }
    this.menuTarget.classList.add("hidden");
    this.menuTarget.classList.remove("flex");
  }
}
