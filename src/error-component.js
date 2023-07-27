import { addElement } from "./view-helpers";

export function drawError() {
  const parent = document.getElementById("content");
  parent.textContent = "";

  addElement('div', parent, ['error'], "Something went wrong.");
}