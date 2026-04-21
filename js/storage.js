export function loadChildren() {
  const childrenData = localStorage.getItem("children");
  if (childrenData !== null) {
    const savedChildren = JSON.parse(childrenData);
    children.length = 0;
    children.push(...savedChildren);
  }
}
