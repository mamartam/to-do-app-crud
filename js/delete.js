import { updateLSArray } from "./local-storage.js";

export function removeElementFromDom(element, fromWhere) {
  fromWhere.removeChild(element);
}

export function removeTaskFromArray(value, array) {
  const index = array.findIndex((element) => element.taskId === value);
  array.splice(index, 1);
  updateLSArray("tasks", array);
}
