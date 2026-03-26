import { DOM_VAR } from "./dom-variables.js";
let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

export function findIndexOfSelectedTask(idBox) {
  let index = tasksArray.findIndex((element) => {
    return Number(element.id) === idBox;
  });
  return index;
}
export function addNewtask(taskText) {
  let date = new Date();
  let idForInputField = date.getTime();
  let text = taskText;

  CterateNewTask(idForInputField, text);

  let task = {
    status: false,
    text: taskText,
    id: idForInputField,
  };
  tasksArray.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
export function renderTasks(array) {
  array.forEach((element) => {
    let TaskText = element.text;
    let TaskId = element.id;
    let Taskstatus = element.status;
    CterateNewTask(TaskId, TaskText, Taskstatus);
  });
}
export function CterateNewTask(idForInputField, taskText, status = false) {
  const taskMain = document.createElement("div");
  taskMain.classList.add("task-list__main");
  // const taskEdit = document.createElement("div");

  const taskListInfo = document.createElement("div");
  const taskListControls = document.createElement("div");
  let newListItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let deleteBtn = document.createElement("button");
  let EditBtn = document.createElement("button");

  checkBox.classList.add("task-list__checkbox");
  checkBox.type = "checkbox";
  checkBox.checked = status;
  checkBox.setAttribute("id", idForInputField);

  label.classList.add("task-list__text");
  label.textContent = taskText;
  label.setAttribute("for", idForInputField);

  taskListInfo.classList.add("task-list__info");
  taskListInfo.appendChild(checkBox);
  taskListInfo.appendChild(label);

  EditBtn.setAttribute("type", "button");
  let editImg = document.createElement("img");
  editImg.classList.add("edit-img");
  editImg.src = "./assets/images/edit.svg";
  editImg.alt = "Edit image";
  EditBtn.appendChild(editImg);
  EditBtn.classList.add("task-list__btn--edit");
  EditBtn.classList.add("task-list__btn");
  EditBtn.classList.add("btn");

  deleteBtn.setAttribute("type", "button");
  let deleteImg = document.createElement("img");
  deleteImg.classList.add("delete-img");
  deleteImg.src = "./assets/images/delete.svg";
  deleteImg.alt = "Delete image";
  deleteBtn.appendChild(deleteImg);

  deleteBtn.classList.add("task-list__btn--delete");
  deleteBtn.classList.add("task-list__btn");
  deleteBtn.classList.add("btn");

  let menuDots = document.createElement("img");
  menuDots.src = "./assets/images/menu-dots.svg";
  menuDots.alt = "menu dots";
  menuDots.classList.add("menu-dots");

  taskListControls.classList.add("task-list__controls");
  taskListControls.appendChild(EditBtn);
  taskListControls.appendChild(deleteBtn);
  taskListControls.appendChild(menuDots);

  newListItem.classList.add("task-list__item");
  newListItem.setAttribute("data-id", idForInputField);
  newListItem.classList.add("active");

  taskMain.appendChild(taskListInfo);
  taskMain.appendChild(taskListControls);

  newListItem.appendChild(taskMain);

  DOM_VAR.listOfTasks.appendChild(newListItem);
}

export function menuDotsFunc(event) {
  let controlsBtns = event.target
    .closest(".task-list__controls")
    .getElementsByTagName("button");
  // if user click on dots menu it is opening, and if it is alredy
  // opened and user clicks one more time it hides edit and delete buttons
  Array.from(controlsBtns).forEach((element) => {
    element.classList.toggle("show");
  });
}
export function updateTaskText(id, taskText) {
  tasksArray[findIndexOfSelectedTask(id)].text = taskText;
}
export function updateTaskStatus(id, taskStatus) {
  tasksArray[findIndexOfSelectedTask(id)].status = taskStatus;
}

export function saveArrayOfTasksIntoLS() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
export function changeStatusOfTask(element, status) {
  // tasksArray[findIndexOfSelectedTask(element)].status = status;
  updateTaskStatus(element, status);
  saveArrayOfTasksIntoLS();
}
export function deleteTask(element) {
  tasksArray.splice(findIndexOfSelectedTask(element), 1);
  saveArrayOfTasksIntoLS();
}
