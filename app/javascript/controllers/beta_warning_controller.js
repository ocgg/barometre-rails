import { Controller } from "@hotwired/stimulus"
import Modal from "modal/main"

// Connects to data-controller="beta-warning"
export default class extends Controller {
  connect() {
    const modal = new Modal(this.element);
    modal.afterClose = () => sessionStorage.setItem("betaWarned", true);

    const hasBeenWarned = sessionStorage.getItem("betaWarned") === "true"
    if (!hasBeenWarned) modal.fire()
  }
}
