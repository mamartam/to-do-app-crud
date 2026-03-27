// crete id function

import { isInputEmpty } from "./functions.js";
import { updateLSArray } from "./local-storage.js";
export function idCreator() {
  let date = new Date();
  let id = date.getTime();
  return id;
}
export function createButton(classNames) {
  const button = document.createElement("button");
  button.setAttribute("aria-label", classNames[0]);
  button.type = "button";
  button.classList.add(...classNames);
  return button;
}

export function createImgElement(src, alt, className) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(className);
  return img;
}

export function createCheckbox(id, checked) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-list__checkbox");
  checkbox.id = id;
  checkbox.checked = checked;
  return checkbox;
}

export function createLabel(text, id) {
  const label = document.createElement("label");
  label.classList.add("task-list__text");
  label.textContent = text;
  label.setAttribute("for", id);
  return label;
}
export function appendNewTask(whereToInsert, id, taskText, status = false) {
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
    "task-list__btn--edit",
    "task-list__btn",
    "btn",
  ]);

  const deleteBtn = createButton([
    "task-list__btn--delete",
    "task-list__btn",
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
export function createEditSection(whereToInsert, array) {
  const taskEdit = document.createElement("div");
  taskEdit.classList.add("task-list__edit");

  let editInput = document.createElement("input");
  editInput.classList.add("edit-input");
  editInput.type = "text";
  editInput.setAttribute("name", "edit-input");
  editInput.value = whereToInsert.querySelector(".task-list__text").textContent;

  let saveImg = createImgElement(
    "./assets/images/save.svg",
    "Save image",
    "save-img",
  );

  let cancelImg = createImgElement(
    "./assets/images/cancel.svg",
    "Cancel image",
    "cancel-img",
  );

  let saveChangesBtn = createButton(["save-changes"]);
  saveChangesBtn.appendChild(saveImg);

  let cancelChangesBtn = createButton(["cancel-changes"]);
  cancelChangesBtn.appendChild(cancelImg);

  taskEdit.appendChild(editInput);
  taskEdit.appendChild(saveChangesBtn);
  taskEdit.appendChild(cancelChangesBtn);

  whereToInsert.appendChild(taskEdit);

  let idBox = Number(whereToInsert.getAttribute("data-id"));
  saveChangesBtn.addEventListener("click", (event) => {
    if (!isInputEmpty(editInput.value)) {
      whereToInsert.querySelector(".task-list__text").textContent =
        editInput.value;
      updateTaskInfo(array, idBox, editInput);
      whereToInsert.removeChild(taskEdit);
    }
  });

  cancelChangesBtn.addEventListener("click", (event) => {
    editInput.value =
      whereToInsert.querySelector(".task-list__text").textContent;
    whereToInsert.removeChild(taskEdit);
  });
}

export function updateTaskInfo(array, id, input) {
  const index = array.findIndex((element) => element.taskId === id);
  array[index].taskBody = input.value;
  updateLSArray("tasks", array);
}
