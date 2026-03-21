// Main UI elements
const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card
// Add click event to child card for showing details
const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childGender = document.querySelector(".child-gender");

// Data storage
let children = []; // Array to store child cards
let selectedCard = null; // Current selected card

// Create child object
function createChild(name, birth, gender) {
  return {
    id: Date.now(),
    name: name,
    birth: birth,
    gender: gender,
    growthRecords: [],
  };
}

// Createinput wrapper and child input elements
function createInputWrapper() {
  const inputWrapper = document.createElement("div");
  const nameInput = document.createElement("input");
  const dobInput = document.createElement("input");
  const genderSelect = document.createElement("select");

  inputWrapper.classList.add("input-wrapper");
  nameInput.classList.add("name-input"); // Class for styling name input
  dobInput.classList.add("dob-input"); // Class for styling dob input
  genderSelect.classList.add("gender-select"); // Class for styling gender input
  // Create input field for child's name
  nameInput.type = "text";
  nameInput.name = "name[]";
  nameInput.placeholder = "Enter Name";
  // Create input field for child's birth date
  dobInput.type = "date";
  dobInput.name = "dob[]";
  dobInput.placeholder = "Enter DOB";
  // Create dropdown for gender selection
  genderSelect.name = "gender";
  genderSelect.id = "gender-select"; // ID for gender dropdown
  // Populate gender options
  const options = ["Male", "Female"];
  options.forEach((gender) => {
    const option = document.createElement("option");
    option.value = gender.toLowerCase();
    option.text = gender;
    genderSelect.appendChild(option);
  });
  inputWrapper.append(nameInput, dobInput, genderSelect);
  return { inputWrapper, nameInput, dobInput, genderSelect };
}
// --- Create child card function (global)
function createChildCard(child) {
  const childCard = document.createElement("div");
  childCard.classList.add("child-card");
  childCard.textContent = child.name;

  childList.appendChild(childCard);

  // Display child details when the card is clicked
  childCard.addEventListener("click", () => {
    selectedCard = child; // Save the selected card
    childName.textContent = child.name;
    childBirth.textContent = child.birth;
    childGender.textContent = child.gender;
  });
}

//
addBtn.addEventListener("click", () => {
  // Destructure the returned object from createInputWrapper
  const { inputWrapper, nameInput, dobInput, genderSelect } =
    createInputWrapper();
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
    const gender = genderSelect.value;

    const child = createChild(name, birthDate, gender);
    children.push(child); // Save child to array
    inputWrapper.remove(); // Remove the input form after saving

    createChildCard(child);
  });
});
