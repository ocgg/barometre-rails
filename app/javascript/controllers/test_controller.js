import { Controller } from "@hotwired/stimulus"
import Datepicker from "datepicker/datepicker"

// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    new Datepicker(this.element);
  }
}
