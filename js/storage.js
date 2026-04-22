import { children } from "./data.js";

export function loadChildren() {
  const childrenData = localStorage.getItem("children");
  if (childrenData !== null) {
    const savedChildren = JSON.parse(childrenData);
    children.length = 0;
    children.push(...savedChildren);
  }
}

export function saveChildren() {
  localStorage.setItem("children", JSON.stringify(children));
}

export function saveSelectedChildID(id) {
  localStorage.setItem("selectedChildId", id);
}
