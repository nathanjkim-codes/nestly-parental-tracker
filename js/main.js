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

  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
    weightInput,
    genderSelect,
  } = createInputWrapper();

  editInputs.nameInput = nameInput;
  editInputs.dobInput = dobInput;
  editInputs.heightFtInput = heightFtInput;
  editInputs.heightInInput = heightInInput;
  editInputs.weightInput = weightInput;
  editInputs.genderSelect = genderSelect;

  editInputs.nameInput.value = selectedChild.name;
  editInputs.dobInput.value = selectedChild.birth;
  editInputs.heightFtInput.value = selectedChild.heightFt;
  editInputs.heightInInput.value = selectedChild.heightIn;
  editInputs.weightInput.value = selectedChild.weight;
  editInputs.genderSelect.value = selectedChild.gender;

  modalContent.append(inputWrapper);
});

modalSaveBtn.addEventListener("click", () => {
  const childName = editInputs.nameInput.value.trim();
  const childDob = editInputs.dobInput.value;
  const childHeightFt = editInputs.heightFtInput.value;
  const childHeightIn = editInputs.heightInInput.value;
  const childWeight = editInputs.weightInput.value;
  const childGender = editInputs.genderSelect.value;

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
    return;
  }

  selectedChild.name = childName;
  selectedChild.birth = childDob;
  selectedChild.heightFt = childHeightFt;
  selectedChild.heightIn = childHeightIn;
  selectedChild.weight = childWeight;
  selectedChild.gender = childGender;

  saveChildren();
  renderSelectedChild(selectedChild);
  renderChildren();
  closeEditModal();
});

function closeEditModal() {
  editModal.classList.remove("show");
}

closeModalBtn.addEventListener("click", () => {
  closeEditModal();
});

cancelModalBtn.addEventListener("click", () => {
  closeEditModal();
});

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
  const card = e.target.closest(".child-card");
  if (!card) return;

  const child = children.find((c) => c.id === Number(card.dataset.id));

  selectedChild = child;

  renderSelectedChild(child);

  renderGrowthRecords(child);
});

function renderGrowthRecords(child) {
  const recordList = document.getElementById("records-container");
  recordList.innerHTML = "";
  if (child.growthRecords.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";

    child.growthRecords.forEach(function (record) {
      const recordItem = document.createElement("div");
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
