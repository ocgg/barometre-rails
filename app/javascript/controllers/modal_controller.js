import { Controller } from "@hotwired/stimulus"
import Modal from "modal/main"

// Connects to data-controller="modal"
export default class extends Controller {
  static values = { config: Object }

  connect() {
    const modal = new Modal(this.configValue);
    modal.fire();
  }
}
