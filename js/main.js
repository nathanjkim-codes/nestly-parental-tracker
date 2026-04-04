import { children, createChild } from "./data.js";
import { createInputWrapper, createChildCard } from "./ui.js";

// Data storage
let selectedCard = null;

// Main UI elements
const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childHeight = document.querySelector(".child-height");
const childWeight = document.querySelector(".child-weight");
const childGender = document.querySelector(".child-gender");

// Validation function
function validateChild(name, birthDate, height, weight, gender) {
  if (!name.trim()) return "Name is required";
  if (!birthDate) return "Birth date is required";
  if (!height) return "Height is required";
  if (!weight) return "Weight is required";
  if (!gender) return "Gender is required";
  return null;
}
//// Display selected child info when card is clicked
childList.addEventListener("click", (e) => {
  const card = e.target.closest(".child-card");
  if (!card) return;

  const child = children.find((c) => c.id === Number(card.dataset.id));

  selectedCard = child;

  childName.textContent = `Name: ${child.name}`;
  childBirth.textContent = `Birth Date: ${child.dob}`;
  childHeight.textContent = `Height: ${child.height}`;
  childWeight.textContent = `Weight: ${child.weight}`;
  childGender.textContent = `Gender: ${child.gender}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-button");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("del-button");

  card.appendChild(editBtn);
  card.appendChild(deleteBtn);
});

// Handle click on Add button: show input form and save new child
addBtn.addEventListener("click", () => {
  // Destructure the returned object from createInputWrapper
  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightInput,
    weightInput,
    genderSelect,
  } = createInputWrapper();
  childList.appendChild(inputWrapper); // Add inputwrapper to the child list

  // Save button creation
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-btn");
  inputWrapper.appendChild(saveBtn);

  // Add event listener to handle saving child data
  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const birthDate = dobInput.value;
    const height = heightInput.value;
    const weight = weightInput.value;
    const gender = genderSelect.value;

    const error = validateChild(name, birthDate, height, weight, gender);
    if (error) {
      alert(error);
      return;
    }

    const child = createChild(name, birthDate, height, weight, gender);
    children.push(child); // Save child to array
    inputWrapper.remove(); // Remove the input form after saving

    const childCard = createChildCard(child);
    childList.appendChild(childCard);
  });
});

// Add click event listener to the Edit button
editBtn.addEventListener("click", () => {
  // Populate the input fields with the selected card's data
  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightInput,
    weightInput,
    genderSelect,
  } = createInputWrapper();

  nameInput.value = selectedCard.name;
  dobInput.value = selectedCard.birth;
  heightInput.value = selectedCard.height;
  weightInput.value = selectedCard.weight;
  genderInput.value = selectedCard.gender;

  const cardContent = selectedCard.element.querySelector(".card-content");
  // Check if the Save button does not exist inside this card
  if (!cardContent.querySelector(".save-btn")) {
    // Create a new Save button
    const saveButton = document.createElement("button");
    saveButton.classList.add("save-btn");
    saveButton.textContent = "Save";

    // Append the Save button to the card's content
    cardContent.appendChild(saveButton);
  }
});
