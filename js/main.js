// ====================================================
// Imports
// ====================================================
import {
  children,
  createChild,
  createInitialGrowthRecord,
  formatDate,
} from "./data.js";
import { createInputWrapper, createChildCard } from "./ui.js";
import { loadChildren, saveChildren } from "./storage.js";

// ====================================================
// State
// ====================================================
let selectedChild = null;
let currentInputs = {};
let modalMode = null;
let growthChart = null;

// ====================================================
// DOM Selectors
// ====================================================

// Header controls
const addBtn = document.querySelector(".add-btn");
const listBtn = document.querySelector(".children-btn");
const arrow = document.querySelector(".dropdown-arrow");

// Child list
const childList = document.getElementById("child-list");

// Record form
const growthRecordForm = document.getElementById("growth-record-form");
const recordDateInput = document.getElementById("record-date");
const recordHeightFtInput = document.getElementById("height-ft");
const recordHeightInInput = document.getElementById("height-in");
const recordWeightInput = document.getElementById("record-weight");

// Child action buttons
const editBtn = document.querySelector(".edit-child-btn");
const deleteBtn = document.querySelector(".delete-child-btn");

// Modal controls
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector(".closeModal");
const cancelModalBtn = document.querySelector(".cancel-btn");
const modalSaveBtn = document.querySelector(".save-btn");

// Records UI
const recordsContainer = document.getElementById("records-container");

// Chart UI
const growthChartCanvas = document.getElementById("growthChart");

// Child profile display
const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childHeight = document.querySelector(".child-height");
const childWeight = document.querySelector(".child-weight");
const childGender = document.querySelector(".child-gender");

// Records empty state
const emptyRecordsMessage = document.querySelector(".empty-records-message");

// Profile empty state
const emptyProfileMessage = document.querySelector(".empty-profile-message");
const profileDetails = document.querySelector(".profile-details");

// Chart empty state
const emptyChartMessage = document.querySelector(".empty-chart-message");

// ====================================================
// Render Functions
// ====================================================
function renderChildren() {
  childList.innerHTML = "";

  children.forEach((child) => {
    const card = createChildCard(child);
    childList.appendChild(card);
  });
}

function renderSelectedChild(child) {
  if (!child) {
    emptyProfileMessage.style.display = "block";
    profileDetails.style.display = "none";
    return;
  }

  emptyProfileMessage.style.display = "none";
  profileDetails.style.display = "block";

  childName.textContent = `Name: ${child.name}`;
  childBirth.textContent = `Birth Date: ${child.birth}`;
  childHeight.textContent = `Height: ${child.heightFt} ft ${child.heightIn} in`;
  childWeight.textContent = `Weight: ${child.weight} lbs`;
  childGender.textContent = `Gender: ${child.gender}`;
}

function renderGrowthRecords(child) {
  const recordList = document.getElementById("records-container");
  recordList.innerHTML = "";

  if (child.growthRecords.length === 0) {
    emptyRecordsMessage.style.display = "block";
  } else {
    emptyRecordsMessage.style.display = "none";

    child.growthRecords.forEach((record, index) => {
      const recordItem = document.createElement("div");
      const deleteRecordBtn = document.createElement("button");
      recordItem.classList.add("record-item");

      recordItem.textContent = `Date: ${record.date}, Height: ${record.heightFt} ft ${record.heightIn} in, Weight: ${record.weight} lbs`;
      deleteRecordBtn.textContent = `X`;
      deleteRecordBtn.classList.add("record-delete-btn");

      deleteRecordBtn.addEventListener("click", () => {
        child.growthRecords.splice(index, 1);

        saveChildren();
        renderGrowthRecords(child);
        renderGrowthChart();
      });

      recordItem.appendChild(deleteRecordBtn);
      recordList.appendChild(recordItem);
    });
  }
}

function clearSelectedChildUI() {
  childName.textContent = "name: -";
  childBirth.textContent = "Birth Date: -";
  childHeight.textContent = "Height: -";
  childWeight.textContent = "Weight: -";
  childGender.textContent = "Gender: -";

  recordsContainer.innerHTML = "";
  emptyRecordsMessage.style.display = "block";
}

function clearChartUI() {
  emptyChartMessage.style.display = "block";
  growthChartCanvas.style.display = "none";

  if (growthChart) {
    growthChart.destroy();
    growthChart = null;
  }
}

// ====================================================
// Validation
// ====================================================
function validateChild(name, birthDate, heightFt, heightIn, weight, gender) {
  if (!name.trim()) return "Name is required";
  if (!birthDate) return "Birth date is required";
  if (!heightFt) return "Height (ft) is required";
  if (!heightIn) return "Height (in) is required";
  if (!weight) return "Weight is required";
  if (!gender) return "Gender is required";
  return null;
}

// ====================================================
// Modal Logic
// ====================================================
function openAddModal() {
  modalMode = "add";
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

  currentInputs = {
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
    weightInput,
    genderSelect,
  };

  nameInput.value = "";
  dobInput.value = "";
  heightFtInput.value = "";
  heightInInput.value = "";
  weightInput.value = "";
  genderSelect.value = "";

  modalContent.prepend(inputWrapper);
  modal.classList.add("show");
}

