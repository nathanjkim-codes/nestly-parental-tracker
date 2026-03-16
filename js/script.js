const dashboard = document.getElementById("dashboard"); // Main dashboard container
const addBtn = document.querySelector(".add-btn"); // Button to add new child
const childList = document.getElementById("child-list"); // Container for displaying child card

let children = []; // Array to store child cards
let selectedCard = null; // Current selected card

addBtn.addEventListener("click", (e) => {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("child-input-wrapper");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name[]";
  nameInput.placeholder = "Enter Name";
  nameInput.classList.add("name-input"); // setattribute?

  const dobInput = document.createElement("input");
  dobInput.type = "date";
  dobInput.name = "dob[]";
  dobInput.placeholder = "Enter DOB";
  dobInput.classList.add("dob-input");

  const genderSelect = document.createElement("select");
  genderSelect.name = "gender";
  genderSelect.id = "gender-select";
  genderSelect.classList.add("gender-input");

  const options = ["Male", "Female"];

  options.forEach((gender) => {
    const option = document.createElement("option");

    option.value = gender.toLowerCase();
    option.text = gender;
    genderSelect.appendChild(option);
  });

  inputWrapper.appendChild(nameInput);
  inputWrapper.appendChild(dobInput);
  inputWrapper.appendChild(genderSelect);

  childList.appendChild(inputWrapper);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-Btn");

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const birthDate = dobInput.value;
    const gender = genderSelect.value;

    const child = {
      id: Date.now(), // unique ID for each child
      name: nameInput.value,
      birth: dobInput.value,
      gender: genderSelect.value,
      growthRecords: [], // array to store percentil records later
    };
    children.push(child);

    const childCard = document.createElement("div");
    childCard.classList.add("child-card");
    childCard.textContent = child.name;
    childList.appendChild(childCard);
  });
});
