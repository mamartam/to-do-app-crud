import { DOM_VAR } from "./dom-variables.js";
import {
  findIndexOfSelectedTask,
  addNewtask,
  renderTasks,
  CterateNewTask,
  menuDotsFunc,
  updateTaskText,
  updateTaskStatus,
  saveArrayOfTasksIntoLS,
  changeStatusOfTask,
  deleteTask,
} from "./functions.js";

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasksArray);

// form-validation + adding new task
DOM_VAR.myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewtask(DOM_VAR.newTask.value);
  DOM_VAR.newTask.value = "";

  // animation for submin button

  DOM_VAR.spans.forEach((element) => {
    element.classList.add("animation");
  });
  setTimeout(() => {
    DOM_VAR.spans.forEach((element) => {
      element.classList.remove("animation");
    });
  }, 1000);
});

// if user input nothing than sub,it button is disabled
DOM_VAR.newTask.addEventListener("input", (event) => {
  let inputValue = String(event.target.value).trim();
  if (inputValue.length !== 0) {
    DOM_VAR.addBtn.disabled = false;
  } else {
    DOM_VAR.addBtn.disabled = true;
  }
});

DOM_VAR.listOfTasks.addEventListener("click", (event) => {
  // checking if task is checked and change the status in array
  if (event.target.classList.contains("task-list__checkbox")) {
    let element = Number(event.target.getAttribute("id"));
    let statusOfTask = event.target.checked;
    changeStatusOfTask(element, statusOfTask);
  }
  // if user presses delete button than task is being deleted from array
  if (event.target.closest(".task-list__btn--delete")) {
    let parentElem = event.target.closest(".task-list__item");
    let idBox = Number(parentElem.getAttribute("data-id"));
    deleteTask(idBox);
    DOM_VAR.listOfTasks.removeChild(parentElem);
  }
  // if user pressed edit button than below this task new section is being created
  if (event.target.closest(".task-list__btn--edit")) {
    let parentElementOfTask = event.target.closest(".task-list__item");
    generateEditSection(parentElementOfTask);
  }

  // for small screen there is donts-menu to save screen space
  if (event.target.classList.contains("menu-dots")) {
    menuDotsFunc(event);
  }
});
// if user opens edit and delete button, and then click
// on any part of screen except dots-menu button, than this buttons are hiding
document.body.addEventListener("click", (event) => {
  let controlsBtns = document.querySelectorAll(
    ".task-list__controls > button ",
  );
  if (event.target.classList.contains("menu-dots")) {
    return;
  } else {
    Array.from(controlsBtns).forEach((element) => {
      element.classList.remove("show");
    });
  }
});
// navigation buttons

// All tasks button
DOM_VAR.allBtn.addEventListener("click", (event) => {
  DOM_VAR.listOfTasks.innerHTML = "";
  renderTasks(tasksArray);
});

// Tasks need to be done button
DOM_VAR.activeBtn.addEventListener("click", (event) => {
  DOM_VAR.listOfTasks.innerHTML = "";
  tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

  tasksArray.forEach((element) => {
    let text = element.text;
    let id = element.id;
    let status = element.status;

    if (status === false) {
      CterateNewTask(id, text, status);
    }
  });
});

// Tasks which are done button
DOM_VAR.completedBtn.addEventListener("click", (event) => {
  tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  DOM_VAR.listOfTasks.innerHTML = "";
  let count = 0;

  tasksArray.forEach((element) => {
    let text = element.text;
    let id = element.id;
    let status = element.status;

    if (status === true) {
      count++;
      CterateNewTask(id, text, status);
    }
  });
});

// Accent for active button in navigation section

DOM_VAR.mainTaskNavigation.addEventListener("click", (event) => {
  tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  if (event.target.closest(".btn")) {
    let allBtn = DOM_VAR.mainTaskNavigation.querySelectorAll(".btn");
    allBtn.forEach((elemnt) => {
      elemnt.classList.remove("active-nav-btn");
    });
    event.target.closest(".btn").classList.add("active-nav-btn");
  }
});

