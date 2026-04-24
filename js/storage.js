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

export function saveSelectedChildId(id) {
  localStorage.setItem("selectedChildId", id);
}

export function restoreSelectedChild() {
  return localStorage.getItem("selectedChildId");
}

export function restoreGrowthRecords() {
  const recordData = localStorage.getItem("growthRecords");
  const restoreGrowthRecords = JSON.parse(recordData);
  return restoreGrowthRecords;
}
