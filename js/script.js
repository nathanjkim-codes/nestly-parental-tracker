const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

let children = []; // Array to store child cards
let selectedCard = null; // Current selected card

addBtn.addEventListener("click", (e) => {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("child-input-wrapper");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name[]";
  nameInput.placeholder = "Enter Name";
  nameInput.classList.add("name-input"); // setattribute?

  const dobInput = document.createElement("input");
  dobInput.type = "date";
  dobInput.name = "dob[]";
  dobInput.placeholder = "Enter DOB";
  dobInput.classList.add("dob-input");

  inputWrapper.appendChild(dobInput);
  inputWrapper.appendChild(nameInput);
  childList.appendChild(inputWrapper);
});
