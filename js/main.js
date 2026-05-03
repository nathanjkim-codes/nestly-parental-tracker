import { children, createChild } from "./data.js";
import { createInputWrapper, createChildCard } from "./ui.js";
import { loadChildren, saveChildren } from "./storage.js";

// Data storage
let selectedChild = null;

let editInputs = {};

// Header controls
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const listBtn = document.querySelector(".list-btn");

// Child list
const childList = document.getElementById("child-list"); // Container for displaying child card

// Render all child cards to the child list
function renderChildren() {
  childList.innerHTML = "";

  children.forEach((child) => {
    const card = createChildCard(child);
    childList.appendChild(card);
  });
}

loadChildren();
renderChildren();

// Record form
const growthRecordForm = document.getElementById("growth-record-form"); // Form for adding new growth record
const recordDateInput = document.getElementById("record-date"); // Input for record date
const heightFtInput = document.getElementById("height-ft"); // Input for height (feet)
const heightInInput = document.getElementById("height-in"); // Input for height (inches)
const recordWeightInput = document.getElementById("record-weight"); // Input for weight (lbs)

// Child action buttons
const editBtn = document.querySelector(".edit-child-btn"); // Handle child edit action
const deleteBtn = document.querySelector(".delete-child-btn"); // Handle child delete action

// Edit modal controls
const editModal = document.getElementById("editModal");
const modalContent = document.querySelector(".edit-modal-content");
const closeModalBtn = document.querySelector(".closeModal");
const cancelModalBtn = document.querySelector(".cancel-btn");
const modalSaveBtn = document.querySelector(".save-btn");

editBtn.addEventListener("click", () => {
  // Require a selected child before editing
  if (!selectedChild) {
    alert("Please select a child");
    return;
  }
  // Show modal
  editModal.classList.add("show");

  // Remove old form instance before creating a new one
  const existingInputWrapper = modalContent.querySelector(".input-wrapper");
  if (existingInputWrapper) {
    existingInputWrapper.remove();
  }

  // Create input fields for editing
  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
    weightInput,
    genderSelect,
  } = createInputWrapper();

  // Store references to inputs
  editInputs.nameInput = nameInput;
  editInputs.dobInput = dobInput;
  editInputs.heightFtInput = heightFtInput;
  editInputs.heightInInput = heightInInput;
  editInputs.weightInput = weightInput;
  editInputs.genderSelect = genderSelect;

  // Populate input fields with selected child's current data
  editInputs.nameInput.value = selectedChild.name;
  editInputs.dobInput.value = selectedChild.birth;
  editInputs.heightFtInput.value = selectedChild.heightFt;
  editInputs.heightInInput.value = selectedChild.heightIn;
  editInputs.weightInput.value = selectedChild.weight;
  editInputs.genderSelect.value = selectedChild.gender;

  // Add the input form to the modal
  modalContent.append(inputWrapper);
});

// Handle delete action for the selected child
deleteBtn.addEventListener("click", () => {
  // Ensure a child is selected before deleting
  if (!selectedChild) {
    alert("Please select a child");
    return;
  }

  // Find the index of the selected child in the array
  const childIndex = children.findIndex((c) => c.id === selectedChild.id);

  // Remove the child from the array
  children.splice(childIndex, 1);

  // Reset the selected child state
  selectedChild = null;

  // Persist updated data to localStorage
  saveChildren();

  // Re-render the child list UI
  renderChildren();

  // Clear the selected child profile UI
  clearSelectedChildUI();
});

// Clear the selected child profile and records UI
function clearSelectedChildUI() {
  childName.textContent = "Name:";
  childBirth.textContent = "Birth Date:";
  childHeight.textContent = "Height:";
  childWeight.textContent = "Weight:";
  childGender.textContent = "Gender:";

  recordsContainer.innerHTML = "";
  emptyMessage.style.display = "block";
}

// Handle savingedited child data from the modal
modalSaveBtn.addEventListener("click", () => {
  // Retrieve updated values from input fields
  const childName = editInputs.nameInput.value.trim();
  const childDob = editInputs.dobInput.value;
  const childHeightFt = editInputs.heightFtInput.value;
  const childHeightIn = editInputs.heightInInput.value;
  const childWeight = editInputs.weightInput.value;
  const childGender = editInputs.genderSelect.value;

  // Validate input values before saving
  const error = validateChild(
    childName,
    childDob,
    childHeightFt,
    childHeightIn,
    childWeight,
    childGender,
  );
  if (error) {
    alert(error);
    return; // Stop if validation fails
  }

  // Update selected child's data
  selectedChild.name = childName;
  selectedChild.birth = childDob;
  selectedChild.heightFt = childHeightFt;
  selectedChild.heightIn = childHeightIn;
  selectedChild.weight = childWeight;
  selectedChild.gender = childGender;

  // Save updated data to localStorage
  saveChildren();

  // Update UI with new data
  renderSelectedChild(selectedChild);
  renderChildren();

  // Close the edit modal
  closeEditModal();
});