function openEditModal() {
  modalMode = "edit";
  if (!selectedChild) {
    alert("Please select a child");
    return;
  }

  modal.classList.add("show");

  const existingInputWrapper = modalContent.querySelector(".input-wrapper");
  if (existingInputWrapper) existingInputWrapper.remove();

  const {
    inputWrapper,
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
    weightInput,
    genderSelect,
  } = createInputWrapper();

  currentInputs = {
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
    weightInput,
    genderSelect,
  };

  currentInputs.nameInput.value = selectedChild.name;
  currentInputs.dobInput.value = selectedChild.birth;
  currentInputs.heightFtInput.value = selectedChild.heightFt;
  currentInputs.heightInInput.value = selectedChild.heightIn;
  currentInputs.weightInput.value = selectedChild.weight;
  currentInputs.genderSelect.value = selectedChild.gender;

  modalContent.prepend(inputWrapper);
}

function closeModal() {
  modal.classList.remove("show");
}

// ====================================================
// Event Listeners
// ====================================================

// Toggle child list
listBtn.addEventListener("click", () => {
  childList.classList.toggle("show");
});

// Select child (event delegation)
childList.addEventListener("click", (e) => {
  const card = e.target.closest(".child-card");
  if (!card) return;

  const child = children.find((c) => c.id === Number(card.dataset.id));
  selectedChild = child;

  localStorage.setItem("selectedChildId", child.id);

  renderSelectedChild(child);
  renderGrowthRecords(child);
  renderGrowthChart();
});

// Edit child
editBtn.addEventListener("click", () => {
  openEditModal();
});

// Delete child
deleteBtn.addEventListener("click", () => {
  if (!selectedChild) {
    alert("Please select a child");
    return;
  }

  const childIndex = children.findIndex((c) => c.id === selectedChild.id);
  children.splice(childIndex, 1);

  selectedChild = null;
  localStorage.removeItem("selectedChildId");

  saveChildren();
  renderChildren();

  renderSelectedChild(null);

  clearSelectedChildUI();
  clearChartUI();
});

// Add child
addBtn.addEventListener("click", () => {
  openAddModal();
});

// Save edited child
modalSaveBtn.addEventListener("click", () => {
  const childName = currentInputs.nameInput.value.trim();
  const childDob = currentInputs.dobInput.value;
  const childHeightFt = currentInputs.heightFtInput.value;
  const childHeightIn = currentInputs.heightInInput.value;
  const childWeight = currentInputs.weightInput.value;
  const childGender = currentInputs.genderSelect.value;

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
  if (modalMode === "add") {
    const child = createChild(
      childName,
      childDob,
      childHeightFt,
      childHeightIn,
      childWeight,
      childGender,
    );

    const initialRecord = createInitialGrowthRecord(
      childDob,
      childHeightFt,
      childHeightIn,
      childWeight,
    );

    child.growthRecords.push(initialRecord);

    children.push(child);
  }
  if (modalMode === "edit") {
    selectedChild.name = childName;
    selectedChild.birth = childDob;
    selectedChild.heightFt = childHeightFt;
    selectedChild.heightIn = childHeightIn;
    selectedChild.weight = childWeight;
    selectedChild.gender = childGender;

    renderSelectedChild(selectedChild);
  }
  saveChildren();
  renderChildren();

  closeModal();
});

// Growth record
growthRecordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedChild) {
    alert("Please select a child");
    return;
  }
  const formattedDate = formatDate(recordDateInput.value);

  const record = {
    heightFt: Number(recordHeightFtInput.value),
    heightIn: Number(recordHeightInInput.value),
    weight: Number(recordWeightInput.value),
    date: formattedDate,
  };

  selectedChild.growthRecords.push(record);

  recordHeightFtInput.value = "";
  recordHeightInInput.value = "";
  recordWeightInput.value = "";
  recordDateInput.value = "";

  saveChildren();
  renderGrowthRecords(selectedChild);
  renderGrowthChart();
});

// Modal close
closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);

// ====================================================
// Chart Functions
// ====================================================
function getHeightChartData() {
  return selectedChild.growthRecords.map(
    (record) => record.heightFt * 12 + record.heightIn,
  );
}

function getWeightChartData() {
  return selectedChild.growthRecords.map((record) => record.weight);
}

function getChartLabels() {
  return selectedChild.growthRecords.map((record) => record.date);
}

function renderGrowthChart() {
  if (!selectedChild || selectedChild.growthRecords.length === 0) {
    clearChartUI();

    return;
  } else {
    emptyChartMessage.style.display = "none";
    growthChartCanvas.style.display = "block";

    if (growthChart) {
      growthChart.destroy();
      growthChart = null;
    }
  }

  const chartHeight = getHeightChartData();
  const chartWeight = getWeightChartData();
  const chartLabels = getChartLabels();

  growthChart = new Chart(growthChartCanvas, {
    type: "line",

    data: {
      labels: chartLabels,

      datasets: [
        {
          label: "Height",
          data: chartHeight,
        },

        {
          label: "Weight",
          data: chartWeight,
        },
      ],
    },
  });
}

// ====================================================
// Initialization
// ====================================================

loadChildren();
renderChildren();

const selectedChildId = localStorage.getItem("selectedChildId");

if (selectedChildId) {
  const child = children.find((c) => c.id === Number(selectedChildId));

  if (child) {
    selectedChild = child;
    renderSelectedChild(selectedChild);
    renderGrowthRecords(selectedChild);
    renderGrowthChart();
  }
} else {
  renderSelectedChild(null);
  clearSelectedChildUI();
  clearChartUI();
}
