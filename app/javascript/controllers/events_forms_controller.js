import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="event-form"
export default class extends Controller {
  onTrashClick(_) {
    this.element.remove()
  }
}