function generateEditSection(insertIn) {
  // 1. Creating div container
  // <div class="task-list__edit"></div>
  const taskEdit = document.createElement("div");
  taskEdit.classList.add("task-list__edit");
  // 2.Searching for parent element of task (container of task)
  // let parentElementOfTask = event.target.closest(".task-list__item");
  let delete_btn = insertIn.querySelector(".task-list__btn--delete");
  let edit_btn = insertIn.querySelector(".task-list__btn--edit");

  // 3. Making delete and edit buttons disabled for the time while user edits task
  delete_btn.disabled = true;
  edit_btn.disabled = true;

  // 4. Creading input element
  // <inpup type="text" class="edit-input" name="edit-input" value="text content of task">
  let editInput = document.createElement("input");
  editInput.classList.add("edit-input");
  editInput.type = "text";
  editInput.setAttribute("name", "edit-input");

  editInput.value = insertIn.querySelector(".task-list__text").textContent;

  // 5. Creating save button to save changes
  // <button type="button" ><img src="./assets/images/save.svg" alt="Save image" class="save-changes"></button>
  let saveChangesBtn = document.createElement("button");
  saveChangesBtn.type = "button";
  let saveImg = document.createElement("img");
  saveImg.src = "./assets/images/save.svg";
  saveImg.alt = "Save image";
  saveChangesBtn.classList.add("save-changes");
  saveChangesBtn.appendChild(saveImg);

  let cancelChangesBtn = document.createElement("button");
  cancelChangesBtn.type = "button";
  let cancelImg = document.createElement("img");
  cancelImg.src = "./assets/images/cancel.svg";
  cancelImg.alt = "Cancel image";
  cancelChangesBtn.classList.add("cancel-changes");
  cancelChangesBtn.appendChild(cancelImg);

  taskEdit.appendChild(editInput);
  taskEdit.appendChild(saveChangesBtn);
  taskEdit.appendChild(cancelChangesBtn);

  insertIn.appendChild(taskEdit);
  let idBox = Number(insertIn.getAttribute("data-id"));
  console.log("edit-btn");

  // 6. adding event listener for save changes button
  saveChangesBtn.addEventListener("click", () => {
    saveChanges(editInput, insertIn, idBox, taskEdit);
  });
  cancelChangesBtn.addEventListener("click", () => {
    // saveChanges(editInput, insertIn, idBox, taskEdit);
    cancelChanges(editInput, insertIn, taskEdit);
  });
}

function saveChanges(input, parentElementOfTask, id, editSection) {
  let trimmedVale = input.value.trim();

  if (trimmedVale.length !== 0) {
    parentElementOfTask.querySelector(".task-list__text").textContent =
      trimmedVale;

    updateTaskText(id, trimmedVale);

    saveArrayOfTasksIntoLS();
    let delete_btn = parentElementOfTask.querySelector(
      ".task-list__btn--delete",
    );
    let edit_btn = parentElementOfTask.querySelector(".task-list__btn--edit");
    delete_btn.disabled = false;
    edit_btn.disabled = false;
    console.info("Changes are saved!");
  } else {
    input.value =
      parentElementOfTask.querySelector(".task-list__text").textContent;
    console.error("Empty string can't be submitted!");
    return;
  }

  parentElementOfTask.removeChild(editSection);
}

function cancelChanges(input, parentElementOfTask, editSection) {
  input.value =
    parentElementOfTask.querySelector(".task-list__text").textContent;
  let delete_btn = parentElementOfTask.querySelector(".task-list__btn--delete");
  let edit_btn = parentElementOfTask.querySelector(".task-list__btn--edit");
  delete_btn.disabled = false;
  edit_btn.disabled = false;
  parentElementOfTask.removeChild(editSection);
}
