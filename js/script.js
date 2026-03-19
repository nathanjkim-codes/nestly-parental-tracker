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
  //
  function createInputWrapper() {
    const inputWrapper = document.createElement("div");
    const nameInput = document.createElement("input");
    const dobInput = document.createElement("dob-input");
    const genderSelect = document.createElement("gender-select");

    inputWrapper.classList.add("input-wrapper");
    nameInput.classList.add("name-input");
    dobInput.classList.add("dob-input");
    genderSelect.classList.add("gender-select");

    inputWrapper.append(nameInput, dobInput, genderSelect_);
    return { inputWrapper, nameInput, dobInput, genderSelect };
  }

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
      childBirth.textContent = child.birth; // Update birth date display
      childGender.textContent = child.gender; // Update gender display

      inputWrapper.remove(); // Remove the input form after saving
    });
  });
});
