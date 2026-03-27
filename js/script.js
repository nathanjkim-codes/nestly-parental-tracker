// Main UI elements
const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

const childName = document.querySelector(".child-name");
const childBirth = document.querySelector(".child-birth");
const childHeight = document.querySelector(".child-height");
const childWeight = document.querySelector(".child-weight");
const childGender = document.querySelector(".child-gender");

const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector("delete-btn");

// Data storage
let children = []; // Array to store child cards
let selectedCard = null; // Current selected card

// Create child object
function createChild(name, birth, height, weight, gender) {
  return {
    id: Date.now(),
    name: name,
    birth: birth,
    height: height,
    weight: weight,
    gender: gender,
    growthRecords: [],
  };
}

// Add click event listener tothe Edit button
editBtn.addEventListener("click", () => {
  // Populate the input fields iwth the selected card's data
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

// Create input wrapper and child input elements
function createInputWrapper() {
  const inputWrapper = document.createElement("div");
  const nameInput = document.createElement("input");
  const dobInput = document.createElement("input");
  const heightInput = document.createElement("input");
  const weightInput = document.createElement("input");
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

  // Create input field for child's height
  heightInput.type = "number";
  heightInput.name = "height[]";
  heightInput.placeholder = "Enter Height";

  // Createinput field for child's weight
  weightInput.type = "number";
  weightInput.name = "weight[]";
  weightInput.placeholder = "Enter weight";

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

  inputWrapper.append(
    nameInput,
    dobInput,
    heightInput,
    weightInput,
    genderSelect,
  );
  return {
    inputWrapper,
    nameInput,
    dobInput,
    heightInput,
    weightInput,
    genderSelect,
  };
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
    childName.textContent = `Name: ${child.name}`;
    childBirth.textContent = `Birth Date: ${child.dob}`;
    childHeight.textContent = `Height: ${child.height}`;
    childWeight.textContent = `Weight: ${child.weight}`;
    childGender.textContent = `Gender: ${child.gender}`;
  });
}

//
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

  // Validation function
  function validateChild(name, birthDate, height, weight, gender) {
    if (!name.trim()) return "Name is required";
    if (!birthDate) return "Birth date is required";
    if (!height) return "Height is required";
    if (!weight) return "Weight is required";
    if (!gender) return "Gender is required";
    return null;
  }

  // Add event listener to handle saving child data
  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const birthDate = dobInput.value;
    const height = heightInput.value;
    const weight = weightInput.value;
    const gender = genderSelect.value;

    const child = createChild(name, birthDate, height, weight, gender);
    children.push(child); // Save child to array
    inputWrapper.remove(); // Remove the input form after saving

    createChildCard(child);
  });
});
