// IMPORTING DOM VARIABLES
import { DOM_VAR } from "./dom-variables.js";
// IMPORTING FUNCTIONS
import {
  clearInputField,
  addClass,
  removeClassWithDelay,
  isInputEmpty,
  disableElement,
  updateTaskStatus,
  showAllTasks,
  showActiveTasks,
  showCompletedTasks,
} from "./functions.js";
import { idCreator, createEditSection, appendNewTask } from "./create.js";
import { removeElementFromDom, removeTaskFromArray } from "./delete.js";

import { getDataFromLS, reportDataIntoLS } from "./local-storage.js";

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasksArray);
getDataFromLS(DOM_VAR.taskList, tasksArray);
// FORM VALIDATION TO ADD NEW TASKS
DOM_VAR.formToAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  let id = idCreator();
  reportDataIntoLS(DOM_VAR.newTaskInput.value, false, id, tasksArray);
  appendNewTask(DOM_VAR.taskList, id, DOM_VAR.newTaskInput.value);
  clearInputField(DOM_VAR.newTaskInput);

  addClass(DOM_VAR.decorationSpans, "animation");

  removeClassWithDelay(DOM_VAR.decorationSpans, "animation", 1000);

  disableElement(DOM_VAR.addTaskBtn);
});
// CHECKING IF INPUT FILED IS EMPTY IF NOT THEN IT IS POSSIBLE TO ADD TASK
DOM_VAR.newTaskInput.addEventListener("input", (event) => {
  let inputValue = String(event.target.value).trim();
  DOM_VAR.addTaskBtn.disabled = isInputEmpty(inputValue);
});
// COLOBORATE WITH DOM
DOM_VAR.taskList.addEventListener("click", (event) => {
  // IF USER WANTS TO DELETE TASK
  if (event.target.closest(".task-list__btn--delete")) {
    let task = event.target.closest(".task-list__item");
    let taskId = Number(task.dataset.id);
    removeElementFromDom(task, DOM_VAR.taskList);
    removeTaskFromArray(taskId, tasksArray);
  }
  // IF USER WANTS TO EDIT TASK
  if (event.target.closest(".task-list__btn--edit")) {
    let task = event.target.closest(".task-list__item");
    createEditSection(task);
  }
  if (event.target.closest(".task-list__checkbox")) {
    let task = event.target.closest(".task-list__item");
    let taskId = Number(task.dataset.id);
    let taskStatus = event.target.closest(".task-list__checkbox").checked;
    console.log(taskStatus);
    updateTaskStatus(tasksArray, taskId, taskStatus);
  }
});
// navigation
DOM_VAR.taskNavigation.addEventListener("click", (event) => {
  let click = event.target;
  if (click.closest(".btn")) {
    DOM_VAR.navBtns.forEach((btn) => {
      btn.classList.remove("active-nav-btn");
    });
  }
  if (click.closest(".all-btn")) {
    click.classList.add("active");
    showAllTasks(tasksArray);
  } else if (click.closest(".active-btn")) {
    click.classList.add("active-nav-btn");
    showActiveTasks(DOM_VAR.taskList, tasksArray);
  } else if (click.closest(".completed-btn")) {
    click.classList.add("active-nav-btn");
    showCompletedTasks(DOM_VAR.taskList, tasksArray);
  }
});
