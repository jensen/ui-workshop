import { FormComponent, AddButtonComponent } from "./components.js";
import {
  handleAddButtonClick,
  handleFormReset,
  handleFormSubmission,
} from "./events.js";

FormComponent().addEventListener("reset", handleFormReset);
FormComponent().addEventListener("submit", handleFormSubmission);
FormComponent().addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddButtonClick(event);
  }
});
AddButtonComponent().addEventListener("click", handleAddButtonClick);