// Close the edit modal
function closeEditModal() {
  editModal.classList.remove("show");
}

// Close modal when clicking the close X button
closeModalBtn.addEventListener("click", () => {
  closeEditModal();
});

// Close modal when clicking the cancel button
cancelModalBtn.addEventListener("click", () => {
  closeEditModal();
});

// Render selected child's profile information in the UI
function renderSelectedChild(child) {
  childName.textContent = `Name: ${child.name}`;
  childBirth.textContent = `Birth Date: ${child.birth}`;
  childHeight.textContent = `Height: ${child.heightFt} ft ${child.heightIn} in`;
  childWeight.textContent = `Weight: ${child.weight}`;
  childGender.textContent = `Gender: ${child.gender}`;
}

// Records list
const recordsContainer = document.getElementById("records-container"); // Container to render growth records

// Child profile display
const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childHeight = document.querySelector(".child-height");
const childWeight = document.querySelector(".child-weight");
const childGender = document.querySelector(".child-gender");

// Get empty state message element
const emptyMessage = document.querySelector(".empty-message");

// Validation function
function validateChild(name, birthDate, heightFt, heightIn, weight, gender) {
  if (!name.trim()) return "Name is required";
  if (!birthDate) return "Birth date is required";
  if (!heightFt) return "Height (ft) is required";
  if (!heightIn) return "Height (in) is required";
  if (!weight) return "Weight is required";
  if (!gender) return "Gender is required";
  return null;
}
// Display selected child info when card is clicked
childList.addEventListener("click", (e) => {
  // Find the closest parent element with class 'child-card'
  const card = e.target.closest(".child-card");

  // If the click is not on a child card, exit early
  if (!card) return;

  // Find the corresponding child data using the card's dataset id
  const child = children.find((c) => c.id === Number(card.dataset.id));

  // Set the selected child
  selectedChild = child;

  // Save the selected child's id to localStorage for persistence
  localStorage.setItem("selectedChildId", child.id);

  // Update the UI with the selected child's profile
  renderSelectedChild(child);

  // Render the selected child's growth records
  renderGrowthRecords(child);
});

// Render growth records for the selected child
function renderGrowthRecords(child) {
  const recordList = document.getElementById("records-container");

  // Clear existing records
  recordList.innerHTML = "";

  // If no records exist, show empty message
  if (child.growthRecords.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    // Hide empty message if records exist
    emptyMessage.style.display = "none";

    // Loop through growth records and display each one
    child.growthRecords.forEach(function (record) {
      const recordItem = document.createElement("div");

      // Format record data as text
      recordItem.textContent = `Date: ${record.date}, Height: ${record.heightFt} ft ${record.heightIn} in, Weight: ${record.weight} lbs`;
      recordList.appendChild(recordItem);
    });
  }
}

growthRecordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedChild) {
    alert("Please select a child");
    return;
  }
  const record = {
    heightFt: Number(heightFtInput.value),
    heightIn: Number(heightInInput.value),
    weight: Number(recordWeightInput.value),
    date: recordDateInput.value,
  };

  selectedChild.growthRecords.push(record);

  saveChildren();

  renderGrowthRecords(selectedChild);

  console.log(record);
});

// Handle click on Add button: show input form and save new child
addBtn.addEventListener("click", () => {
  // Destructure the returned object from createInputWrapper
  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
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
    const heightFt = heightFtInput.value;
    const heightIn = heightInInput.value;
    const weight = weightInput.value;
    const gender = genderSelect.value;

    const error = validateChild(
      name,
      birthDate,
      heightFt,
      heightIn,
      weight,
      gender,
    );
    if (error) {
      alert(error);
      return;
    }

    const child = createChild(
      name,
      birthDate,
      heightFt,
      heightIn,
      weight,
      gender,
    );
    children.push(child); // Save child to array

    saveChildren();

    inputWrapper.remove(); // Remove the input form after saving

    const childCard = createChildCard(child);
    childList.appendChild(childCard);
  });
});

// Retrieve the previously selected child's ID from localStorage
const selectedChildId = localStorage.getItem("selectedChildId");

if (selectedChildId) {
  // Find the child in the array that matches the stored ID
  const child = children.find((c) => c.id === Number(selectedChildId));
  console.log("found child:", child);

  if (child) {
    //Restore the selected child state
    selectedChild = child;
    console.log("selectedChild:", selectedChild);

    // Update the UI with the restored child data
    renderSelectedChild(selectedChild);
    renderGrowthRecords(selectedChild);
  }
}
