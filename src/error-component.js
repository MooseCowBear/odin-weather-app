import { addElement } from "./view-helpers";

export function drawError() {
  const parent = document.getElementById("content");
  parent.textContent = "";

  const wrapper = addElement('div', parent, ['error']);
  addElement('div', wrapper, [], "Your search could not be completed.");
  addElement('p', wrapper, [], "Try again.");
}