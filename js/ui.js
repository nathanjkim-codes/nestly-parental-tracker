// Create input wrapper and child input elements
export function createInputWrapper() {
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
export function createChildCard(child) {
  const childCard = document.createElement("div");
  childCard.classList.add("child-card");
  childCard.textContent = child.name;

  childCard.dataset.id = child.id;

  return childCard;
}
