const formToAddTask = document.querySelector(".todo-form");
const newTaskInput = document.querySelector("#new-task");
const addTaskBtn = document.querySelector(".todo-form__submit-btn");
const decorationSpans = document.querySelectorAll(".span");
const taskList = document.querySelector(".task-list");

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasksArray);
getDataFromLS(taskList, tasksArray);
formToAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  let id = idCreator();
  reportDataIntoLS(newTaskInput.value, false, id, tasksArray);
  appendNewTask(taskList, id, newTaskInput.value);
  clearInputField(newTaskInput);

  addClass(decorationSpans, "animation");

  removeClassWithDelay(decorationSpans, "animation", 1000);

  disableElement(addTaskBtn);
});

newTaskInput.addEventListener("input", (event) => {
  let inputValue = String(event.target.value).trim();
  addTaskBtn.disabled = isInputEmpty(inputValue);
});

// FUNCTIONS
function clearInputField(inputField) {
  inputField.value = "";
}

function addClass(elements, className) {
  elements.forEach((element) => {
    element.classList.add(className);
  });
}
function removeClassWithDelay(elements, className, delayTime) {
  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.remove(className);
    });
  }, delayTime);
}

function isInputEmpty(inputField) {
  return inputField.length === 0;
}

function disableElement(element) {
  element.disabled = true;
}

function reportDataIntoLS(textContent, status, id, array) {
  array.push({ taskId: id, taskStatus: status, taskBody: textContent });
  localStorage.setItem("tasks", JSON.stringify(array));
}

// crete id function
function idCreator() {
  let date = new Date();
  let id = date.getTime();
  return id;
}

function appendNewTask(whereToInsert, id, taskText, status = false) {
  const li = document.createElement("li");
  li.classList.add("task-list__item", "active");
  li.dataset.id = id;

  const taskMain = document.createElement("div");
  taskMain.classList.add("task-list__main");

  const taskListInfo = document.createElement("div");
  taskListInfo.classList.add("task-list__info");

  const taskListControls = document.createElement("div");
  taskListControls.classList.add("task-list__controls");

  const checkbox = createCheckbox(id, status);
  const label = createLabel(taskText, id);

  const editBtn = createButton([
    "task-list__btn",
    "task-list__btn--edit",
    "btn",
  ]);

  const deleteBtn = createButton([
    "task-list__btn",
    "task-list__btn--delete",
    "btn",
  ]);

  const editImg = createImgElement(
    "./assets/images/edit.svg",
    "Edit image",
    "edit-img",
  );

  const deleteImg = createImgElement(
    "./assets/images/delete.svg",
    "Delete image",
    "delete-img",
  );

  const menuDots = createImgElement(
    "./assets/images/menu-dots.svg",
    "Menu dots",
    "menu-dots",
  );

  editBtn.append(editImg);
  deleteBtn.append(deleteImg);

  taskListInfo.append(checkbox, label);
  taskListControls.append(menuDots, editBtn, deleteBtn);

  taskMain.append(taskListInfo, taskListControls);
  li.append(taskMain);

  whereToInsert.append(li);
}
// CterateNewTask(taskList);

function createButton(classNames) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add(...classNames);
  return button;
}

function createImgElement(src, alt, className) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(className);
  return img;
}

function createCheckbox(id, checked) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-list__checkbox");
  checkbox.id = id;
  checkbox.checked = checked;
  return checkbox;
}

function createLabel(text, id) {
  const label = document.createElement("label");
  label.classList.add("task-list__text");
  label.textContent = text;
  label.setAttribute("for", id);
  return label;
}

function getDataFromLS(whereToInsert, array) {
  whereToInsert.innerHTML = "";
  array.forEach((task) => {
    appendNewTask(whereToInsert, task.taskId, task.taskBody, task.taskStatus);
  });
}
