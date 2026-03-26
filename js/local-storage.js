import { appendNewTask } from "./create.js";
import { DOM_VAR } from "./dom-variables.js";
import {
  clearInputField,
  addClass,
  removeClassWithDelay,
  isInputEmpty,
  disableElement,
} from "./functions.js";
export function updateLSArray(arrayName, array) {
  localStorage.setItem(arrayName, JSON.stringify(array));
}
export function getDataFromLS(whereToInsert, array) {
  whereToInsert.innerHTML = "";
  array.forEach((task) => {
    appendNewTask(whereToInsert, task.taskId, task.taskBody, task.taskStatus);
  });
}
export function reportDataIntoLS(textContent, status, id, array) {
  array.push({ taskId: id, taskStatus: status, taskBody: textContent });
  updateLSArray("tasks", array);
}
