// Create input wrapper and child input elements
export function createInputWrapper() {
  const inputWrapper = document.createElement("div");
  const nameInput = document.createElement("input");
  const dobInput = document.createElement("input");
  const heightFtInput = document.createElement("input");
  const heightInInput = document.createElement("input");
  const weightInput = document.createElement("input");
  const genderSelect = document.createElement("select");

  const nameLabel = document.createElement("label");
  const dobLabel = document.createElement("label");
  const heightLabel = document.createElement("label");
  const weightLabel = document.createElement("label");
  const genderLabel = document.createElement("label");

  nameLabel.textContent = "Name:";
  dobLabel.textContent = "Birth Date:";
  heightLabel.textContent = "Height (ft / in):";
  weightLabel.textContent = "Weight:";
  genderLabel.textContent = "Gender:";

  inputWrapper.classList.add("input-wrapper");
  nameInput.classList.add("name-input"); // Class for styling name input
  dobInput.classList.add("dob-input"); // Class for styling dob input
  heightFtInput.classList.add("height-ft-input"); // Class for styling height ft input
  heightInInput.classList.add("height-in-input"); // Class for styling height in input
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
  heightFtInput.type = "number";
  heightFtInput.name = "height ft[]";
  heightFtInput.placeholder = "ft";

  heightInInput.type = "number";
  heightInInput.name = "height in[]";
  heightInInput.placeholder = "in";

  // Create input field for child's weight
  weightInput.type = "number";
  weightInput.name = "weight[]";
  weightInput.placeholder = "Enter weight";

  // Create dropdown for gender selection
  genderSelect.name = "gender";
  genderSelect.id = "gender-select"; // ID for gender dropdown

  //create placeholder option
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "select gender";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;

  genderSelect.appendChild(placeholderOption);

  // Populate gender options
  const options = ["Male", "Female"];
  options.forEach((gender) => {
    const option = document.createElement("option");
    option.value = gender.toLowerCase();
    option.textContent = gender;
    genderSelect.appendChild(option);
  });

  inputWrapper.append(
    nameLabel,
    nameInput,
    dobLabel,
    dobInput,
    heightLabel,
    heightFtInput,
    heightInInput,
    weightLabel,
    weightInput,
    genderLabel,
    genderSelect,
  );
  return {
    inputWrapper,
    nameInput,
    dobInput,
    heightFtInput,
    heightInInput,
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
