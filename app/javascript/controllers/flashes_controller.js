import { Controller } from "@hotwired/stimulus"
import Modal from "modal/main"

// Connects to data-controller="flashes"
export default class extends Controller {
  static values = { config: Object }

  connect() {
    const modal = new Modal(this.element);
    modal.fire()
  }
}
