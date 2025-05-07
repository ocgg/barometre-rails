import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search"
export default class extends Controller {
  static targets = ["input", "submit"]

  connect() {
    this.inputTarget.value = "";
  }

  submit(event) {
    event.preventDefault();
    this.submitTarget.click();
  }

  clearInput(event) {
    this.inputTarget.value = "";
    this.submit(event);
  }
}
