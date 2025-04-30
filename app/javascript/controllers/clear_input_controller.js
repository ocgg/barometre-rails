import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="clear-input"
export default class extends Controller {
  static targets = ["input"]

  clear() {
    this.inputTarget.value = "";
  }
}
