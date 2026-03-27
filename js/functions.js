import { DOM_VAR } from "./dom-variables.js";
import { appendNewTask } from "./create.js";
import { updateLSArray, getDataFromLS } from "./local-storage.js";

export function clearInputField(inputField) {
  inputField.value = "";
}
export function addClass(elements, className) {
  elements.forEach((element) => {
    element.classList.add(className);
  });
}
export function removeClassWithDelay(elements, className, delayTime) {
  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.remove(className);
    });
  }, delayTime);
}
export function isInputEmpty(inputField) {
  return inputField.length === 0;
}
export function disableElement(element) {
  element.disabled = true;
}
export function updateTaskStatus(array, id, status) {
  const index = array.findIndex((element) => element.taskId === id);
  array[index].taskStatus = status;
  updateLSArray("tasks", array);
}
export function showAllTasks(array) {
  getDataFromLS(DOM_VAR.taskList, array);
}
export function showActiveTasks(whereToInsert, array) {
  whereToInsert.innerHTML = "";
  array.forEach((task) => {
    if (task.taskStatus === false)
      appendNewTask(whereToInsert, task.taskId, task.taskBody, task.taskStatus);
  });
}
export function showCompletedTasks(whereToInsert, array) {
  whereToInsert.innerHTML = "";
  array.forEach((task) => {
    if (task.taskStatus === true)
      appendNewTask(whereToInsert, task.taskId, task.taskBody, task.taskStatus);
  });
}
export function menuDotsFunc(event) {
  let controlsBtns = event.target
    .closest(".task-list__controls")
    .getElementsByTagName("button");
  Array.from(controlsBtns).forEach((element) => {
    element.classList.toggle("show");
  });
}
