// Main UI elements
const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

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

// Functionality: Add child input fields on button click
addBtn.addEventListener("click", (e) => {
 
  // Create a wrapper for input fields
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("child-input-wrapper"); // Class for styling inputs

  // Create input field for child's name
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name[]";
  nameInput.placeholder = "Enter Name";
  nameInput.classList.add("name-input"); // Class for styling name input

  // Create input field for child's birth date
  const dobInput = document.createElement("input");
  dobInput.type = "date";
  dobInput.name = "dob[]";
  dobInput.placeholder = "Enter DOB";
  dobInput.classList.add("dob-input");

  // Create dropdown for gender selection
  const genderSelect = document.createElement("select");
  genderSelect.name = "gender";
  genderSelect.id = "gender-select"; // ID for gender dropdown
  genderSelect.classList.add("gender-input"); // Class for styling gender input

  
  // Populate gender options
  const options = ["Male", "Female"];
  options.forEach((gender) => {
    const option = document.createElement("option");
    option.value = gender.toLowerCase();
    option.text = gender;
    genderSelect.appendChild(option);

    return {inputWrapper, nameInput, dobInput, genderSelect};
    });
  });

  // Add inputs to the wrapper
  inputWrapper.appendChild(nameInput);
  inputWrapper.appendChild(dobInput);
  inputWrapper.appendChild(genderSelect);

  // Add input wrapper to the child list
  childList.appendChild(inputWrapper);

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

    // Create and display child card
    const childCard = document.createElement("div");
    childCard.classList.add("child-card");
    childCard.textContent = child.name;

    childList.appendChild(childCard); // Add card to child list

    // Add click event to child card for showing details
    const childName = document.querySelector(".child-name");
    const childBirth = document.querySelector(".child-birth");
    const childGender = document.querySelector(".child-gender");

    childCard.addEventListener("click", () => {
      childName.textContent = child.name; // Update name display
      childBirth.textContent = child.birthDate; // Update birth date display
      childGender.textContent = childgender; // Update gender display

      inputWrapper.remove(); // Remove the input form after saving
    });
  });
});
